import React from 'react'
// import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
// import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
// import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import BasicAlert from '../../components/Alert'
import { useAppContext } from '../../context/appContext'
import CenteredTabs from './Tabs'

const theme = createTheme()

function AddStaff() {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    staffName,
    subject,
    date,
    level,
    salary,
    handleChange,
    createStaff,
    editStaff,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!staffName || !subject || !date || !level || !salary) {
      displayAlert()
      return
    }
    if (isEditing) {
      editStaff()
      return
    }
    createStaff()
  }

  const handleStaffInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }
  return (
    <ThemeProvider theme={theme}>
      <CenteredTabs />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {isEditing ? 'Edit Staff' : 'Add Staff'}
          </Typography>
          {showAlert && <BasicAlert />}
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Staff Name */}
              <Grid item md={12} xs={6}>
                <TextField
                  required
                  fullWidth
                  label="staff name"
                  type="text"
                  name="staffName"
                  defaultValue={staffName}
                  onChange={handleStaffInput}
                />
              </Grid>

              {/* Staff Subject */}
              <Grid item md={12} xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Subject"
                  type="text"
                  name="subject"
                  defaultValue={subject}
                  onChange={handleStaffInput}
                />
              </Grid>

              {/* Date */}
              <Grid item md={12} xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Start Date"
                  type="text"
                  name="date"
                  defaultValue={date}
                  onChange={handleStaffInput}
                />
              </Grid>

              {/* Class as Level */}
              <Grid item md={12} xs={6}>
                <TextField
                  required
                  fullWidth
                  label="class"
                  type="text"
                  name="level"
                  defaultValue={level}
                  onChange={handleStaffInput}
                />
              </Grid>
              <Grid item md={12} xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Salary"
                  type="text"
                  name="salary"
                  defaultValue={salary}
                  onChange={handleStaffInput}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Create Staff
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default AddStaff
