import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import CenteredTabs from './Tabs'

export default function AllStaff() {
  const {
    getStaffs,
    staffs,
    isLoading,
    totalStaffs,
    setEditStaff,
    deleteStaff,
  } = useAppContext()

  React.useEffect(() => {
    getStaffs()
  }, [])

  if (staffs.length === 0) {
    return <div>No jobs to display...</div>
  }

  return (
    <>
      <CenteredTabs />
      <Paper
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 'auto',
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <h4>
            {totalStaffs} Staff {staffs.length > 1 && 's'}
          </h4>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Staff</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs.map((staff) => {
                return (
                  <TableRow key={staff._id}>
                    <TableCell>{staff.staffName}</TableCell>
                    <TableCell>{staff.level}</TableCell>
                    <TableCell>{staff.subject}</TableCell>
                    <TableCell>{staff.date}</TableCell>
                    <TableCell>
                      {staff.salary}
                      {staff._id}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        variant="contained"
                        component={Link}
                        to="/staff"
                        sx={{ mt: 2, mb: 1, mr: 1 }}
                        onClick={() => setEditStaff(staff._id)}
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, mb: 1 }}
                        onClick={() => deleteStaff(staff._id)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}
