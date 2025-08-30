// src/pages/Login.jsx
import { useState } from 'react'
import { supabase } from '../supabaseClient.js'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) setMessage(error.message)
    else setMessage("Login successful!")
  }

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">Login</h3>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          className="form-control mb-3" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          className="form-control mb-3" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn btn-dark w-100">Login</button>
      </form>
      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  )
}
