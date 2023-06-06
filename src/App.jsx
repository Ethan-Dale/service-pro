import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './elements/Header'
import CustomerDashboard from './pages/CustomerDashboard'
import JobDetailPage from './pages/JobDetailPage'
import TradesmenDashboard from './pages/TradesmenDashboard'
import Profile from './pages/Profile';
import Auth from './pages/Auth'
 

function App() {
  return (
    <div >
      <Header/>
      <Routes>
        <Route index element={<Auth/>}/>
        <Route path='/dashboard' element={<CustomerDashboard/>}/>
        <Route path='/dashboard1' element={<TradesmenDashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/jobDetails/:jobId' element={<JobDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
