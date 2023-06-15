import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './elements/Header';
import Footer from './elements/Footer';
import Dashboard from './pages/Dashboard';
import JobDetailPage from './pages/JobDetailPage';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import AuthContext from './store/authContext';
import JobForm from './pages/JobForm';
import { useContext } from 'react';

function App() {
    const location = useLocation();
    
    let contentClass = "content";
    if (location.pathname === "/JobForm") {
        contentClass = "content content-jobform";
    } else if (location.pathname === "/dashboard") {
        contentClass = "content content-dashboard";
    } else if (location.pathname === "/profile") {
        contentClass = "content content-profile";
    } else if (location.pathname === "/") {
        contentClass = "content content-auth";
    }

    let footerClass = "footer-full";
    if (location.pathname === "/") {
        footerClass = "footer-auth";
    }

    const { userId } = useContext(AuthContext);
    const paddingTop = location.pathname !== '/' ? '73px' : '0px';

    return (
        <div className="app-container">
            <Header />
            <div className={contentClass} style={{ paddingTop: paddingTop }}>
                <Routes>
                    <Route index element={<Auth />} />
                    <Route path="/JobForm" element={userId ? <JobForm /> : <Auth />} />
                    <Route path="/dashboard" element={userId ? <Dashboard /> : <Auth />} />
                    <Route path="/profile" element={userId ? <Profile /> : <Auth />} />
                    <Route path="/jobDetails/:jobId" element={userId ? <JobDetailPage /> : <Auth />} />
                </Routes>
            </div>
            <Footer className={footerClass} />
        </div>
    );
}

export default App;
