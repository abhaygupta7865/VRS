import { Route, Routes } from 'react-router-dom'
import LoginHome from './LoginHome'
import Login from './Login'
import React,{ useEffect, useState } from 'react'


function Register_Login() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'))
  
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
  
    // If the token exists, verify it with the auth server to see if it is valid
    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn('success' === r.message)
        setEmail(user.email || '')
      })
  }, [])

  return (
    <div className="Register_Login">
      <Routes>
          <Route path="/" element={<LoginHome email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="Login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        
      </Routes>
    </div>
  )
}

export default Register_Login