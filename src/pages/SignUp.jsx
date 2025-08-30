// src/pages/Signup.jsx
import { useState } from 'react'
import { supabase } from '../supabaseClient.js'

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSignup = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) setMessage(error.message)
    else setMessage("Signup successful! Check your email to confirm.")
  }

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">Sign Up</h3>
      <form onSubmit={handleSignup}>
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
        <button type="submit" className="btn btn-dark w-100">Sign Up</button>
      </form>
      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  )
}
