-- Migration: 00018_expenses_seed_data
-- Story 3.3: Gastos fixos pré-cadastrados (AC #2)
-- SEED DATA: Exemplos de gastos fixos recorrentes que aparecem por padrão no acerto.
-- Esta migration é idempotente — não insere dados se gastos recorrentes já existirem.

DO $$
DECLARE
  v_account_id_1  UUID;
  v_account_id_2  UUID;
  v_user_id       UUID;
  v_expense_id    UUID;
BEGIN
  -- Verificar se já existe seed data (idempotência)
  IF EXISTS (
    SELECT 1 FROM public.expenses
    WHERE recurrence IN ('semanal', 'mensal')
    LIMIT 1
  ) THEN
    RAISE NOTICE 'Seed data de gastos fixos já existe. Pulando inserção.';
    RETURN;
  END IF;

  -- Buscar a primeira conta disponível
  SELECT id INTO v_account_id_1
  FROM public.accounts
  ORDER BY created_at
  LIMIT 1;

  IF v_account_id_1 IS NULL THEN
    RAISE NOTICE 'Nenhuma conta encontrada. Seed data de gastos não inserida.';
    RETURN;
  END IF;

  -- Buscar o usuário admin dessa conta
  SELECT u.id INTO v_user_id
  FROM public.users u
  JOIN public.account_users au ON au.user_id = u.id
  WHERE au.account_id = v_account_id_1
    AND au.role = 'admin'
  ORDER BY au.created_at
  LIMIT 1;

  -- Fallback: qualquer usuário da conta
  IF v_user_id IS NULL THEN
    SELECT u.id INTO v_user_id
    FROM public.users u
    JOIN public.account_users au ON au.user_id = u.id
    WHERE au.account_id = v_account_id_1
    ORDER BY au.created_at
    LIMIT 1;
  END IF;

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'Nenhum usuário encontrado para a conta. Seed data de gastos não inserida.';
    RETURN;
  END IF;

  -- Inserir gasto fixo: Impostos (R$320/semana, exclusivo da conta)
  INSERT INTO public.expenses (
    account_id,
    description,
    amount,
    category,
    type,
    recurrence,
    is_shared,
    expense_date,
    created_by
  ) VALUES (
    v_account_id_1,
    'Impostos',
    320.00,
    'fixo',
    'impostos',
    'semanal',
    false,
    CURRENT_DATE,
    v_user_id
  );

  -- Inserir gasto variável: Gasolina (R$500/semana, compartilhado)
  INSERT INTO public.expenses (
    account_id,
    description,
    amount,
    category,
    type,
    recurrence,
    is_shared,
    expense_date,
    created_by
  ) VALUES (
    v_account_id_1,
    'Gasolina',
    500.00,
    'variavel',
    'gasolina',
    'semanal',
    true,
    CURRENT_DATE,
    v_user_id
  )
  RETURNING id INTO v_expense_id;

  -- Se existir uma segunda conta, criar splits 50/50 para o gasto de gasolina
  SELECT id INTO v_account_id_2
  FROM public.accounts
  WHERE id <> v_account_id_1
  ORDER BY created_at
  LIMIT 1;

  IF v_account_id_2 IS NOT NULL THEN
    INSERT INTO public.expense_splits (expense_id, account_id, percentage, amount)
    VALUES
      (v_expense_id, v_account_id_1, 50.00, 250.00),
      (v_expense_id, v_account_id_2, 50.00, 250.00)
    ON CONFLICT (expense_id, account_id) DO NOTHING;
  END IF;

  RAISE NOTICE 'Seed data de gastos fixos inserida com sucesso para a conta %.', v_account_id_1;
END;
$$;
