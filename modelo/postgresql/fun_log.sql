

CREATE OR REPLACE FUNCTION fun_log(num_doc INT, con_usu VARCHAR)
RETURNS TABLE (
    documento_existe BOOLEAN,
    contrasenha_existe BOOLEAN
) AS $$
DECLARE 
encriptada VARCHAR ; 
BEGIN

SELECT  md5(con_usu ) INTO encriptada;

    documento_existe := EXISTS (
        SELECT 1 FROM usuario WHERE num_doc = numero_documento_usuario
    );

    contrasenha_existe := EXISTS (
        SELECT 1 FROM usuario WHERE password = encriptada
    );

    RETURN NEXT;
END;
$$ LANGUAGE PLPGSQL;
select fun_log(1123321,'33232');