// import logo from './logo.svg';
import React from 'react';
import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Path404Page from './pages/Path404Page';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import DashboardDetailPage from './pages/DashboardDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path='/dashboard/detail/:id' element={<DashboardDetailPage />}/>
        <Route path='*' element={<Path404Page />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
