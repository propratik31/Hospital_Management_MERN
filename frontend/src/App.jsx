
import './App.css'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from "react-toastify"
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import { userAuthStore } from './stores/userAuthStore'
import ShowDoctors from './pages/ShowDoctors'
import ShowPatients from './pages/ShowPatients'
import ManageOtherStaff from './components/ManageOtherStaff'
import BookAppointmentForm from './components/BookAppointmentForm'
import PatientAppointments from './components/PatientAppointments'
import PatientProfileCard from './components/PatientProfileCard'
import React, {Suspense} from 'react';
import DoctorsAppointmentTable from './components/DoctorsAppointmentTable';
import SignupPage from './pages/SignupPage';

const HomePage = React.lazy(() => import('./pages/HomePage'));
function App() {
  const {user}=userAuthStore();
     

  return (
   <Router>
      <Navbar/>

      <Suspense fallback={<h4 className='text-center mt-5'>Loading Home Page....</h4>}>
           
      <Routes>
      {/* Admin Routes */}
      <Route path="/login" element={!user?<LoginPage/>:<Navigate to="/"/>}/>
      <Route path="/register" element={<SignupPage/>} />
      <Route path="/" element={user?<HomePage/>:<Navigate to="/login"/>}/>
      <Route path="/doctors" element={user?.role==="Admin"?<ShowDoctors/>:<Navigate to="/login"/>}/>
      <Route path='/patients' element={user?.role==="Admin"?<ShowPatients/>:<Navigate to="/login"/>}/>
      <Route path='/staff' element={user?.role==="Admin"?<ManageOtherStaff/>:<Navigate to="/login"/>}/>
      

      {/* Patients Routes */}
      <Route path='/bookAppointment' element={user?.role==="Patient"?<BookAppointmentForm/>:<Navigate to="/login"/>}/>
      <Route path='/myAppointments' element={user?.role==="Patient"?<PatientAppointments/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={user?.role==="Patient"?<PatientProfileCard/>:<Navigate to="/login"/>}/>

      {/* Doctor Routes */}
        <Route path="/doctor/appointments" element={user?.role=="Doctor"?<DoctorsAppointmentTable/>:<Navigate to ="/login"/>}/>

    </Routes>
      </Suspense>


      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="colored"
      />
   </Router>
    
  );
}

export default App
