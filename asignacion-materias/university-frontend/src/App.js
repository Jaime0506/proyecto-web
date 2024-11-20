import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AssignmentForm from './AssignmentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Bienvenido a la aplicación</div>} />
        <Route path="/asignar-materias" element={<AssignmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
