CREATE OR REPLACE FUNCTION fun_ins_apr_sus(
    p_numero_documento_aprendiz INT,
    p_id_motivo_suspension INT,
    p_numero_resolucion INT,
    p_codigo_ficha INT
) 
RETURNS TABLE (
    insercion_exitosa BOOLEAN
) AS
$$
DECLARE
    fecha_actual DATE := CURRENT_DATE;
    fecha_fin DATE := fecha_actual + INTERVAL '3 months';
    aprendiz_existe BOOLEAN;
    aprendiz_suspendido BOOLEAN;
BEGIN
    -- Verificar si el aprendiz existe
    SELECT EXISTS (
        SELECT 1 FROM aprendiz WHERE numero_documento_aprendiz = p_numero_documento_aprendiz
    ) INTO aprendiz_existe;

    SELECT EXISTS (
        SELECT 1 FROM aprendiz_suspendido WHERE numero_documento_aprendiz = p_numero_documento_aprendiz
    ) INTO aprendiz_suspendido;

    IF aprendiz_existe AND NOT aprendiz_suspendido AND  THEN
	IF  p_id_motivo_suspension = 1 OR p_id_motivo_suspension = 2 THEN
        -- Insertar el registro de suspensión del aprendiz
        INSERT INTO aprendiz_suspendido (
            numero_documento_aprendiz,
            id_motivo_suspension,
            fecha_inicio_suspension,
            fecha_fin_suspension
        ) VALUES (
            p_numero_documento_aprendiz,
            p_id_motivo_suspension,
            fecha_actual,
            fecha_fin
        );
        insercion_exitosa := true;
		END IF;
        IF p_id_motivo_suspension != 1 AND p_id_motivo_suspension != 2 THEN
            INSERT INTO aprendiz_cancelado (
                numero_documento_aprendiz,
                id_motivo_suspension,
                fecha_cancelacion,
                numero_resolucion
            ) VALUES (
                p_numero_documento_aprendiz,
                p_id_motivo_suspension,
                fecha_actual,
                p_numero_resolucion
            );
        insercion_exitosa := true;
        END IF; 
    ELSE
        insercion_exitosa := false;
    END IF;

    RETURN QUERY SELECT insercion_exitosa;
END;
$$
LANGUAGE plpgsql;


SELECT * FROM fun_ins_apr_sus(1094778783, 13, 1, 2619701);
SELECT * FROM aprendiz_suspendido;
SELECT * FROM aprendiz_cancelado;

