import { Router } from "express";

import connection from'../db/db.js';
const router = Router();
router.get('/municipios', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from municipio;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/municipios/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from municipio where fk_id_departamento=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/municipio/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select nombre from municipio where id_municipio=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/municipio', async (req, res) => {
  try {
    const {
      nombre,
      fk_id_departamento

    } = req.body;
    await connection.query(
      `insert into municipio(nombre,fk_id_departamento)
      values ('${nombre}','${fk_id_departamento}')`
    )
    const [rows] = await connection.query(`select * from municipio where nombre='${nombre}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
//1 48 video 6 abril parte 2
router.patch('/municipio/:id', async (req, res) => {
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
      .query(`update municipio set ${fieldsQuery.join()}
     where id_municipio = ${id} `);

     const [rows] = await connection.query(`select * from municipio where id_municipio='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/municipio/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from municipio where id_municipio = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }
});

export default router;




   

