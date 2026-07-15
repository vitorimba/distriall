-- Performance optimization: simplify delivery_items UPDATE RLS policy
-- Before: IN (SELECT ...) OR EXISTS (...) — two subqueries
-- After: single EXISTS with OR condition — one subquery

DROP POLICY IF EXISTS "Drivers can update their delivery items" ON public.delivery_items;

CREATE POLICY "Drivers can update their delivery items"
  ON public.delivery_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.deliveries d
      WHERE d.id = delivery_id
        AND (
          d.driver_id = auth.uid()
          OR get_user_role_in_account(d.account_id) = 'admin'
        )
    )
  );
