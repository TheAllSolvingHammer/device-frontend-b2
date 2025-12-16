import { useAuth } from './auth-provider'
import { Outlet, useLocation, useNavigation, useNavigate } from 'react-router'
import { Spinner } from '../ui/spinner'
import { Header } from '../core/header'
import { useEffect } from 'react'

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const location = useLocation()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const isLoading = navigation.state === 'loading'

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/login', { replace: true, state: { from: location } })
    }
  }, [isAuthLoading, isAuthenticated, navigate, location])

  if (isAuthLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Loading />
  }

  return (
    <>
      <Header />
      <main className='container mx-auto flex flex-col gap-4 pt-16 px-4'>
        {isLoading && <Loading />}

        <Outlet />
      </main>
    </>
  )
}

function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
      <Spinner className='size-12' />
    </div>
  )
}
