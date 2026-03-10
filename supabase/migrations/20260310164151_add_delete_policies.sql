-- Delete policies for categories and medications (admin only)
create policy "Admins can delete categories"
  on public.categories for delete
  using (exists (select 1 from public.admin_users where id = (select auth.uid())));

create policy "Admins can delete medications"
  on public.medications for delete
  using (exists (select 1 from public.admin_users where id = (select auth.uid())));
