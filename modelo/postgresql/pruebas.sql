insert into aprendiz values ('1094778783','Yeison Stiven Gutierrez Rozo','2619701','1','5','1','1','100001','123456789','2024-02-10','3242343432','3103558222','calel 29 #10-98 lagos 1','stivenrozo1@gmail.com');
INSERT INTO aprendiz VALUES ('109477878','Juan Pérez','2619701','1','5','1','2','100001','123456789','2024-02-10','3242343432','3103558222','Calle 29 #10-98 Lagos 1','juanperez@gmail.com');
INSERT INTO aprendiz VALUES ('209477879','María García','2619702','2','4','2','3','100001','123456789','2024-04-15','3242343433','3103558223','Calle 30 #11-99 Lagos 2','mariagarcia@gmail.com');
INSERT INTO aprendiz VALUES ('309477880','Carlos Rodríguez','2619701','3','2','2','4','100001','123456789','2024-06-20','3242343434','3103558224','Calle 31 #12-100 Lagos 3','carlosrodriguez@gmail.com');
INSERT INTO aprendiz VALUES ('409477881','Ana López','2619702','2','2','1','5','100001','123456789','2024-08-25','3242343435','3103558225','Calle 32 #13-101 Lagos 4','analopez@gmail.com');

insert into instructor_lider values ('1234567893','Magda milena','milenaGarcia@gmail.com');
insert into ficha values ('2670702','1','1234567893','2023-10-05','2024-02-29','2025-01-20','tecnologia','Talento humano')

INSERT INTO aprendiz VALUES ('209477879','María García','2619702','2','4','2','3','100001','123456789','2024-04-15','3242343433','3103558223','Calle 30 #11-99 Lagos 2','mariagarcia@gmail.com');
INSERT INTO aprendiz VALUES ('309477880','Carlos Rodríguez','2670123','3','2','2','4','100001','123456789','2024-06-20','3242343434','3103558224','Calle 31 #12-100 Lagos 3','carlosrodriguez@gmail.com');
INSERT INTO aprendiz VALUES ('409477881','Ana López','2670123','2','2','1','5','100001','123456789','2024-08-25','3242343435','3103558225','Calle 32 #13-101 Lagos 4','analopez@gmail.com');
INSERT INTO aprendiz VALUES ('509477882','Pedro Martínez','2670702','1','1','2','6','100001','123456789','2024-10-30','3242343436','3103558226','Calle 33 #14-102 Lagos 5','pedromartinez@gmail.com');
ALTER TABLE ficha add column fecha_fin_lectiva date;
select * from ficha;
select * from instructor_lider;
select * from aprendiz;
update ficha set fecha_fin_lectiva = '2024-03-03' where codigo_ficha = '2619701';
update ficha set fecha_fin_lectiva  = '2024-04-04' where codigo_ficha = '2670123';
update ficha set fecha_fin_lectiva  = '2024-02-20' where codigo_ficha = '2619702';
update ficha set fecha_fin_lectiva  = '2024-03-25' where codigo_ficha = '2670702';