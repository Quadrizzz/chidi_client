import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/sidebar'
import {Route, Routes} from 'react-router-dom';
import Dashboard from './Pages/Dashboard/dashboard';
import Analytics from './Pages/Analytics/analytics';
import Staffs from './Pages/Staff/staff';
import Reports from './Pages/Reports/reports';
import Activity from './Pages/Activity/activity';
import AddStaff from './Pages/AddStaff/addStaff';
import Profile from './Pages/Profile/profile';

function App() {
  const [page, setPage] = useState("dashboard")

  return (
    <>
      <Sidebar page={page} setPage={setPage}/>
      <Routes>
        <Route path='/' element={<Dashboard page={page} setPage={setPage}/>} />
        <Route path='/analytics' element={<Analytics page={page} setPage={setPage}/>} />
        <Route path='/activities' element={<Activity page={page} setPage={setPage}/>} />
        <Route path='/staffs' element={<Staffs page={page} setPage={setPage}/>} />
        <Route path='/reports' element={<Reports page={page} setPage={setPage}/>} />
        <Route path='/addStaff' element={<AddStaff setPage={setPage}/>}/>
        <Route path='/staff/:id' element={<Profile setPage={setPage}/>}/>
      </Routes>
    </>
  )
}

export default App
