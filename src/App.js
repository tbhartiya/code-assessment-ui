import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import UserTest from './components/Test'
import LoginForm from './components/login/loginForm'
import './App.css'
import AdminContainer from './components/admin/admin'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const defaultUser = {
  name: '',
  email: '',
  role: ''
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [user, setUser] = useState(defaultUser)

  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setUser(defaultUser)
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('user-token')) {
      setUser(localStorage.getItem('user'))
      setToken(localStorage.getItem('user-token'))
    }
  }, [])

  return (
    <div className="App">
      {!token ? (
        <div>
          <Notify errorMessage={errorMessage} />
          <LoginForm setToken={setToken} setUser={setUser} setError={notify} />
        </div>
      ) : user.role === 'User' ? (
        <UserTest onLogout={logout} />
      ) : (
        <AdminContainer user={user} onLogout={logout} />
      )}
    </div>
  )
}

export default App
