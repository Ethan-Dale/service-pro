import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './elements/Header'
import Dashboard from './pages/Dashboard'
import JobDetailPage from './pages/JobDetailPage'
import Profile from './pages/Profile';
import Auth from './pages/Auth'
import AuthContext from './store/authContext';
import { useContext } from 'react';
 

function App() {
  const {userId} = useContext(AuthContext)
  return (
    <div >
      <Header/>
      <Routes>
        <Route index element={userId ? <Navigate to ='/dashboard'/> : <Auth/>}/>
        <Route path='/dashboard' element={userId ? <Dashboard/> : <Auth/>}/>
        <Route path='/profile' element={userId ? <Profile/> : <Auth/>}/>
        <Route path='/jobDetails/:jobId' element={userId ? <JobDetailPage/> : <Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;



