import { useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, Outlet } from 'react-router'

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
