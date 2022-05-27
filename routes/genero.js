import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/generos', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from genero;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/generos/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from genero where id_genero=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/genero/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from genero where id_genero=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/genero', async (req, res) => {
  try {
    const {
      nombre
    } = req.body;
    await connection.query(
      `insert into genero(nombre)
      values ('${nombre}')`
    )
    const [rows] = await connection.query(`select * from genero where nombre='${nombre}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

router.patch('/genero:id', async (req, res) => {
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
      .query(`update genero set ${fieldsQuery.join()}
     where id_genero = ${id} `);

     const [rows] = await connection.query(`select * from genero where id_genero='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/genero/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from genero where id_genero = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;
