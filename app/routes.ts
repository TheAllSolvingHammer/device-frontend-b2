import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  route('/login', 'routes/login.tsx'),
  layout('components/auth/protected-layout.tsx', [
    index('routes/dashboard.tsx'),

    // Users
    ...prefix('users', [
      index('routes/users/users.tsx'),
      // route('/create', 'routes/users/user-create.tsx'),
      // route('/:userId', 'routes/users/user-detail.tsx'),
      // route('/:userId/edit', 'routes/users/user-edit.tsx'),
    ]),
  ]),
] satisfies RouteConfig
