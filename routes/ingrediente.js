import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/ingredientes', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from ingrediente;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/ingredientes/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from ingrediente where id_ingrediente=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/ingrediente/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select nombre from ingrediente where id_ingrediente=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/ingrediente', async (req, res) => {
  try {
    const {
      nombre,
      activo
    } = req.body;
    await connection.query(
      `insert into ingrediente(nombre,activo)
      values ('${nombre}','${activo}')`
    )
    const [rows] = await connection.query(`select * from ingrediente where nombre='${nombre}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
//1 48 video 6 abril parte 2
router.patch('/ingrediente/:id', async (req, res) => {
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
      .query(`update ingrediente set ${fieldsQuery.join()}
     where id_ingrediente = ${id} `);

     const [rows] = await connection.query(`select * from ingrediente where id_ingrediente='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/ingrediente/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from ingrediente where id_ingrediente = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;
