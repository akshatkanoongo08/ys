import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useState } from 'react'
import RefreshHandler from './RefreshHandler'

function App() {
  const [isAuthenticated,setisAuthenticated]=useState(false);
  const PrivateRoute=({element})=>{
    return isAuthenticated?element:<Navigate to="/login"/>
  }


  return (
    <div className='App'>
      <RefreshHandler setisAuthenticated={setisAuthenticated}/>
    <Routes>
<Route path='/' element={<Navigate to="/login"/>}/>      
<Route path='/login' element={<Login/>}/>
<Route path='/Home' element={<PrivateRoute element={<Home/>}/>}/>
<Route path='/Signup' element={<Signup/>}/>

    </Routes>
    </div>
  )
}

export default App
