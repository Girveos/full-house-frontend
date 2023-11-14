import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CubeReact from './components/cube/cubo.js';
import FacebookPage from './components/facebook/facebook';
import WhatsAppPage from './components/whatsapp/whatsapp';
import YoutubePage from './components/youtube/youtube';
import MenuReact from './components/menu/MenuReact';
import TermsAndConditionsPage from './components/terms/terms';
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/registerPage/RegisterPage';
import AuthGuard from './AuthGuard';
import UserDashboard from './components/userdashboard/UserDashboard.js';
import AdminDashboard from './components/admindashboard/AdminDashboard.js';
import  ChangePassword  from './components/changePassword/ChangePassword.js';

function App() {

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MenuReact />
                {/*<CubeReact />*/}
                {/* <TranslucentMenu /> */}
              </>
            }
          />
          <Route path="/facebook" element={<FacebookPage />} />
          <Route path="/whatsapp" element={<WhatsAppPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/LogIn" element={<LoginPage />} />
          <Route path="/SignUp" element={<RegisterPage />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route
            path="/DashboardUserFullHouse"
            element={<AuthGuard requiredRole="user"><UserDashboard /></AuthGuard>}
          />
          <Route
            path="/DashboardAdminFullHouse"
            element={<AuthGuard requiredRole="admin"><AdminDashboard /></AuthGuard>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
