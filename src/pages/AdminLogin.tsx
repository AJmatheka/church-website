import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AdminLogin = () => {
  const { isAuthenticated } = useAuth()

  // Redirect to sign in page since we now have unified auth
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Navigate to="/auth/signin" replace />
}

export default AdminLogin