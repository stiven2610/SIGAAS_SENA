CREATE OR REPLACE FUNCTION fun_ins_apr(
    p_numero_documento_aprendiz INTEGER,
    p_codigo_ficha INTEGER,
    p_id_tipo_documento INTEGER,
    p_id_obligacion_mensual INTEGER,
    p_numero_resolucion_adjudicacion INTEGER,
    p_codigo_beneficio INTEGER,
    p_nombre_completo_aprendiz VARCHAR,
    p_fecha_adjudicacion DATE,
    p_numero_telefono_fijo VARCHAR,
    p_numero_telefono_movil VARCHAR,
    p_direccion_residencia_aprendiz VARCHAR,
    p_email_aprendiz VARCHAR,
    p_id_modalidad_formacion INTEGER,
    p_fecha_inicio_ficha DATE,
	p_fecha_fin_lectiva DATE ,
    p_fecha_inicio_productiva DATE,
    p_fecha_fin_ficha DATE,
    p_nivel_formacion VARCHAR,
    p_nombre_programa VARCHAR,
    p_numero_documento_instructor_lider INTEGER,
    p_nombre_instructor_lider VARCHAR,
    p_email_instructor VARCHAR
) RETURNS TABLE (
    instructor_existe BOOLEAN,
    aprendiz_existe BOOLEAN,
    insercion_realizada BOOLEAN
) 
AS $$
DECLARE
    insercion_realizada BOOLEAN := FALSE;
	id_estado INT := 1;
BEGIN
    -- Verificar si el instructor existe
    SELECT EXISTS (
        SELECT 1 FROM instructor_lider WHERE numero_documento_instructor_lider = p_numero_documento_instructor_lider
    ) INTO instructor_existe;

    -- Verificar si el aprendiz existe
    SELECT EXISTS (
        SELECT 1 FROM aprendiz WHERE numero_documento_aprendiz = p_numero_documento_aprendiz
    ) INTO aprendiz_existe;
  
    -- Si el instructor no existe, insertarlo
    IF NOT instructor_existe THEN 
        BEGIN
            INSERT INTO instructor_lider (
                numero_documento_instructor_lider,
                nombre_instructor_lider,
                email_instructor_lider
            ) VALUES (
                p_numero_documento_instructor_lider,
                p_nombre_instructor_lider,
                p_email_instructor
            );

            -- Insertar datos en la tabla de fichas
            INSERT INTO ficha(
                codigo_ficha,
                id_modalidad,
                numero_documento_instructor_lider,
                fecha_inicio_ficha,
                fecha_inicio_etapa_productiva,
				fecha_fin_lectiva ,
                fecha_fin_ficha,
                nivel_formacion,
                nombre_programa
            ) VALUES (
                p_codigo_ficha,
                p_id_modalidad_formacion,
                p_numero_documento_instructor_lider,
                p_fecha_inicio_ficha,
                p_fecha_inicio_productiva,
				p_fecha_fin_lectiva ,
                p_fecha_fin_ficha,
                p_nivel_formacion,
                p_nombre_programa
            );
        EXCEPTION
            WHEN unique_violation THEN
                -- El instructor ya existe, no se hace nada
                NULL;
        END;
    END IF;
    
    -- Si el aprendiz no existe, insertarlo
    IF NOT aprendiz_existe THEN 
        BEGIN
            INSERT INTO aprendiz (
                numero_documento_aprendiz,
                nombre_completo_aprendiz,
                codigo_ficha,
                id_tipo_documento,
                id_estado_aprendiz,
                id_obligacion_mensual,
                numero_resolucion_adjudicacion,
                codigo_beneficio,
                fecha_adjudicacion,
                numero_telefono_fijo,
                numero_telefono_movil,
                direccion_residencia_aprendiz,
                email_aprendiz
            ) VALUES (
                p_numero_documento_aprendiz,
                p_nombre_completo_aprendiz,
                p_codigo_ficha,
                p_id_tipo_documento,
                id_estado,
                p_id_obligacion_mensual,
                p_numero_resolucion_adjudicacion,
                p_codigo_beneficio,
                p_fecha_adjudicacion,
                p_numero_telefono_fijo,
                p_numero_telefono_movil,
                p_direccion_residencia_aprendiz,
                p_email_aprendiz
            );
            insercion_realizada := TRUE;
        EXCEPTION
            WHEN unique_violation THEN
                -- El aprendiz ya existe, no se hace nada
                NULL;
            WHEN others THEN
                -- Manejar otros errores de inserción
                insercion_realizada := FALSE;
        END;
    END IF;
call fun_act_est();
    -- Retornar los resultados
    RETURN QUERY SELECT instructor_existe, aprendiz_existe, insercion_realizada;
END;
$$ LANGUAGE plpgsql;
	select fun_ins_apr( '101112',
					   '2611164',
					   '1',
					   '2',
					   '111111',
					   '123456796',
					   'mary canvanzo',
					   '2024-04-04'
					   ,'2727272',
					   '3202413711',
					   'kjvNJDnvjdsnjvnsvni',
					   'maryu@gmail.com',
					   '1','2023-04-04',
					   '2024-04-04',
					     '2024-04-04'
					   ,'2024-06-06',
					   'Técnico',
					   'ENFERMERIA',
					   '9111112',
					   'chapulina once',
					   'chapulina@gmail.com')