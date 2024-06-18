CREATE OR REPLACE FUNCTION fun_act_apr(
    _numero_documento_aprendiz INT,
    _id_tipo_documento INT,
    _direccion_residencia_aprendiz VARCHAR,
    _numero_telefono_fijo VARCHAR,
    _numero_telefono_movil VARCHAR,
    _email_aprendiz VARCHAR,
    _id_estado_aprendiz INT,
    _id_obligacion_mensual INT,
    _modalidad_productiva INT
)
RETURNS BOOLEAN AS $$
DECLARE 
    EXITO BOOLEAN := FALSE;
    modalidad_productiva_bool BOOLEAN;
BEGIN
    -- Convertir _modalidad_productiva a BOOLEAN
    IF _modalidad_productiva = 1 THEN 
        modalidad_productiva_bool := TRUE;
		_id_estado_aprendiz := 3;
    ELSE 
        modalidad_productiva_bool := FALSE;
    END IF;

    -- Realizar la actualización
    UPDATE aprendiz
    SET id_tipo_documento = _id_tipo_documento,
        direccion_residencia_aprendiz = _direccion_residencia_aprendiz,
        numero_telefono_fijo = _numero_telefono_fijo,
        numero_telefono_movil = _numero_telefono_movil,
        email_aprendiz = _email_aprendiz,
        id_estado_aprendiz = _id_estado_aprendiz,
        id_obligacion_mensual = _id_obligacion_mensual,
        modalidad_productiva = modalidad_productiva_bool
    WHERE numero_documento_aprendiz = _numero_documento_aprendiz;

    -- Verificar si se realizó la actualización
    IF FOUND THEN
        EXITO := TRUE;
    END IF;

    RETURN EXITO;

EXCEPTION
    WHEN OTHERS THEN
        -- Manejar cualquier error
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

SELECT fun_act_apr(
    109477878,
    2,
    'Calle 123, Ciudad',
    '1234567',
    '987654321',
    'ejemplo@correo.com',
    1,
    1
);
