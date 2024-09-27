import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Navbar from './Components/Navbar'
import EmployeTable from './Components/EmployeTable'
// import EmployUpdate from './Components/EmployUpdate'
import AddEmploy from './Components/AddEmploy'
import Protected from './Components/Protected'
import UpdateEmployee from './Components/UpdateEmployee'
import { useAppContext } from './context/appContext'

function App() {
  const {selected} = useAppContext();

  return (
    <div className='w-[80vw] mx-auto'>
      <Toaster/>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route element={<Protected/>}>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/EmployList" element={<EmployeTable/>} />
        {/* <Route path="/employeUpdate" element={<EmployUpdate/>} /> */}
        <Route path="/create-emp" element={<AddEmploy/>} />
        <Route path="/update-emp" element={<UpdateEmployee employee={selected} />} />
        </Route>
      </Routes>
    </Router>
   
    </div>
  )
}

export default App
