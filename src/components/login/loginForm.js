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
import incedo from '../../incedo.png'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}

const LoginForm = ({ setError, setToken, setUser }) => {
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
    if (result.data) {
      const { email, name, token, role, id } = result.data.login
      setUser({ email, name, role })
      setToken(token)
      localStorage.setItem('user-token', token)
      const user = { email, name, role, id }
      localStorage.setItem('user', JSON.stringify(user))
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

  return (
    <div className="Login-container">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} className="Grid-item">
          <img src={incedo} alt="Incedo" />
          <Typography variant="h4">
            Welcome to Incedo .Login to Proceed
          </Typography>
        </Grid>
        <Grid item xs={6} mt={5}>
          {isSignUp ? (
            isSignUpComplete ? (
              <div>
                <Alert severity="success">
                  Successfully Created a new Account!
                </Alert>
                <Button onClick={switchLoginView} color="secondary">
                  {' '}
                  Login{' '}
                </Button>
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
                  variant="outlined"
                  color="secondary"
                />
                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                />
                <Button
                  color="secondary"
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
                  <Button color="secondary" onClick={switchLoginView}>
                    {' '}
                    Login{' '}
                  </Button>
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
                variant="outlined"
                color="secondary"
              />
              <TextField
                id="password"
                variant="outlined"
                label="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                color="secondary"
              />
              <Button
                color="secondary"
                onClick={loginNow}
                style={{ width: 100, marginTop: 10 }}
              >
                Login
              </Button>
              <div
                style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}
              >
                <Typography variant="h6"> Don't have an Account ? </Typography>
                <Button color="secondary" onClick={switchLoginView}>
                  {' '}
                  Sign Up{' '}
                </Button>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginForm
