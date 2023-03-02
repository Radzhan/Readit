import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './features/user/Login';
import Register from './features/user/Register';
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
