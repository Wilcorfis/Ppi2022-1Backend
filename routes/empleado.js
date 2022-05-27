import { Router } from "express";

import connection from '../db/db.js';
const router = Router();

router.get('/empleados', async (req, res) => {

  try {
    const [rows] = await connection.query(`
    select id_empleado,fk_id_tipo_empleado,identificacion,primer_nombre,
segundo_nombre,primer_apellido,segundo_apellido,telefono,
celular,clave,direccion,correo,fecha_nacimiento,fk_id_genero,fk_id_municipio,
fk_id_horario,activo,M.fk_id_departamento from empleado INNER JOIN municipio M
on fk_id_municipio=M.id_municipio;
    `);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/empleados/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from empleado where id_empleado=${id}`);
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
      horario,
      activo
    } = req.body;
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


export default router;
