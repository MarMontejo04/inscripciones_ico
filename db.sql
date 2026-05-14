SET NAMES utf8mb4;

DROP DATABASE IF EXISTS inscripciones_ico;
CREATE DATABASE inscripciones_ico;

USE inscripciones_ico;

CREATE TABLE area (
    id_area INT NOT NULL AUTO_INCREMENT,
    nombre_area VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_area)
);

CREATE TABLE alumno(
    id_alumno INT NOT NULL AUTO_INCREMENT,
    num_cuenta INT(9) NOT NULL,
    ap_paterno VARCHAR(100) NOT NULL,
    ap_materno VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    fecha_ingreso DATE,
    semestre INT,
    contrasena VARCHAR(255) NOT NULL DEFAULT '123456',
    pregunta_secreta VARCHAR(255),
    respuesta_secreta VARCHAR(255),


    PRIMARY KEY (id_alumno)
);

CREATE TABLE admin(
    id_admin INT NOT NULL AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),

    PRIMARY KEY(id_admin)
)

CREATE TABLE asignatura(
    clave INT NOT NULL AUTO_INCREMENT,
    nombre_asignatura VARCHAR(100) NOT NULL,
    creditos INT,
    semestre INT,
    optativa BOOL,
    laboratorio BOOL,
    id_area INT NOT NULL,

    PRIMARY KEY (clave),

    FOREIGN KEY (id_area)
        REFERENCES area(id_area)
);

CREATE TABLE grupo(
    num_grupo INT NOT NULL,

    PRIMARY KEY (num_grupo)
);

CREATE TABLE profesor(
    id_profesor INT NOT NULL AUTO_INCREMENT,
    ap_paterno VARCHAR(100) NOT NULL,
    ap_materno VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,

    PRIMARY KEY (id_profesor)
);

CREATE TABLE clase(
    id_clase INT NOT NULL AUTO_INCREMENT,
    salon VARCHAR(20),
    dia_semana VARCHAR(50),
    hora_inicio TIME,
    hora_final TIME,

    clave_materia INT NOT NULL,
    grupo INT NOT NULL,
    id_profesor INT NOT NULL,

    PRIMARY KEY (id_clase),

    FOREIGN KEY (clave_materia)
        REFERENCES asignatura(clave),

    FOREIGN KEY (grupo)
        REFERENCES grupo(num_grupo),

    FOREIGN KEY (id_profesor)
        REFERENCES profesor(id_profesor)
);

CREATE TABLE inscripcion(
    id_inscripcion INT NOT NULL AUTO_INCREMENT,
    fecha_inscripcion DATE,
    hora_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    semestre_curso VARCHAR(10) NOT NULL,
    calificacion DECIMAL(4,2) DEFAULT NULL,
    aprobada BOOL NOT NULL DEFAULT 0,
    id_clase INT NOT NULL,
    id_alumno INT NOT NULL,

    PRIMARY KEY (id_inscripcion),

    FOREIGN KEY (id_clase)
        REFERENCES clase(id_clase),

    FOREIGN KEY (id_alumno)
        REFERENCES alumno(id_alumno)
);
