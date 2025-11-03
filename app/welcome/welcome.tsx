import type { ReactNode } from 'react'
import { Header } from '~/components/core/Header'

type WelcomeProps = {
  children?: ReactNode
}

export function Welcome({ children }: WelcomeProps) {
  return (
    <>
      <Header />
      <main className='flex items-center justify-center pt-16 pb-4'>
        {children}
      </main>
    </>
  )
}
