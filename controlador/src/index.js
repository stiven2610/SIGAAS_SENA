const express = require ('express');
const morgan = require("morgan");
const path = require('path');

const cors = require('cors');
const {conectarYEscuchar} = require ('./controllers/send_emails.js')
const taskRoutes = require("./routes/tasks.routes.js")

const app = express ();
app.use(express.static('build'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

conectarYEscuchar()
  .then(() => console.log('Conexión establecida. Escuchando notificaciones...'))
  .catch(error => console.error('Error al conectar y escuchar:', error));

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRoutes);
app.use((err, req,res,next) =>{
    return res.json({
       message: err.message
    })
}) 
app.listen(4000)
console.log("server on port 4000");