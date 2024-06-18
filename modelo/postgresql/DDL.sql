DROP TABLE IF EXISTS  tipo_documento;
DROP TABLE IF EXISTS  usuario_admin;
DROP TABLE IF EXISTS  beneficio; 
DROP TABLE IF EXISTS  modalidad;
DROP TABLE IF EXISTS  instructor_lider;
DROP TABLE IF EXISTS  ficha;
DROP TABLE IF EXISTS  aprendiz;
DROP TABLE IF EXISTS  aprendiz_suspendido;
DROP TABLE IF EXISTS  aprendiz_cancelado;

DROP TABLE IF EXISTS  formato_seguimiento;
DROP TABLE IF EXISTS  taller_mensual;
DROP TABLE IF EXISTS  asistencia_taller;
DROP TABLE IF EXISTS  novedad;
DROP TABLE IF EXISTS  alerta;
DROP TABLE IF EXISTS  parametros;
CREATE TABLE  tipo_documento(
    id_tipo_documento      INT     NOT NULL,
    nombre_documento       VARCHAR(50)  NOT NULL,

    PRIMARY KEY (id_tipo_documento)
);

CREATE TABLE usuario (
    numero_documento_usuario     INT        NOT NULL,
    nombre_usuario            VARCHAR NOT NULL,
    apellidos_usuario        VARCHAR   NOT NULL,
	password varchar  NOT NULL,
    user_insert              VARCHAR,           
    fecha_insert             TIMESTAMP WITHOUT TIME ZONE NOT NULL,    
    user_update              VARCHAR,                    
    fecha_update             TIMESTAMP WITHOUT TIME ZONE,           

    PRIMARY  KEY(numero_documento_usuario)
);
CREATE TABLE modalidad (
    id_modalidad                   INT       NOT NULL,
    nombre_modalidad               VARCHAR   NOT NULL,
    user_insert                    VARCHAR          NOT NULL,               
    fecha_insert                   TIMESTAMP WITHOUT TIME ZONE NOT NULL,    
    user_update                    VARCHAR,                                  
    fecha_update                   TIMESTAMP WITHOUT TIME ZONE,   

    PRIMARY KEY (id_modalidad)   
);
CREATE TABLE modalidad_productiva(
codigo_modalidad    INT NOT NULL,
	nombre_modalidad VARCHAR NOT NULL,
	
	PRIMARY KEY ( codigo_modalidad)

)
drop table modalidad_productiva

CREATE TABLE ficha
(
    codigo_ficha                       INT             NOT NULL,    
    id_modalidad                       INT NOT NULL     ,                      
    numero_documento_instructor_lider  INT NOT NULL,         
    fecha_inicio_ficha                 DATE            NOT NULL,                      
    fecha_inicio_etapa_productiva      DATE          ,               
    fecha_fin_ficha                    DATE            NOT NULL,                       
    nivel_formacion                    VARCHAR        ,                       
    nombre_programa                    VARCHAR(100)    NOT NULL,                       
    user_insert                        VARCHAR         NOT NULL,                      
    fecha_insert                       TIMESTAMP WITHOUT TIME ZONE NOT NULL,         
    user_update                        VARCHAR,                                        
    fecha_update                       TIMESTAMP WITHOUT TIME ZONE,                   

    PRIMARY KEY (codigo_ficha),
    FOREIGN KEY (numero_documento_instructor_lider) REFERENCES instructor_lider (numero_documento_instructor_lider),
    FOREIGN KEY (id_modalidad) REFERENCES modalidad (id_modalidad)
);
CREATE TABLE beneficio
(
    codigo_beneficio                      INT              NOT NULL,
    nombre_beneficio                      VARCHAR   NOT  NULL,
    fecha_inicio_beneficio                DATE             NOT NULL,                
    fecha_fin_beneficio                   DATE             NOT NULL,       
    cupos_beneficio                       INT              NOT NULL,                
    user_insert                           VARCHAR          NOT NULL,               
    fecha_insert                          TIMESTAMP WITHOUT TIME ZONE NOT NULL,    
    user_update                           VARCHAR,                                  
    fecha_update                          TIMESTAMP WITHOUT TIME ZONE,              
    PRIMARY KEY(codigo_beneficio)
);

