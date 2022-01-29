import 'App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from 'components/login/Login';
import CardDashboard from 'components/card/CardDashboard';
import Register from 'components/register/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/dashboard" exact element={<CardDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
