import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/global/Home'
import Register from './pages/auth/Register'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />}/>
        {/* <Route path="/login" element={<Login />}/> */}
        <Route path="/register" element={<Register />}/>
        {/* <Route path="/forgot" element={<Forgot />}/> */}

        {/* Global Routes */}
        {/* <Route path="/profile" element={<Profile />}/> */}

        {/* Student Routes */}
        {/* <Route path="/student/diagnostic" element={<Diagnostic />}/>
        <Route path="/student/evaluation" element={<Evaluation />}/>
        <Route path="/student/learning" element={<Learning />}/>
        <Route path="/student/exercises" element={<Excercises />}/>
        <Route path="/student/recommendation" element={<Recommendation />}/>
        <Route path="/student/classes" element={<Classes />}/> */}

        {/* Admin Routes */}
        {/* <Route path="/admin/dashboard" element={<Dashboard />}/> */}
      </Routes>
      
    </Router>
  )
}

export default App
