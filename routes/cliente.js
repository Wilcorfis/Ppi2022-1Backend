import { Router } from "express";

import connection from '../db/db.js';
const router = Router();

router.get('/clientes', async (req, res) => {

  try {
    const [rows] = await connection.query(`
    select id_cliente,identificacion,primer_nombre,
segundo_nombre,primer_apellido,segundo_apellido,
fk_id_genero,fk_id_municipio,
activo,correo,M.fk_id_departamento from cliente INNER JOIN municipio M
on fk_id_municipio=M.id_municipio;
    `);

    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/clientes/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from cliente where cedula=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/cliente/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from cliente where id_cliente=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/cliente', async (req, res) => {
  try {
    const {
      identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      fk_id_genero,
      fk_id_municipio,
      correo
    } = req.body;
    const activo="s"

    await connection.query(
      `insert into cliente(identificacion,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,fk_id_genero,fk_id_municipio,activo,correo)
      values ('${identificacion}','${primer_nombre}','${segundo_nombre}','${primer_apellido}','${segundo_apellido}',
      '${fk_id_genero}','${fk_id_municipio}','${activo}','${correo}')`
    )
    const [rows] = await connection.query(`
    select id_cliente,identificacion,primer_nombre,
segundo_nombre,primer_apellido,segundo_apellido,
fk_id_genero,fk_id_municipio,
activo,correo,M.fk_id_departamento from cliente INNER JOIN municipio M
on fk_id_municipio=M.id_municipio where identificacion='${identificacion}';
    `);
    return res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ error: error })

  }

})
//1 48 video 6 abril parte 2
router.patch('/cliente/:id', async (req, res) => {
  try {
    const { id } = req.params
    const fields = Object.keys(req.body);
    const fieldsQuery = fields.map(field => {
      if (typeof req.body[`${field}`] === 'string') {
        return `${field} = '${req.body[`${field}`]}'`
      } else {
        return `${field} = ${req.body[`${field}`]}`
      }

    })
    const result = await connection
      .query(`update cliente set ${fieldsQuery.join()}
     where id_cliente = ${id} `);

    const [rows] = await connection.query(`
     select id_cliente,identificacion,primer_nombre,
      segundo_nombre,primer_apellido,segundo_apellido,
      fk_id_genero,fk_id_municipio,
      activo,correo,M.fk_id_departamento from cliente INNER JOIN municipio M
      on fk_id_municipio=M.id_municipio where id_cliente='${id}';
     `);



    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }
});

router.delete('/cliente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query(`delete from cliente where id_cliente= ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

export default router;
