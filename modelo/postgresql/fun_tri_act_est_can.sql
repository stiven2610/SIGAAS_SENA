drop FUNCTION fun_tri_act_est_can()
RETURNS TRIGGER AS
$$
BEGIN
    -- Verificar si el motivo de suspensión no es válido
    IF NEW.id_motivo_suspension != 1 AND NEW.id_motivo_suspension != 2 THEN
	
        -- Insertar en la tabla aprendiz_cancelado
        INSERT INTO aprendiz_cancelado (
            numero_documento_aprendiz,
            codigo_ficha,
            id_motivo_suspension,
            fecha_cancelacion,
            numero_resolucion
        ) VALUES (
            NEW.numero_documento_aprendiz,
            NEW.codigo_ficha,
            NEW.id_motivo_suspension,
            CURRENT_DATE,
            NEW.numero_resolucion
        );
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_insertar_aprendiz_cancelado_si_cancelado ON aprendiz_cancelado;

drop  TRIGGER trigger_insertar_aprendiz_cancelado_si_suspendido
AFTER INSERT ON aprendiz_suspendido OR aprendiz_cancelado
FOR EACH ROW
EXECUTE FUNCTION fun_tri_ins_can();
