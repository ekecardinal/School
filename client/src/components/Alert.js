import React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { useAppContext } from '../context/appContext'

const BasicAlert = () => {
  const { alertType, alertText } = useAppContext()
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={alertType}>{alertText}</Alert>
    </Stack>
  )
}

export default BasicAlert
