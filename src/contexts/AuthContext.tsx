import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      // Check for admin credentials
      if (email === 'admin@church.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          email: 'admin@church.com',
          name: 'Church Administrator',
          role: 'admin',
          createdAt: new Date().toISOString()
        }
        setUser(adminUser)
        localStorage.setItem('user', JSON.stringify(adminUser))
        setLoading(false)
        return { success: true }
      }
      
      // Check for existing users in localStorage
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
          createdAt: foundUser.createdAt
        }
        setUser(userWithoutPassword)
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))
        setLoading(false)
        return { success: true }
      }
      
      setLoading(false)
      return { success: false, error: 'Invalid email or password' }
    } catch (error) {
      setLoading(false)
      return { success: false, error: 'An error occurred during login' }
    }
  }

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const existingUser = users.find((u: any) => u.email === email)
      
      if (existingUser) {
        setLoading(false)
        return { success: false, error: 'User with this email already exists' }
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        password, // In production, this would be hashed
        name,
        role: 'user' as const,
        createdAt: new Date().toISOString()
      }
      
      // Save to localStorage
      users.push(newUser)
      localStorage.setItem('registeredUsers', JSON.stringify(users))
      
      // Auto-login the new user
      const userWithoutPassword = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
      
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      setLoading(false)
      return { success: true }
    } catch (error) {
      setLoading(false)
      return { success: false, error: 'An error occurred during registration' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}