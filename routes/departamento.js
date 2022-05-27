import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/departamentos', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from departamento;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/departamentos/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from departamento where fk_id_pais=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/departamento/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select nombre from departamento where id_departamento=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/departamento', async (req, res) => {
  try {
    const {
      nombre,
      fk_id_pais
    } = req.body;
    await connection.query(
      `insert into departamento(nombre,fk_id_pais)
      values ('${nombre}','${fk_id_pais}')`
    )
    const [rows] = await connection.query(`select * from departamento where nombre='${nombre}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

router.patch('/departamento/:id', async (req, res) => {
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
      .query(`update departamento set ${fieldsQuery.join()}
     where id_departamento = ${id} `);

     const [rows] = await connection.query(`select * from departamento where id_departamento='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/departamento/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from departamento where id_departamento = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})
export default router;
