import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Home from './Routes/Home';
import reportWebVitals from './reportWebVitals';
import Results from './Routes/Results';
import AppointmentPage from './Routes/AppointmentPage'
import CurrentAppointment from './Routes/CurrentAppointment'
import AddReportPage from './Routes/AddReportPage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home/>}/>
        <Route path="results" element={<Results/>}/>
        <Route path="appointment" element={<AppointmentPage/>}/>
        <Route path="currentAppointment" element={<CurrentAppointment/>}/>
        <Route path="addReportPage" element={<AddReportPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
