import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/global/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Classes from './pages/student/Classes'
import Profile from './pages/global/Profile'
import ProtectedRoutes from './components/Auth/ProtectedRoutes'
import PublicRoutes from './components/Auth/PublicRoutes'
import Excercises from './pages/student/Excercises'
import ClassDetail from './pages/student/ClassDetail'
// import Recommendation from './pages/student/Recommendation'
// import Diagnostic from './pages/student/Diagnostic'
// import Evaluation from './pages/student/Evaluation'
// import Learning from './pages/student/Learning'
// import Dashboard from './pages/admin/Dashboard'
import './App.css'

function App() {

  return (
    
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>}/>
        <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>}/>
        {/* <Route path="/forgot" element={<PublicRoutes><Forgot /></PublicRoutes>}/> */}

        {/* Global Routes */}
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>}/>

        {/* Student Routes */}
        {/* <Route path="/diagnostic" element={<ProtectedRoutes><Diagnostic /></ProtectedRoutes>}/>
        <Route path="/evaluation" element={<ProtectedRoutes><Evaluation /></ProtectedRoutes>}/>
        <Route path="/learning" element={<ProtectedRoutes><Learning /></ProtectedRoutes>}/>*/}
        <Route path="/exercises" element={<ProtectedRoutes><Excercises /></ProtectedRoutes>}/>
        {/* <Route path="/recommendation" element={<ProtectedRoutes><Recommendation /></ProtectedRoutes>}/>  */}
        <Route path="/classes" element={<ProtectedRoutes><Classes /></ProtectedRoutes>}/>
        <Route path="/classes/:id" element={<ProtectedRoutes><ClassDetail /></ProtectedRoutes>} />

        {/* Admin Routes */}
        {/* <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/> */}
      </Routes>
      
    
  )
}

export default App
