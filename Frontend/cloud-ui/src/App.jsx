import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CloudDashboard from './pages/CloudDashboard';
import { Footer } from './components/dashboardUI/Footer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<CloudDashboard />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
