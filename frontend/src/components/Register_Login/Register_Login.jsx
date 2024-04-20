import { Route, Routes } from 'react-router-dom'
import LoginHome from './LoginHome'
import Login from './Login'
import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setLoggedIn, setEmail } from '../../Store.js';


function Register_Login() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'))
  
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      dispatch(setLoggedIn(false));
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
        dispatch(setLoggedIn('success' === r.message));
        dispatch(setEmail(user.email || ''));
      })
  }, [dispatch])

  return (
    <div className="Register_Login">
      <Routes>
          <Route path="/" element={<LoginHome />} />
          <Route path="Login" element={<Login />} />
        
      </Routes>
    </div>
  )
}

export default Register_Login;