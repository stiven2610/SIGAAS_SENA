CREATE OR REPLACE FUNCTION fun_tri_nov() RETURNS TRIGGER AS 
$$
DECLARE
    fecha_actual DATE; 
    numero_documento INT;
    estado_actual INT;
BEGIN 
    fecha_actual = CURRENT_DATE;
    
    IF TG_OP = 'UPDATE' THEN 
        estado_actual = new.id_estado_aprendiz;
        numero_documento = new.numero_documento_aprendiz;
        
        IF old.id_estado_aprendiz != estado_actual THEN -- Verificar si el estado ha cambiado
            IF estado_actual = 1 THEN 
                INSERT INTO novedad (id_tipo_novedad, numero_documento_aprendiz, usuario, fecha_novedad) 
                VALUES (1, numero_documento, 'Sistema', fecha_actual);
                RAISE NOTICE 'La inserción fue realizada correctamente para nuevo estado 1.';
            ELSIF estado_actual = 2 THEN 
                INSERT INTO novedad (id_tipo_novedad, numero_documento_aprendiz, usuario, fecha_novedad) 
                VALUES (2, numero_documento, 'Sistema', fecha_actual);
                RAISE NOTICE 'La inserción fue realizada correctamente para nuevo estado 2.';
            ELSIF estado_actual = 4 THEN 
                INSERT INTO novedad (id_tipo_novedad, numero_documento_aprendiz, usuario, fecha_novedad) 
                VALUES (4, numero_documento, 'Sistema', fecha_actual);
                RAISE NOTICE 'La inserción fue realizada correctamente para nuevo estado 4.';
            ELSIF estado_actual = 3 THEN 
                INSERT INTO novedad (id_tipo_novedad, numero_documento_aprendiz, usuario, fecha_novedad) 
                VALUES (3, numero_documento, 'Sistema', fecha_actual);
                RAISE NOTICE 'La inserción fue realizada correctamente para nuevo estado 3.';
            ELSE 
                RAISE NOTICE 'No se realizó ninguna inserción de novedad.';
            END IF;
        ELSE
            RAISE NOTICE 'No se realizó ninguna inserción de novedad porque el estado no ha cambiado.';
        END IF;
    END IF;
    
    RETURN new;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tri_act_tab_est 
AFTER UPDATE OF id_estado_aprendiz ON aprendiz 
FOR EACH ROW
EXECUTE PROCEDURE fun_tri_nov(); 

select * from motivo_suspension; 
select * from estado_aprendiz; 
select * from novedad;
select * from aprendiz;
delete from novedad;
