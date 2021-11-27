import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Button,
  Typography,
  Grid,
  TextField,
  Backdrop,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useMutation } from '@apollo/client'
import { LOGIN, CREATE_USER } from '../../queries'
import '../../App.css'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}

const LoginForm = ({ setError, setToken, setRole }) => {
  const [email, setemail] = useState('')
  const [name, setName] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
  const [password, setPassword] = useState('')
  const [isSignUpComplete, setIsSignUpComplete] = useState(false)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  const [createUser, createresult] = useMutation(CREATE_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  const loading = useMemo(() => {
    return result?.loading || createresult?.loading
  }, [result, createresult])

  useEffect(() => {
    console.log('Here', result)
    if (result.data) {
      const { token, role } = result.data.login
      setRole(role)
      setToken(token)
      localStorage.setItem('user-token', token)
      localStorage.setItem('user-role', role)
    }
  }, [result.data, createresult]) // eslint-disable-line

  const loginNow = async (event) => {
    event.preventDefault()
    login({ variables: { email, password } })
  }

  const createNewUser = async (event) => {
    event.preventDefault()
    createUser({ variables: { email, password, name } }).then(() => {
      setIsSignUpComplete(true)
    })
  }

  const switchLoginView = useCallback(() => {
    setIsSignUp((prev) => !prev)
    setIsSignUpComplete(false)
  }, [setIsSignUpComplete, setIsSignUp])

  console.log('isSignUpComplete', isSignUpComplete)

  return (
    <div className="Login-container">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2} direction="column"
        alignItems="center"
        justifyContent="center">
        <Grid item xs={12} className="Grid-item">
          <p>Welcome to Incedo .Login to Proceed</p>
        </Grid>
        <Grid item xs={6} mt={5}>
          {isSignUp ? (
            isSignUpComplete ? (
              <div>
                <Alert severity="success">
                  Successfully Created a new Account!
                </Alert>
                <Button onClick={switchLoginView}> Login </Button>
              </div>
            ) : (
              <div style={styles.container}>
                <Typography variant="h4"> Sign Up </Typography>
                <TextField
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  variant="filled"
                />
                <Button
                  variant="primary"
                  onClick={createNewUser}
                  style={{ width: 100, marginTop: 10 }}
                >
                  Sign Up
                </Button>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 40,
                  }}
                >
                  <Typography variant="h6">
                    {' '}
                    Already have an Account ?{' '}
                  </Typography>
                  <Button variant="primary" onClick={switchLoginView}> Login </Button>
                </div>
              </div>
            )
          ) : (
            <div style={styles.container}>
              <Typography variant="h4"> Login </Typography>
              <TextField
                id="email"
                label="Email"
                value={email}
                type="email"
                onChange={(e) => setemail(e.target.value)}
                margin="normal"
                variant="filled"
              />
              <TextField
                id="password"
                variant="filled"
                label="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />
              <Button
                variant="primary"
                onClick={loginNow}
                style={{ width: 100, marginTop: 10 }}
              >
                Login
              </Button>
              <div
                style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}
              >
                <Typography variant="h6"> Don't have an Account ? </Typography>
                <Button variant="primary" onClick={switchLoginView}> Sign Up </Button>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginForm
