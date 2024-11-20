import React, { useState } from 'react';
import './Formulario.css'; 

const EnvioDatos = () => {
  const [idEstudiante, setIdEstudiante] = useState('');
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [nombreMateria, setNombreMateria] = useState('');
  const [descripcionMateria, setDescripcionMateria] = useState('');
  const [nombreProfesor, setNombreProfesor] = useState('');
  const [response, setResponse] = useState(null);

  const postData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_estudiante: parseInt(idEstudiante), 
          nombre_estudiante: nombreEstudiante,
          nombre_materia: nombreMateria,
          descripcion_materia: descripcionMateria,
          nombre_profesor: nombreProfesor,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data);
        console.log("Respuesta del servidor:", data);
      } else {
        console.error("Error en la solicitud:", res.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 col-md-7 intro-section">
          <div className="brand-wrapper">
          </div>
          <div className="intro-content-wrapper">
            <h1 className="intro-title">Inscribir Estudiantes</h1>
          </div>
        </div>
        <div className="col-sm-6 col-md-5 form-section">
          <div className="login-wrapper">
            <h2 className="login-title">Inscribir Estudiante</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="idEstudiante" className="sr-only">ID Estudiante</label>
                <input
                  type="text"
                  name="idEstudiante"
                  id="idEstudiante"
                  className="form-control"
                  placeholder="ID Estudiante"
                  value={idEstudiante}
                  onChange={(e) => setIdEstudiante(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombreEstudiante" className="sr-only">Nombre Estudiante</label>
                <input
                  type="text"
                  name="nombreEstudiante"
                  id="nombreEstudiante"
                  className="form-control"
                  placeholder="Nombre Estudiante"
                  value={nombreEstudiante}
                  onChange={(e) => setNombreEstudiante(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombreMateria" className="sr-only">Nombre Materia</label>
                <input
                  type="text"
                  name="nombreMateria"
                  id="nombreMateria"
                  className="form-control"
                  placeholder="Nombre Materia"
                  value={nombreMateria}
                  onChange={(e) => setNombreMateria(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="descripcionMateria" className="sr-only">Descripción Materia</label>
                <input
                  type="text"
                  name="descripcionMateria"
                  id="descripcionMateria"
                  className="form-control"
                  placeholder="Descripción Materia"
                  value={descripcionMateria}
                  onChange={(e) => setDescripcionMateria(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombreProfesor" className="sr-only">Nombre Profesor</label>
                <input
                  type="text"
                  name="nombreProfesor"
                  id="nombreProfesor"
                  className="form-control"
                  placeholder="Nombre Profesor"
                  value={nombreProfesor}
                  onChange={(e) => setNombreProfesor(e.target.value)}
                />
              </div>
              <div id="boton" className="d-flex justify-content-between align-items-center mb-5">
                <input
                  name="login"
                  id="login"
                  className="btn login-btn"
                  type="submit"
                  value="Inscribir"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnvioDatos;
