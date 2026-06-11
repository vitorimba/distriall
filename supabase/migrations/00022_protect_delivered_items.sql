-- Migration: 00022_protect_delivered_items
-- Story 4.2 QA Gate: Enforce server-side protection against deleting or updating
-- delivered/non-delivered delivery_items (business rule was frontend-only before).

-- Replace the admin delete policy to block terminal-status items
DROP POLICY IF EXISTS "Admins can delete delivery items" ON public.delivery_items;

CREATE POLICY "Admins can delete non-terminal delivery items"
  ON public.delivery_items FOR DELETE
  USING (
    status = 'pendente'
    AND EXISTS (
      SELECT 1 FROM public.deliveries d
      WHERE d.id = delivery_id
        AND get_user_role_in_account(d.account_id) = 'admin'
    )
  );
