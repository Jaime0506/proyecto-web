import React, { useState } from 'react';
import './Formulario.css'; 

const EnvioDatos = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [professor, setProfessor] = useState('');
  const [schedule, setSchedule] = useState('');
  const [response, setResponse] = useState(null);

  const postData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/courses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          professor,
          schedule,
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
            <form>
              <div className="form-group">
                <label htmlFor="Nombre" className="sr-only">Nombre</label>
                <input
                  type="text"
                  name="Nombre"
                  id="Nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Descripcion" className="sr-only">Descripción</label>
                <input
                  type="text"
                  name="Descripcion"
                  id="Descripcion"
                  className="form-control"
                  placeholder="Descripcion"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="Profesor" className="sr-only">Profesor</label>
                <input
                  type="text"
                  name="Profesor"
                  id="Profesor"
                  className="form-control"
                  placeholder="Profesor"
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="horario" className="sr-only">Horario</label>
                <input
                  type="text"
                  name="horario"
                  id="horario"
                  className="form-control"
                  placeholder="Horario"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>
              <div id="boton" className="d-flex justify-content-between align-items-center mb-5">
                <input
                  name="login"
                  id="login"
                  className="btn login-btn"
                  type="button"
                  value="Inscribir"
                  onClick={postData}
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
