CREATE OR REPLACE PROCEDURE fun_cre_nov()    
LANGUAGE PLPGSQL
AS 
$$
DECLARE 
    documento INT;
	estado_aprendiz INT;
BEGIN 
	FOR documento, estado_aprendiz IN
		SELECT numero_documento_aprendiz, id_estado_aprendiz  
		FROM aprendiz
	LOOP
	IF estado_aprendiz = 1
	END LOOP;
END
$$;

select * from novedad;

select * from aprendiz;
call fun_cre_nov()
select * from tipo_novedad;
delete from novedad where numero_documento_usuario = 1094778783
delete from tipo_novedad where id_tipo_novedad = 7
