from flask import Flask, render_template, request, redirect, url_for, flash, abort
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from functools import wraps
from flask import jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = 'tu_clave_secreta_aqui'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sistema_salones.db'
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Modelos
class Usuario(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    rol = db.Column(db.String(20), nullable=False, default='estudiante')

class Salon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    capacidad = db.Column(db.Integer, nullable=False)

class Asignacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    salon_id = db.Column(db.Integer, db.ForeignKey('salon.id'), nullable=False)
    profesor_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    fecha_inicio = db.Column(db.DateTime, nullable=False)
    fecha_fin = db.Column(db.DateTime, nullable=False)

    salon = db.relationship('Salon', backref=db.backref('asignaciones', lazy=True))
    profesor = db.relationship('Usuario', backref=db.backref('asignaciones_profesor', lazy=True))

class AsignacionEstudiante(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    asignacion_id = db.Column(db.Integer, db.ForeignKey('asignacion.id'), nullable=False)
    estudiante_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)

    asignacion = db.relationship('Asignacion', backref=db.backref('estudiantes', lazy=True))
    estudiante = db.relationship('Usuario', backref=db.backref('asignaciones_estudiante', lazy=True))

class Mensaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    remitente_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    destinatario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    asunto = db.Column(db.String(100), nullable=False)
    contenido = db.Column(db.Text, nullable=False)
    fecha_envio = db.Column(db.DateTime, default=datetime.utcnow)
    leido = db.Column(db.Boolean, default=False)

    remitente = db.relationship('Usuario', foreign_keys=[remitente_id], backref=db.backref('mensajes_enviados', lazy=True))
    destinatario = db.relationship('Usuario', foreign_keys=[destinatario_id], backref=db.backref('mensajes_recibidos', lazy=True))


class calendario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    all_day = db.Column(db.Boolean, default=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    usuario = db.relationship('Usuario', backref=db.backref('calendar_events', lazy='dynamic'))


class editar_asignacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    salon_id = db.Column(db.Integer, db.ForeignKey('salon.id'), nullable=False)
    profesor_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    fecha_inicio = db.Column(db.DateTime, nullable=False)
    fecha_fin = db.Column(db.DateTime, nullable=False)
    salon = db.relationship('Salon', backref=db.backref('edited_assignments', lazy='dynamic'))
    profesor = db.relationship('Usuario', backref=db.backref('edited_assignments', lazy='dynamic'))
    original_assignment_id = db.Column(db.Integer, db.ForeignKey('asignacion.id'), nullable=False)
    original_assignment = db.relationship('Asignacion', backref=db.backref('edited_assignment', uselist=False))



@login_manager.user_loader
def load_user(user_id):
    return Usuario.query.get(int(user_id))

# Funciones auxiliares
def hay_conflicto_horario(usuario_id, fecha_inicio, fecha_fin):
    # Verificar conflictos para profesores
    conflictos_profesor = Asignacion.query.filter(
        Asignacion.profesor_id == usuario_id,
        ((Asignacion.fecha_inicio <= fecha_inicio) & (Asignacion.fecha_fin > fecha_inicio)) |
        ((Asignacion.fecha_inicio < fecha_fin) & (Asignacion.fecha_fin >= fecha_fin)) |
        ((Asignacion.fecha_inicio >= fecha_inicio) & (Asignacion.fecha_fin <= fecha_fin))
    ).first()

    if conflictos_profesor:
        return True

# Funciones auxiliares
def hay_conflicto_horario(usuario_id, fecha_inicio, fecha_fin, exclude_id=None):
    # Verificar conflictos para estudiantes
    conflictos_estudiante = AsignacionEstudiante.query.join(Asignacion).filter(
        AsignacionEstudiante.estudiante_id == usuario_id,
        ((Asignacion.fecha_inicio <= fecha_inicio) & (Asignacion.fecha_fin > fecha_inicio)) |
        ((Asignacion.fecha_inicio < fecha_fin) & (Asignacion.fecha_fin >= fecha_fin)) |
        ((Asignacion.fecha_inicio >= fecha_inicio) & (Asignacion.fecha_fin <= fecha_fin))
    ).first()

    return conflictos_estudiante is not None

# Decoradores personalizados
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or current_user.rol != 'admin':
            abort(403)
        return f(*args, **kwargs)
    return decorated_function

def profesor_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or current_user.rol != 'profesor':
            abort(403)
        return f(*args, **kwargs)
    return decorated_function

# Rutas
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = Usuario.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        flash('Usuario o contraseña inválidos', 'error')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        rol = request.form['rol']

        if Usuario.query.filter_by(username=username).first():
            flash('El nombre de usuario ya existe', 'error')
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password)
        new_user = Usuario(username=username, password=hashed_password, rol=rol)
        db.session.add(new_user)
        db.session.commit()
        flash('Registrado exitosamente', 'success')
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.rol == 'admin':
        return redirect(url_for('admin_dashboard'))
    elif current_user.rol == 'profesor':
        return redirect(url_for('profesor_dashboard'))
    else:
        return redirect(url_for('estudiante_dashboard'))

@app.route('/admin_dashboard')
@login_required
@admin_required
def admin_dashboard():
    profesores = Usuario.query.filter_by(rol='profesor').all()
    estudiantes = Usuario.query.filter_by(rol='estudiante').all()
    salones = Salon.query.all()
    asignaciones = Asignacion.query.all()
    return render_template('admin_dashboard.html', profesores=profesores, estudiantes=estudiantes, salones=salones, asignaciones=asignaciones)

@app.route('/profesor_dashboard')
@login_required
@profesor_required
def profesor_dashboard():
    asignaciones = Asignacion.query.filter_by(profesor_id=current_user.id).all()
    return render_template('profesor_dashboard.html', asignaciones=asignaciones)

@app.route('/estudiante_dashboard')
@login_required
def estudiante_dashboard():
    asignaciones = AsignacionEstudiante.query.filter_by(estudiante_id=current_user.id).all()
    return render_template('estudiante_dashboard.html', asignaciones=asignaciones)

@app.route('/asignar_profesor', methods=['POST'])
@login_required
@admin_required
def asignar_profesor():
    profesor_id = request.form['profesor_id']
    salon_id = request.form['salon_id']
    fecha_inicio = datetime.strptime(request.form['fecha_inicio'], '%Y-%m-%dT%H:%M')
    fecha_fin = datetime.strptime(request.form['fecha_fin'], '%Y-%m-%dT%H:%M')

    if fecha_inicio >= fecha_fin:
        flash('La fecha de inicio debe ser anterior a la fecha de fin', 'error')
        return redirect(url_for('admin_dashboard'))

    # Verificar si el salón está disponible
    asignaciones_existentes = Asignacion.query.filter_by(salon_id=salon_id).filter(
        ((Asignacion.fecha_inicio <= fecha_inicio) & (Asignacion.fecha_fin > fecha_inicio)) |
        ((Asignacion.fecha_inicio < fecha_fin) & (Asignacion.fecha_fin >= fecha_fin)) |
        ((Asignacion.fecha_inicio >= fecha_inicio) & (Asignacion.fecha_fin <= fecha_fin))
    ).all()

    if asignaciones_existentes:
        flash('El salón no está disponible en ese horario', 'error')
        return redirect(url_for('admin_dashboard'))

    # Verificar si hay conflicto de horario para el profesor
    if hay_conflicto_horario(profesor_id, fecha_inicio, fecha_fin):
        flash('El profesor tiene un conflicto de horario', 'error')
        return redirect(url_for('admin_dashboard'))

    nueva_asignacion = Asignacion(salon_id=salon_id, profesor_id=profesor_id, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin)
    db.session.add(nueva_asignacion)
    db.session.commit()
    flash('Profesor asignado correctamente', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/asignar_salon', methods=['POST'])
@login_required
@profesor_required
def asignar_salon():
    salon_id = request.form['salon_id']
    fecha_inicio = datetime.strptime(request.form['fecha_inicio'], '%Y-%m-%dT%H:%M')
    fecha_fin = datetime.strptime(request.form['fecha_fin'], '%Y-%m-%dT%H:%M')

    if fecha_inicio >= fecha_fin:
        flash('La fecha de inicio debe ser anterior a la fecha de fin', 'error')
        return redirect(url_for('profesor_dashboard'))

    # Verificar si el salón está disponible
    asignaciones_existentes = Asignacion.query.filter_by(salon_id=salon_id).filter(
        ((Asignacion.fecha_inicio <= fecha_inicio) & (Asignacion.fecha_fin > fecha_inicio)) |
        ((Asignacion.fecha_inicio < fecha_fin) & (Asignacion.fecha_fin >= fecha_fin)) |
        ((Asignacion.fecha_inicio >= fecha_inicio) & (Asignacion.fecha_fin <= fecha_fin))
    ).all()

    if asignaciones_existentes:
        flash('El salón no está disponible en ese horario', 'error')
        return redirect(url_for('profesor_dashboard'))

    # Verificar si hay conflicto de horario para el profesor
    if hay_conflicto_horario(current_user.id, fecha_inicio, fecha_fin):
        flash('Usted tiene un conflicto de horario', 'error')
        return redirect(url_for('profesor_dashboard'))

    nueva_asignacion = Asignacion(salon_id=salon_id, profesor_id=current_user.id, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin)
    db.session.add(nueva_asignacion)
    db.session.commit()
    flash('Salón asignado correctamente', 'success')
    return redirect(url_for('profesor_dashboard'))

@app.route('/asignar_estudiante', methods=['POST'])
@login_required
@admin_required
def asignar_estudiante():
    estudiante_id = request.form['estudiante_id']
    asignacion_id = request.form['asignacion_id']

    estudiante = Usuario.query.get(estudiante_id)
    if not estudiante or estudiante.rol != 'estudiante':
        flash('Estudiante no válido', 'error')
        return redirect(url_for('admin_dashboard'))

    # Verificar si el estudiante ya tiene 6 asignaciones
    asignaciones_estudiante = AsignacionEstudiante.query.filter_by(estudiante_id=estudiante_id).count()
    if asignaciones_estudiante >= 6:
        flash('El estudiante ya tiene el máximo de 6 asignaciones', 'error')
        return redirect(url_for('admin_dashboard'))

    # Verificar si el estudiante ya está asignado a esta clase
    asignacion_existente = AsignacionEstudiante.query.filter_by(estudiante_id=estudiante_id, asignacion_id=asignacion_id).first()
    if asignacion_existente:
        flash('El estudiante ya está asignado a esta clase', 'error')
        return redirect(url_for('admin_dashboard'))

    # Verificar si hay conflicto de horario para el estudiante
    asignacion = Asignacion.query.get(asignacion_id)
    if hay_conflicto_horario(estudiante_id, asignacion.fecha_inicio, asignacion.fecha_fin):
        flash('El estudiante tiene un conflicto de horario', 'error')
        return redirect(url_for('admin_dashboard'))

    nueva_asignacion_estudiante = AsignacionEstudiante(estudiante_id=estudiante_id, asignacion_id=asignacion_id)
    db.session.add(nueva_asignacion_estudiante)
    db.session.commit()
    flash('Estudiante asignado correctamente', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/editar_asignacion/<int:id>', methods=['GET', 'POST'])
@login_required
@admin_required
def editar_asignacion(id):
    asignacion = Asignacion.query.get_or_404(id)
    if request.method == 'POST':
        salon_id = request.form['salon_id']
        profesor_id = request.form['profesor_id']
        fecha_inicio = datetime.strptime(request.form['fecha_inicio'], '%Y-%m-%dT%H:%M')
        fecha_fin = datetime.strptime(request.form['fecha_fin'], '%Y-%m-%dT%H:%M')

        if fecha_inicio >= fecha_fin:
            flash('La fecha de inicio debe ser anterior a la fecha de fin', 'error')
            return redirect(url_for('editar_asignacion', id=id))

        # Verificar si el salón está disponible (excluyendo la asignación actual)
        asignaciones_existentes = Asignacion.query.filter(
            Asignacion.salon_id == salon_id,
            Asignacion.id != id,
            ((Asignacion.fecha_inicio <= fecha_inicio) & (Asignacion.fecha_fin > fecha_inicio)) |
            ((Asignacion.fecha_inicio < fecha_fin) & (Asignacion.fecha_fin >= fecha_fin)) |
            ((Asignacion.fecha_inicio >= fecha_inicio) & (Asignacion.fecha_fin <= fecha_fin))
        ).all()

        if asignaciones_existentes:
            flash('El salón no está disponible en ese horario', 'error')
            return redirect(url_for('editar_asignacion', id=id))

        # Verificar si hay conflicto de horario para el profesor (excluyendo la asignación actual)
        if hay_conflicto_horario(profesor_id, fecha_inicio, fecha_fin, exclude_id=id):
            flash('El profesor tiene un conflicto de horario', 'error')
            return redirect(url_for('editar_asignacion', id=id))

        asignacion.salon_id = salon_id
        asignacion.profesor_id = profesor_id
        asignacion.fecha_inicio = fecha_inicio
        asignacion.fecha_fin = fecha_fin

        db.session.commit()
        flash('Asignación actualizada correctamente', 'success')
        return redirect(url_for('admin_dashboard'))

    salones = Salon.query.all()
    profesores = Usuario.query.filter_by(rol='profesor').all()
    return render_template('editar_asignacion.html', asignacion=asignacion, salones=salones, profesores=profesores)

    print(f"Asignación: {asignacion.id}, Salón: {asignacion.salon_id}, Profesor: {asignacion.profesor_id}")
    print(f"Fecha inicio: {asignacion.fecha_inicio}, Fecha fin: {asignacion.fecha_fin}")

@app.route('/eliminar_asignacion/<int:id>', methods=['POST'])
@login_required
@admin_required
def eliminar_asignacion(id):
    asignacion = Asignacion.query.get_or_404(id)

    # Eliminar todas las asignaciones de estudiantes relacionadas
    AsignacionEstudiante.query.filter_by(asignacion_id=id).delete()

    db.session.delete(asignacion)
    db.session.commit()
    flash('Asignación eliminada correctamente', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/salones')
@login_required
@admin_required
def salones():
    salones = Salon.query.all()
    return render_template('salones.html', salones=salones)

@app.route('/salon/nuevo', methods=['GET', 'POST'])
@login_required
@admin_required
def nuevo_salon():
    if request.method == 'POST':
        nombre = request.form['nombre']
        capacidad = request.form['capacidad']
        nuevo_salon = Salon(nombre=nombre, capacidad=capacidad)
        db.session.add(nuevo_salon)
        db.session.commit()
        flash('Salón creado exitosamente', 'success')
        return redirect(url_for('salones'))
    return render_template('salon_form.html')

@app.route('/salon/editar/<int:id>', methods=['GET', 'POST'])
@login_required
@admin_required
def editar_salon(id):
    salon = Salon.query.get_or_404(id)
    if request.method == 'POST':
        salon.nombre = request.form['nombre']
        salon.capacidad = request.form['capacidad']
        db.session.commit()
        flash('Salón actualizado exitosamente', 'success')
        return redirect(url_for('salones'))
    return render_template('salon_form.html', salon=salon)

@app.route('/salon/eliminar/<int:id>', methods=['POST'])
@login_required
@admin_required
def eliminar_salon(id):
    salon = Salon.query.get_or_404(id)
    db.session.delete(salon)
    db.session.commit()
    flash('Salón eliminado exitosamente', 'success')
    return redirect(url_for('salones'))

@app.route('/calendario')
@login_required
def calendario():
    if current_user.rol == 'admin':
        asignaciones = Asignacion.query.all()
    elif current_user.rol == 'profesor':
        asignaciones = Asignacion.query.filter_by(profesor_id=current_user.id).all()
    else:
        asignaciones_estudiante = AsignacionEstudiante.query.filter_by(estudiante_id=current_user.id).all()
        asignaciones = [ae.asignacion for ae in asignaciones_estudiante]

    eventos = [{
        'id': a.id,
        'title': f"{a.salon.nombre} - {a.profesor.username}",
        'start': a.fecha_inicio.isoformat(),
        'end': a.fecha_fin.isoformat()
    } for a in asignaciones]
    return render_template('calendario.html', eventos=eventos)

# Modificar la función hay_conflicto_horario para excluir una asignación específica
def hay_conflicto_horario(usuario_id, fecha_inicio, fecha_fin, exclude_id=None):
    # Verificar conflictos para profesores
    conflictos_profesor_query = Asignacion.query.filter(
        Asignacion.profesor_id == usuario_id,
        ((Asignacion.fecha_inicio <= fecha_inicio) & (Asignacion.fecha_fin > fecha_inicio)) |
        ((Asignacion.fecha_inicio < fecha_fin) & (Asignacion.fecha_fin >= fecha_fin)) |
        ((Asignacion.fecha_inicio >= fecha_inicio) & (Asignacion.fecha_fin <= fecha_fin))
    )

    if exclude_id:
        conflictos_profesor_query = conflictos_profesor_query.filter(Asignacion.id != exclude_id)

    conflictos_profesor = conflictos_profesor_query.first()

    if conflictos_profesor:
        return True

@app.route('/mensajes')
@login_required
def mensajes():
    mensajes_recibidos = Mensaje.query.filter_by(destinatario_id=current_user.id).order_by(Mensaje.fecha_envio.desc()).all()
    mensajes_enviados = Mensaje.query.filter_by(remitente_id=current_user.id).order_by(Mensaje.fecha_envio.desc()).all()
    usuarios = Usuario.query.filter(Usuario.id != current_user.id).all()
    return render_template('mensajes.html',
                         mensajes_recibidos=mensajes_recibidos,
                         mensajes_enviados=mensajes_enviados,
                         usuarios=usuarios)

@app.route('/enviar_mensaje', methods=['POST'])
@login_required
def enviar_mensaje():
    destinatario_id = request.form['destinatario_id']
    asunto = request.form['asunto']
    contenido = request.form['contenido']

    nuevo_mensaje = Mensaje(
        remitente_id=current_user.id,
        destinatario_id=destinatario_id,
        asunto=asunto,
        contenido=contenido
    )

    db.session.add(nuevo_mensaje)
    db.session.commit()

    flash('Mensaje enviado exitosamente', 'success')
    return redirect(url_for('mensajes'))

@app.route('/marcar_leido/<int:mensaje_id>')
@login_required
def marcar_leido(mensaje_id):
    mensaje = Mensaje.query.get_or_404(mensaje_id)
    if mensaje.destinatario_id != current_user.id:
        abort(403)

    mensaje.leido = True
    db.session.commit()
    return redirect(url_for('mensajes'))

@app.route('/eliminar_mensaje/<int:mensaje_id>', methods=['POST'])
@login_required
def eliminar_mensaje(mensaje_id):
    mensaje = Mensaje.query.get_or_404(mensaje_id)
    if mensaje.destinatario_id != current_user.id and mensaje.remitente_id != current_user.id:
        abort(403)

    db.session.delete(mensaje)
    db.session.commit()
    flash('Mensaje eliminado exitosamente', 'success')
    return redirect(url_for('mensajes'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

