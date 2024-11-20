import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        name: '',
        description: '',
        professor: '',
        schedule: '',
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/courses/')
            .then(response => {
                setCourses(response.data);
            });
    }, []);

    const handleInputChange = (e) => {
        setNewCourse({
            ...newCourse,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/courses/', newCourse)
            .then(() => {
                setCourses([...courses, newCourse]);
            });
    };

    return (
        <div>
            <h2>Cursos</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.name}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" onChange={handleInputChange} />
                <input type="text" name="description" placeholder="Descripción" onChange={handleInputChange} />
                <input type="text" name="professor" placeholder="Profesor" onChange={handleInputChange} />
                <input type="text" name="schedule" placeholder="Horario" onChange={handleInputChange} />
                <button type="submit">Agregar Curso</button>
            </form>
        </div>
    );
};

export default Courses;