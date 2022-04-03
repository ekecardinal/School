import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import { Link } from 'react-router-dom'
import Tab from '@mui/material/Tab'

export default function CenteredTabs() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (window.location.pathname === '/staff' && value !== 0) {
      setValue(0)
    } else if (window.location.pathname === '/staff/all' && value !== 1) {
      setValue(1)
    }
  }, [value])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Item One" component={Link} to="/staff" />
        <Tab label="Item Two" component={Link} to="/staff/all" />
      </Tabs>
    </Box>
  )
}
