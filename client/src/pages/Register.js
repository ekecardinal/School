import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import BasicAlert from '../components/Alert'
import { useAppContext } from '../context/appContext'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export default function Register() {
  const [value, setValue] = useState(initialState)
  const navigate = useNavigate()
  //global state
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext()

  const toggleMember = () => {
    setValue({ ...value, isMember: !value.isMember })
  }

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = value
    if (!password || !email || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
    // console.log(value)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/staff')
      })
    }
  }, [user, navigate])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            {value.isMember ? 'Login' : 'Register'}
          </Typography>
          {showAlert && <BasicAlert />}
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {!value.isMember && (
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    label="Name"
                    // value={value.name}
                    // onChange={handleChange}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={value.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={value.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {value.isMember ? 'Login' : 'Register'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button type="button" onClick={toggleMember}>
                  <Typography
                    color="secondary"
                    textTransform="none"
                    variant="body2"
                  >
                    {value.isMember
                      ? 'Not a member yet? Register'
                      : 'Already a member? Login'}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
