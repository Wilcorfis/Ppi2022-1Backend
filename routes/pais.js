import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/paises', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from pais;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/pais/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select nombre from pais where id_pais=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/pais', async (req, res) => {
  try {
    const {
      nombre
    } = req.body;
    await connection.query(
      `insert into pais(nombre)
      values ('${nombre}')`
    )
    const [rows] = await connection.query(`select * from pais where nombre='${nombre}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
//1 48 video 6 abril parte 2
router.patch('/pais/:id', async (req, res) => {
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
      .query(`update pais set ${fieldsQuery.join()}
     where id_pais = ${id} `);

     const [rows] = await connection.query(`select * from pais where id_pais='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/pais/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from pais where id_pais = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error})

  }
});
export default router;
 

