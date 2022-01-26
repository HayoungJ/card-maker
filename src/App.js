import 'App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from 'components/login/Login';
import CardDashboard from 'components/card/CardDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" exact element={<CardDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
