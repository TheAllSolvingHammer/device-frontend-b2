import type { Route } from './+types/dashboard'
import { DashboardIndex } from '~/dashboard/dashboard-index'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React Router App' },
    { name: 'description', content: 'Dashboard' },
  ]
}

export default function Dashboard() {
  return <DashboardIndex />
}
