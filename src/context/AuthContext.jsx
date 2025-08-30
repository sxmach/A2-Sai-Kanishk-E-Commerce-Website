// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function init() {
      const {
        data: { user: currentUser }
      } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }))
      if (!mounted) return
      setUser(currentUser)
      setLoading(false)
      // listen for changes
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })
      return () => sub?.subscription?.unsubscribe?.()
    }
    init()
    return () => { mounted = false }
  }, [])

  async function signUp({ email, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    // Supabase may require email confirmation — data.user will be returned
    return data
  }

  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