CREATE TABLE estado_aprendiz(
    id_estado_aprendiz  INT NOT NULL,
    nombre_estado_aprendiz   VARCHAR NOT NULL,

    PRIMARY KEY ( id_estado_aprendiz)
);
CREATE TABLE  obligacion_mensual(
    id_obligacion_mensual   INT NOT NULL,
    nombre_obligacion_mensual  VARCHAR NOT NULL,

    PRIMARY KEY (id_obligacion_mensual)
);
CREATE TABLE aprendiz(
    numero_documento_aprendiz        INT        NOT NULL,
    nombre_completo_aprendiz         VARCHAR    NOT  NULL,
	codigo_beneficio                 INT NOT NULL,
    codigo_ficha                     INT  NOT   NULL,
    id_tipo_documento                INT NOT NULL,
    id_estado_aprendiz               INT NOT NULL,
    id_obligacion_mensual            INT NOT NULL,
    numero_resolucion_adjudicacion   INT NOT NULL ,
    fecha_adjudicacion               DATE       NOT NULL,
    numero_telefono_fijo             VARCHAR(50)      NOT NULL,              
    numero_telefono_movil            VARCHAR(50)      NOT NULL,                
    direccion_residencia_aprendiz    VARCHAR(100)     NOT NULL,              
    email_aprendiz                   VARCHAR(100)     NOT NULL,           
    user_insert                      VARCHAR          NOT NULL,                
    fecha_insert                     TIMESTAMP WITHOUT TIME ZONE NOT NULL,     
    user_update                      VARCHAR,                                  
    fecha_update                     TIMESTAMP WITHOUT TIME ZONE,         

    PRIMARY  KEY  (numero_documento_aprendiz),
    FOREIGN KEY (codigo_ficha)  REFERENCES  ficha   (codigo_ficha),
	FOREIGN KEY (codigo_beneficio)  REFERENCES beneficio (codigo_beneficio),
	foreign Key  (id_tipo_documento)  REFERENCES tipo_documento (id_tipo_documento),
    FOREIGN  KEY (id_estado_aprendiz)  REFERENCES  estado_aprendiz ( id_estado_aprendiz),
    FOREIGN KEY (id_obligacion_mensual)  REFERENCES obligacion_mensual (id_obligacion_mensual),
    FOREIGN KEY (codigo_beneficio)  REFERENCES beneficio (codigo_beneficio)
  );
ALTER TABLE aprendiz
ADD COLUMN codigo_beneficio INT;

ALTER TABLE beneficio
ADD CONSTRAINT codigo_beneficio
FOREIGN KEY (codigo_beneficio)
REFERENCES beneficio(codigo_beneficio);

CREATE TABLE motivo_suspension (
    id_motivo_suspension   INT NOT NULL,
    nombre_motivo_suspension    VARCHAR NOT NULL,

    PRIMARY KEY ( id_motivo_suspension )
);
CREATE TABLE  aprendiz_suspendido (
    numero_documento_aprendiz        INT NOT  NULL,
    id_motivo_suspension             INT  NOT NULL,
    fecha_inicio_suspension          DATE NOT  NULL,
    fecha_fin_suspension             DATE  NOT NULL,
    user_insert                      VARCHAR         NOT NULL,                      
    fecha_insert                     TIMESTAMP WITHOUT TIME ZONE NOT NULL,         
    user_update                      VARCHAR,                                        
    fecha_update                     TIMESTAMP WITHOUT TIME ZONE, 
    PRIMARY KEY (numero_documento_aprendiz),
	
    FOREIGN key (id_motivo_suspension) REFERENCES motivo_suspension (id_motivo_suspension)
 );
