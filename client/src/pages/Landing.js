import React from 'react'
import { Link } from 'react-router-dom'
import { Box, CssBaseline, Container, Button } from '@mui/material'

function Landing() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" justify="center">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& > :not(style)': {
              m: '2.5em',
              width: 500,
            },
          }}
        >
          <h1>Welcome Please Login</h1>
          <Button variant="contained" component={Link} to="/register">
            Register / Login
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default Landing
