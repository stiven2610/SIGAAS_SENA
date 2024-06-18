CREATE OR REPLACE PROCEDURE public.fun_act_est()
LANGUAGE plpgsql
AS $BODY$
DECLARE
    fecha_actual DATE;
    numero_documento INT;
    codigo INT;
    fecha_fin DATE;
	fecha_fin_ficha DATE; 
    dias INT;
	dias_prod  INT ; 
    nuevo_estado INT;
    email_aprendiz VARCHAR; 
	nombre VARCHAR;
    c_aprendices CURSOR FOR 
        SELECT a.numero_documento_aprendiz, a.codigo_ficha, b.fecha_fin_lectiva, a.id_estado_aprendiz,a.email_aprendiz,a.nombre_completo_aprendiz,b.fecha_fin_ficha
        FROM aprendiz AS a
        JOIN ficha AS b ON a.codigo_ficha = b.codigo_ficha;
BEGIN
    fecha_actual := CURRENT_DATE;
    
    OPEN c_aprendices;
    
    LOOP
        FETCH c_aprendices INTO numero_documento, codigo, fecha_fin, nuevo_estado,email_aprendiz,nombre,fecha_fin_ficha;
        EXIT WHEN NOT FOUND;
        
        BEGIN 
            dias := fecha_fin - fecha_actual;
			dias_prod := fecha_fin_ficha - fecha_actual;
            IF dias <= 15 AND dias > 0 THEN
                IF NOT EXISTS (SELECT 1 FROM aprendiz WHERE numero_documento_aprendiz = numero_documento AND id_estado_aprendiz = 1) THEN
                    UPDATE aprendiz SET id_estado_aprendiz = 1 WHERE numero_documento_aprendiz = numero_documento;
                    nuevo_estado := 1;
                    raise notice 'estado cambiado a " a punto de cumplir etapa lectiva 1 " para la ficha %',codigo;
					PERFORM pg_notify('estado', json_build_object('numero_documento', numero_documento, 'nuevo_estado', nuevo_estado,'email' , email_aprendiz,'nombre',nombre)::text);
                END IF;
            ELSIF fecha_fin = fecha_actual AND dias <= 30 THEN
                IF NOT EXISTS (SELECT 1 FROM aprendiz WHERE numero_documento_aprendiz = numero_documento AND id_estado_aprendiz = 2) THEN
                    UPDATE aprendiz SET id_estado_aprendiz = 2 WHERE numero_documento_aprendiz = numero_documento;
                    nuevo_estado := 2;
                    raise notice 'estado cambiado a "mes de gracia 2 " para la ficha %',codigo;
					PERFORM pg_notify('estado', json_build_object('numero_documento', numero_documento, 'nuevo_estado', nuevo_estado,'email' , email_aprendiz,'nombre',nombre)::text);
                END IF;
            ELSIF dias < 0 THEN
                IF NOT EXISTS (SELECT 1 FROM aprendiz WHERE numero_documento_aprendiz = numero_documento AND id_estado_aprendiz = 4) THEN
                    UPDATE aprendiz SET id_estado_aprendiz = 4 WHERE numero_documento_aprendiz = numero_documento AND modalidad_prodcutiva =FALSE;
                    nuevo_estado := 4;
                    raise notice 'estado cambiado a " aplazado 4"  para la ficha %',codigo;
					PERFORM pg_notify('estado', json_build_object('numero_documento', numero_documento, 'nuevo_estado', nuevo_estado,'email' , email_aprendiz,'nombre',nombre)::text);
                END IF;
		    ELSIF dias_prod <= 15  AND dias_prod > 0 THEN  
			 IF NOT EXISTS (SELECT 1 FROM aprendiz WHERE numero_documento_aprendiz = numero_documento AND id_estado_aprendiz = 7) THEN
                    UPDATE aprendiz SET id_estado_aprendiz = 7 WHERE numero_documento_aprendiz = numero_documento;
                    nuevo_estado := 7;
                    raise notice 'estado cambiado a " a punto de cumplir productiva"  para la ficha %',codigo;
					PERFORM pg_notify('estado', json_build_object('numero_documento', numero_documento, 'nuevo_estado', nuevo_estado,'email' , email_aprendiz,'nombre',nombre)::text);
                END IF;
            ELSE
                IF nuevo_estado != 5 THEN
                    IF NOT EXISTS (SELECT 1 FROM aprendiz WHERE numero_documento_aprendiz = numero_documento AND id_estado_aprendiz = 5) THEN
                        UPDATE aprendiz SET id_estado_aprendiz = 5 WHERE numero_documento_aprendiz = numero_documento;
                        nuevo_estado := 5;
                        raise notice 'estado cambiado a "etapa lectiva 5 " para la ficha %',codigo;
                        PERFORM pg_notify('estado', json_build_object('numero_documento', numero_documento, 'nuevo_estado', nuevo_estado,'email' , email_aprendiz,'nombre',nombre)::text);
                    END IF;
                END IF;
            END IF;
        END;
    END LOOP;
    
    CLOSE c_aprendices;
END;
$BODY$;

