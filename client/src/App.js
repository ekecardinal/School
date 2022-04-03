import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddStaff from './pages/dashboard/AddStaff.js'
import AllStaff from './pages/dashboard/AllStaff.js'
import Login from './pages/index.js'
import ProtectedRoute from './pages/ProtectedRoute.js'

// import Register from './pages/Register.js'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route exact path="/register" element={<Register />} /> */}
        <Route
          exact
          path="/staff"
          element={
            <ProtectedRoute>
              <AddStaff />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/staff/all"
          element={
            <ProtectedRoute>
              <AllStaff />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
