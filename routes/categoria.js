import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/categorias', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from categoria;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/categorias/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from categoria where id_categoria=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/categoria/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select nombre from categoria where id_categoria=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/categoria', async (req, res) => {
  try {
    const {
      nombre
    } = req.body;
    await connection.query(
      `insert into categoria(nombre)
      values ('${nombre}')`
    )
    const [rows] = await connection.query(`select * from categoria where nombre='${nombre}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.patch('/categoria/:id', async (req, res) => {
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
      .query(`update categoria set ${fieldsQuery.join()}
     where id_categoria = ${id} `);

     const [rows] = await connection.query(`select * from categoria where id_categoria='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/categoria/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from categoria where id_categoria = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;
