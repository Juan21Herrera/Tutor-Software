import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/global/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Classes from './pages/student/Classes'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        {/* <Route path="/forgot" element={<Forgot />}/> */}

        {/* Global Routes */}
        {/* <Route path="/profile" element={<Profile />}/> */}

        {/* Student Routes */}
        {/* <Route path="/diagnostic" element={<Diagnostic />}/>
        <Route path="/evaluation" element={<Evaluation />}/>
        <Route path="/learning" element={<Learning />}/>
        <Route path="/exercises" element={<Excercises />}/>
        <Route path="/recommendation" element={<Recommendation />}/> */}
        <Route path="/classes" element={<Classes />}/>

        {/* Admin Routes */}
        {/* <Route path="/dashboard" element={<Dashboard />}/> */}
      </Routes>
      
    </Router>
  )
}

export default App
