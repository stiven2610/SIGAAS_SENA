CREATE OR REPLACE FUNCTION fun_asi_ult_tal() 
RETURNS BOOLEAN 
AS $$
DECLARE
    numero_documento INT;
    codigo_taller INT;
    fecha DATE;
    novedades_generadas BOOLEAN := FALSE;

    c_aprendices CURSOR FOR
        SELECT a.numero_documento_aprendiz, a.codigo_taller, b.fecha_taller
        FROM asistencia_taller AS a
        JOIN taller_mensual AS b ON a.codigo_taller = b.codigo_taller
        WHERE b.fecha_taller = (SELECT MAX(fecha_taller) FROM taller_mensual);

BEGIN
    -- Abre el cursor
    OPEN c_aprendices;

    -- Itera sobre el cursor
    LOOP
        FETCH c_aprendices INTO numero_documento, codigo_taller, fecha;
        EXIT WHEN NOT FOUND;
		UPDATE aprendiz SET asistencia_ultimo_taller = true WHERE numero_documento_aprendiz  = numero_documento;
        -- Realiza las operaciones necesarias con los datos obtenidos
        RAISE NOTICE 'Numero Documento: %, Codigo Taller: %, Fecha Taller: %', numero_documento, codigo_taller, fecha;
        -- Aquí puedes establecer `novedades_generadas` a TRUE si se cumple alguna condición
        novedades_generadas := TRUE;
    END LOOP;

    -- Cierra el cursor
    CLOSE c_aprendices;

    -- Retorna el valor booleano
    RETURN novedades_generadas;
END;
$$ LANGUAGE plpgsql;
select fun_asi_ult_tal() 