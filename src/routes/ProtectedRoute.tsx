import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Loading from '@/components/ui/Loading'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading, isConfigured } = useAuth()

  // Without Supabase configured there is no real session to check. Rather
  // than fake a logged-in state, the admin panel stays viewable so the UI
  // can be reviewed, but write actions are blocked at the service layer
  // (see src/services/*.ts) and the login page explains what's needed.
  if (!isConfigured) return <>{children}</>

  if (loading) return <Loading label="Checking session" />
  if (!session) return <Navigate to="/admin/login" replace />

  return <>{children}</>
}
