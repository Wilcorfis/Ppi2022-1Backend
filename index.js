import express from"express";
import morgan from"morgan";
import cors from "cors";
//import path from "path";


import cliente from './routes/cliente.js';
import mesa from './routes/mesa.js';
import empleado from './routes/empleado.js';
import pais from './routes/pais.js';
import departamento from './routes/departamento.js';
import municipio from './routes/municipio.js';
import genero from './routes/genero.js';
import horario from './routes/horario.js';
import tipo_empleado from './routes/tipo_empleado.js';
import ingrediente from './routes/ingrediente.js';
import receta_ingrediente from './routes/receta_ingrediente.js';
import receta from './routes/receta.js';
import categoria from './routes/categoria.js';
import plato from './routes/plato.js';
import pedido from './routes/pedido.js';
import detalle_pedido from './routes/detalle_pedido.js';


import 'dotenv/config'



const app = express();


//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});



//Routes

app.use('/api/', mesa)
app.use('/api/', cliente)
app.use('/api/', empleado)
app.use('/api/', pais)
app.use('/api/', departamento)
app.use('/api/', municipio)
app.use('/api/', genero)
app.use('/api/', horario)
app.use('/api/', tipo_empleado)
app.use('/api/', ingrediente)
app.use('/api/', receta_ingrediente)
app.use('/api/', receta)
app.use('/api/', categoria)
app.use('/api/', plato)
app.use('/api/', pedido)
app.use('/api/', detalle_pedido)


app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")|| 4000}`);
});

export default app;