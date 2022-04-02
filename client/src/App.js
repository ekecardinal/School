import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TabCentral from './pages/dashboard/TabCentral.js'
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
              <TabCentral />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
