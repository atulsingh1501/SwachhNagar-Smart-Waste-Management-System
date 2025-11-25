# TODO: Remove 'manager' role from user roles

## Tasks
- [x] Update Supabase migration: Remove 'manager' from user_role ENUM and adjust policies
- [x] Update frontend/src/types/index.ts: Remove 'manager' from role type union
- [x] Update frontend/src/lib/database.types.ts: Remove 'manager' from role types
- [x] Update frontend/src/lib/supabase.ts: Remove the manager mock user
- [x] Update App.tsx: Remove 'manager' case
- [x] Update App_fixed.tsx: Remove 'manager' case
- [x] Update App_updated.tsx: Remove 'manager' case
- [x] Update App_backend.tsx: Remove 'manager' case
- [x] Update UserManagement.tsx: Remove 'manager' styling case and option
- [x] Update UserManagement_fixed.tsx: Remove 'manager' styling case and option
- [x] Update SignUpForm.tsx: Remove 'manager' option
- [x] Update LoginForm.tsx: Remove manager mock login
- [x] Update LoginForm_fixed.tsx: Remove manager mock login
- [x] Update Layout.tsx: Remove 'manager' from role options
- [x] Update backend/models/User.js: Remove 'manager' from enum
- [x] Update backend/seed-demo-users.js: Remove manager demo user
- [x] Remove Supabase dependencies and files from frontend
- [x] Reinstall MongoDB dependency
- [ ] Run database migrations if needed
- [x] Test role-based access and UI components
- [ ] Update documentation if needed
