CREATE OR REPLACE FUNCTION fun_enviar_correo(destinatario TEXT, asunto TEXT, cuerpo TEXT) RETURNS VOID AS $$
BEGIN
    PERFORM smtp_send('smtp.example.com', 25, 'stivenrozo1@gmail.com', destinatario, asunto, cuerpo);
END;
$$ LANGUAGE plpgsql;
SELECT fun_enviar_correo('stivenrozo57@gmail.com', 'Prueba de correo', 'Este es el cuerpo del correo de prueba.');