CREATE TABLE tipo_novedad (

    id_tipo_novedad  INT NOT NULL ,
    nombre_tipo_novedad  VARCHAR NOT NULL,

    PRIMARY KEY ( id_tipo_novedad)
);
CREATE TABLE novedad (
    id_novedad INT DEFAULT 1 + NEXTVAL('codigo_seq') NOT NULL,
    id_tipo_novedad  INT NOT NULL ,
    numero_documento_aprendiz  INT NOT NULL ,
    numero_documento_usuario  INT  ,
	usuario varchar NOT NULL,
    fecha_novedad    DATE NOT NULL,
PRIMARY KEY (id_novedad),
FOREIGN KEY (id_tipo_novedad ) REFERENCES tipo_novedad (id_tipo_novedad),
FOREIGN KEY (numero_documento_aprendiz) REFERENCES aprendiz  (numero_documento_aprendiz),
FOREIGN KEY (numero_documento_usuario)  REFERENCES usuario (numero_documento_usuario)
);

  CREATE TABLE formato_registrado(
    id_formato_registrado                      INT  NOT NULL,
	id_formato_seguimiento            INT NOT NULL,
    numero_documento_aprendiz       INT NOT NULL,
	fecha_formato     DATE NOT NULL,
	numero_documento_instructor_lider  INT NOT NULL,  
	codigo_ficha     INT NOT NULL,
	area_actividad    VARCHAR NOT NULL,
    PRIMARY  KEY (id_formato_registrado),
    FOREIGN key (numero_documento_aprendiz) REFERENCES aprendiz (numero_documento_aprendiz),
	FOREIGN key (numero_documento_instructor_lider) REFERENCES instructor_lider (numero_documento_instructor_lider),
	FOREIGN key (codigo_ficha) REFERENCES ficha (codigo_ficha),
	  	FOREIGN key (id_formato_seguimiento) REFERENCES formato_seguimiento (id_formato_seguimiento)
 );

 CREATE TABLE formato_seguimiento (
 
 id_formato_seguimiento    INT NOT NULL,
 id_obligacion_mensual      INT  NOT NULL,
 item       VARCHAR NOT NULL,
	 cumple BOOLEAN  NOT NULL,
	 observacion    VARCHAR ,
	 
	 PRIMARY KEY (id_formato_seguimiento) ,
	  FOREIGN KEY (id_obligacion_mensual) REFERENCES obligacion_mensual (id_obligacion_mensual)
 
 );
 CREATE TABLE  taller_mensual (
    codigo_taller INT DEFAULT 1000 + NEXTVAL('codigo_seq') NOT NULL,
    nombre_taller                VARCHAR(50) NOT NULL,
    fecha_taller                DATE NOT NULL,
    user_insert                 VARCHAR       NOT NULL,                      
    fecha_insert                TIMESTAMP WITHOUT TIME ZONE NOT NULL,         
    user_update                 VARCHAR,                                        
    fecha_update                TIMESTAMP WITHOUT TIME ZONE, 

    PRIMARY KEY   (codigo_taller)
 );
 CREATE TABLE asistencia_taller (
    codigo_taller               INT      NOT NULL,
    numero_documento_aprendiz   INT      NOT NULL,

    PRIMARY KEY  (codigo_taller,numero_documento_aprendiz)
 );



 CREATE TABLE alerta(
    id_alerta             INT NOT NULL,
    numero_documento_aprendiz  INT NOT NULL,
    id_tipo_novedad       INT NOT NULL,
    user_insert           VARCHAR       NOT NULL,                      
    fecha_insert          TIMESTAMP WITHOUT TIME ZONE NOT NULL,         
    user_update           VARCHAR,                                        
    fecha_update          TIMESTAMP WITHOUT TIME ZONE, 



    PRIMARY KEY (id_alerta),
    FOREIGN KEY (id_tipo_novedad) REFERENCES tipo_novedad (id_tipo_novedad),
    FOREIGN KEY (numero_documento_aprendiz)  REFERENCES  aprendiz(numero_documento_aprendiz)
 );
CREATE TABLE aprendiz_cancelado(
    numero_documento_aprendiz  INT NOT NULL,
    codigo_ficha   INT NOT NULL,
    id_motivo_suspension INT  NOT NULL,
    fecha_cancelacion   DATE NOT NULL,
    numero_resolucion    INT NOT   NULL,
    user_insert           VARCHAR       NOT NULL,                      
    fecha_insert          TIMESTAMP WITHOUT TIME ZONE NOT NULL,         
    user_update           VARCHAR,                                        
    fecha_update          TIMESTAMP WITHOUT TIME ZONE, 
    PRIMARY KEY (numero_documento_aprendiz),
	FOREIGN KEY (id_motivo_suspension) REFERENCES motivo_suspension  (id_motivo_suspension),
    FOREIGN KEY (codigo_ficha) REFERENCES ficha  (codigo_ficha),
    FOREIGN  KEY (numero_documento_aprendiz) REFERENCES  aprendiz (numero_documento_aprendiz)

);
drop table aprendiz_cancelado
 CREATE TABLE parametros ( 
    id_parametros             INT      NOT NULL,
    correo_electronico_contacto   VARCHAR  NOT NULL,
    cuerpo_correo             VARCHAR  NOT NULL,
    valor_beneficio            INT      NOT NULL,
    user_insert               VARCHAR          NOT NULL,               
    fecha_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,    
    user_upda                 VARCHAR,                                  
    fecha_update              TIMESTAMP WITHOUT TIME ZONE, 

    PRIMARY KEY(id_parametros)
 );