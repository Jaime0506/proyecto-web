# test_app.py

import unittest
from app import app, db, Usuario, Salon, Asignacion, AsignacionEstudiante
from flask_login import login_user

class FlaskAppTestCase(unittest.TestCase):

    def setUp(self):
        """Configurar el entorno de pruebas."""
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app
        self.client = app.test_client()

        with app.app_context():
            db.create_all()

            # Crear un usuario de prueba
            self.admin_user = Usuario(username='admin', password='admin', rol='admin')
            self.profesor_user = Usuario(username='profesor', password='profesor', rol='profesor')
            self.estudiante_user = Usuario(username='estudiante', password='estudiante', rol='estudiante')
            db.session.add(self.admin_user)
            db.session.add(self.profesor_user)
            db.session.add(self.estudiante_user)
            db.session.commit()

    def tearDown(self):
        """Eliminar la base de datos después de las pruebas."""
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_login(self):
        """Prueba que el inicio de sesión funcione correctamente."""
        response = self.client.post('/login', data={
            'username': 'admin',
            'password': 'admin'
        })
        self.assertEqual(response.status_code, 302)  # Redirección después del inicio de sesión
        self.assertIn(b'Dashboard', response.data)

    def test_register_user(self):
        """Prueba que el registro de usuario funcione correctamente."""
        response = self.client.post('/register', data={
            'username': 'nuevo_usuario',
            'password': 'password',
            'rol': 'estudiante'
        })
        self.assertEqual(response.status_code, 302)
        user = Usuario.query.filter_by(username='nuevo_usuario').first()
        self.assertIsNotNone(user)

    def test_asignar_salon(self):
        """Prueba la asignación de un salón a un profesor."""
        with self.client:
            login_user(self.admin_user)  # Iniciar sesión como admin
            salon = Salon(nombre='Salon A', capacidad=30)
            db.session.add(salon)
            db.session.commit()
            response = self.client.post('/asignar_profesor', data={
                'profesor_id': self.profesor_user.id,
                'salon_id': salon.id,
                'fecha_inicio': '2024-10-01T10:00',
                'fecha_fin': '2024-10-01T12:00'
            })
            self.assertEqual(response.status_code, 302)  # Redirección
            asignacion = Asignacion.query.filter_by(profesor_id=self.profesor_user.id).first()
            self.assertIsNotNone(asignacion)

    # Puedes añadir más pruebas para las funciones y rutas que necesites

if _name_ == '_main_':
    unittest.main()