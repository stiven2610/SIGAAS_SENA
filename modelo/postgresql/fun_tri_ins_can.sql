CREATE OR REPLACE FUNCTION fun_tri_act_can()
RETURNS TRIGGER AS
$$
BEGIN
    IF NEW.id_motivo_suspension != 1 AND NEW.id_motivo_suspension != 2 THEN
    UPDATE aprendiz SET  id_estado_aprendiz = 6 WHERE numero_documento_aprendiz = NEW.numero_documento_aprendiz;
		END IF ;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_insertar_aprendiz_cancelado_si_cancelado
AFTER INSERT ON aprendiz_cancelado
FOR EACH ROW
EXECUTE FUNCTION fun_tri_act_can();
