import { Router } from "express";

import connection from '../db/db.js';
const router = Router();

router.get('/horarios', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from horario;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/horarios/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from horario where id_horario=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/horario/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from horario where id_horario=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/horario', async (req, res) => {
  try {
    const {
      hora_entrada,
      hora_salida,
      dias
  
    } = req.body;

    await connection.query(
      `insert into horario(hora_entrada,hora_salida,dias)
      values ('${hora_entrada}','${hora_salida}','${dias}')`
    )
    const [rows] = await connection.query(`select * from horario where id_horario=(select max(id_horario) from horario) ;`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

router.patch('/horario/:id', async (req, res) => {
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
      .query(`update horario set ${fieldsQuery.join()}
     where id_horario = ${id} `);

    const [rows] = await connection.query(`select * from horario where id_horario='${id}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }
});

router.delete('/horario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query(`delete from horario where id_horario = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })

  }

})


export default router;
