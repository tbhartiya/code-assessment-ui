import React, { useState } from 'react'
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

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [role, setRole] = useState('')
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className="App">
      {!token ? (
        <div>
          <Notify errorMessage={errorMessage} />
          <LoginForm setToken={setToken} setRole={setRole} setError={notify} />
        </div>
      ) : role === 'User' ? (
        <UserTest onLogout={logout} />
      ) : (
        <AdminContainer />
      )}
    </div>
  )
}

export default App
