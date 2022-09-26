/*llenar el select de formulario llamando peticion get con
    select id_empleado,fk_id_tipo_empleado,identificacion,primer_nombre,
segundo_nombre,primer_apellido,segundo_apellido,telefono,
celular,clave,direccion,correo,fecha_nacimiento,fk_id_genero,fk_id_municipio,
fk_id_horario,activo,M.fk_id_departamento from empleado INNER JOIN municipio M
on fk_id_municipio=M.id_municipio 
*/ 
import { Router } from "express";

import connection from '../db/db.js';
const router = Router();

router.get('/empleados', async (req, res) => {

  try {
    const [rows] = await connection.query(`
    select id_empleado,t.nombre as "tipo_empleado",identificacion,primer_nombre,
segundo_nombre,primer_apellido,segundo_apellido,telefono,
celular,clave,direccion,correo,fecha_nacimiento,g.nombre as "fk_id_genero",M.nombre as "fk_id_municipio",
fk_id_horario,activo,d.nombre as "fk_id_departamento" from empleado INNER JOIN municipio M
on fk_id_municipio=M.id_municipio inner join departamento d on M.fk_id_departamento=d.id_departamento
inner join tipo_empleado t on t.id_tipo_empleado=fk_id_tipo_empleado inner join genero g on g.id_genero=fk_id_genero;
    `);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/empleados/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from empleado where identificacion=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/empleado/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from empleado where id_empleado=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/empleado', async (req, res) => {
  try {
    const {
      identificacion,
      tipo_empleado,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      telefono,
      celular,
      clave,
      direccion,
      correo,
      fecha_nacimiento,
      genero,
      municipio,
      horario

    } = req.body;
    const activo="s"
    await connection.query(
      `insert into empleado(fk_id_tipo_empleado,identificacion,
        primer_nombre,segundo_nombre,
        primer_apellido,segundo_apellido,
        telefono,celular,clave,
        direccion,correo,fecha_nacimiento,
        fk_id_genero,fk_id_municipio,fk_id_horario,activo)
      values ('${tipo_empleado}','${identificacion}','${primer_nombre}'
      ,'${segundo_nombre}','${primer_apellido}','${segundo_apellido}'
      ,'${telefono}','${celular}','${clave}','${direccion}'
      ,'${correo}',STR_TO_DATE('${fecha_nacimiento}','%d/%m/%Y'),'${genero}','${municipio}'
      ,'${horario}','${activo}')`
    )
    const [rows] = await connection.query(`
    select id_empleado,fk_id_tipo_empleado,identificacion,primer_nombre,
segundo_nombre,primer_apellido,segundo_apellido,telefono,
celular,clave,direccion,correo,fecha_nacimiento,fk_id_genero,fk_id_municipio,
fk_id_horario,activo,M.fk_id_departamento from empleado INNER JOIN municipio M
on fk_id_municipio=M.id_municipio where identificacion=${identificacion};
    `);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/login', async (req, res) => {
  try {
    const {
      identificacion,     
      clave
    } = req.body;
    const rows =await connection.query(
      `select identificacion,t.nombre as "tipo_empleado",activo from empleado inner join tipo_empleado t on t.id_tipo_empleado=fk_id_tipo_empleado
      where identificacion=${identificacion} and clave=${clave}
      `    
    )
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
//1 48 video 6 abril parte 2
router.patch('/empleado/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      tipo_empleado,
      identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      telefono,
      celular,
      clave,
      direccion,
      correo,
      fecha_nacimiento,
      genero,
      municipio,
      horario,
      activo

    } = req.body;

    const result = await connection
      .query(`update empleado set 
        fk_id_tipo_empleado='${tipo_empleado}',
        identificacion='${identificacion}',
        primer_nombre='${primer_nombre}',
        segundo_nombre='${segundo_nombre}',
        primer_apellido='${primer_apellido}',
        segundo_apellido='${segundo_apellido}',
        telefono='${telefono}',
        celular='${celular}',
        clave='${clave}',
        direccion='${direccion}',
        correo='${correo}',
        fecha_nacimiento=STR_TO_DATE('${fecha_nacimiento}','%d/%m/%Y'),
        fk_id_genero='${genero}',
        fk_id_municipio='${municipio}',
        fk_id_horario='${horario}',
        activo='${activo}'
        where id_empleado = '${id}' `);


    const [rows] = await connection.query(`
    select id_empleado,fk_id_tipo_empleado,identificacion,primer_nombre,
segundo_nombre,primer_apellido,segundo_apellido,telefono,
celular,clave,direccion,correo,fecha_nacimiento,fk_id_genero,fk_id_municipio,
fk_id_horario,activo,M.fk_id_departamento from empleado INNER JOIN municipio M
on fk_id_municipio=M.id_municipio where id_empleado=${id};
    `);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }
});

router.delete('/empleado/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query(`delete from empleado where id_empleado = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/meseros/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select fecha,estado,cliente.primer_nombre as "nombrecliente",cliente.primer_apellido as "apellidocliente",empleado.primer_nombre as "nombremesero",
    empleado.primer_apellido as "apellidomesero",mesa.codigo as"codigomesa" from pedido inner join cliente on fk_id_cliente=id_cliente
    inner join empleado on fk_id_empleado=id_empleado inner join mesa on fk_id_mesa=id_mesa where empleado.identificacion=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})


export default router;
