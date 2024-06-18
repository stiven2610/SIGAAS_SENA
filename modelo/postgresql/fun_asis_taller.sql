CREATE OR REPLACE PROCEDURE fun_reg_asis(
    numero_documento_aprendiz_param INT, 
    codigo_taller_param INT,
    OUT documento_existe BOOLEAN,
    OUT taller_existe BOOLEAN,
    OUT asistencia_existe BOOLEAN
) 
LANGUAGE PLPGSQL
AS $$
BEGIN 
    documento_existe := EXISTS (
        SELECT 1 FROM aprendiz WHERE numero_documento_aprendiz = numero_documento_aprendiz_param
    );

    taller_existe := EXISTS (
        SELECT 1 FROM taller_mensual WHERE codigo_taller = codigo_taller_param
    );

    asistencia_existe := EXISTS (
        SELECT 1 FROM asistencia_taller 
        WHERE numero_documento_aprendiz = numero_documento_aprendiz_param 
        AND codigo_taller = codigo_taller_param
    );

    IF NOT asistencia_existe AND documento_existe AND taller_existe THEN 
        INSERT INTO asistencia_taller (codigo_taller, numero_documento_aprendiz) 
        VALUES (codigo_taller_param, numero_documento_aprendiz_param);
    END IF;
END
$$;
