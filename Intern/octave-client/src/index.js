import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './Pages/Intro';
import Navbar from './Pages/Navbar';
import Ex1b from './Pages/Introsub/Exp1/Ex1b';
import Simulation from './Pages/Introsub/Exp1/Simulation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Intro />} />
      <Route path="/1a" element={<Ex1b />} />
      <Route path='/Simulation' element={<Simulation/>} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
