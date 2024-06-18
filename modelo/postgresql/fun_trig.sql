CREATE OR REPLACE FUNCTION fun_act_tabla() RETURNS TRIGGER AS 
$$
    BEGIN 
        IF TG_OP = 'INSERT' THEN 
            NEW.user_insert = CURRENT_USER;
            NEW.fecha_insert = NOW(); 
        END IF;
        IF TG_OP = 'UPDATE' THEN
            NEW.user_update = CURRENT_USER;
            NEW.fecha_update = NOW();
        END IF;
        RETURN NEW;
    END;
$$  
LANGUAGE PLPGSQL;
CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON usuario 
FOR EACH ROW EXECUTE PROCEDURE  fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON beneficio
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON modalidad
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON instructor_lider
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON ficha
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON aprendiz
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON aprendiz_suspendido
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON formato_seguimiento
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();


CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON taller_mensual
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON asistencia_taller
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

drop TRIGGER tri_act_tabla ON novedad
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON alerta
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON parametros
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON aprendiz_cancelado
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();