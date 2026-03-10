-- ─────────────────────────────────────────────────────────────
-- Mobile app users: read-only access to canonical data
-- ─────────────────────────────────────────────────────────────

create policy "Users can read categories"
  on public.categories for select
  to authenticated
  using (true);

create policy "Users can read medications"
  on public.medications for select
  to authenticated
  using (true);

-- ─────────────────────────────────────────────────────────────
-- Mobile app users: full access to their own user_medications only
-- ─────────────────────────────────────────────────────────────

create policy "Users can read own user_medications"
  on public.user_medications for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert own user_medications"
  on public.user_medications for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update own user_medications"
  on public.user_medications for update
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can delete own user_medications"
  on public.user_medications for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- ─────────────────────────────────────────────────────────────
-- audit_logs: no user access (admin only, via service role)
-- ─────────────────────────────────────────────────────────────
-- No user policies added — audit_logs remain admin-only
