import { Router } from "express";

import connection from '../db/db.js';
const router = Router();

router.get('/platos', async (req, res) => {

  try {
    const [rows] = await connection.query(`
    select id_plato,nombre,fk_id_categoria,costo,activo from plato;
    `);

    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/platos/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from plato where id_plato=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/plato/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select nombre from plato where id_plato=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/plato', async (req, res) => {
  try {
    const {
      nombre,
      fk_id_categoria,
      costo,
      activo
    } = req.body;
    await connection.query(
      `insert into plato(nombre,fk_id_categoria,costo,activo)
      values ('${nombre}','${fk_id_categoria}','${costo}','${activo}')`
    )
    const [rows] = await connection.query(`
    select id_plato,nombre,fk_id_categoria,costo,activo from plato where nombre='${nombre}';
    `);

    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.patch('/plato/:id', async (req, res) => {
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
      .query(`update plato set ${fieldsQuery.join()}
     where id_plato = ${id} `);

    const [rows] = await connection.query(`
    select id_plato,nombre,fk_id_categoria,costo,activo from plato where id_plato='${id}';
     `);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }
});

router.delete('/plato/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query(`delete from plato where id_plato = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })

  }

})


export default router;
