import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/recetas', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from receta;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/recetas/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from receta where id_receta=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/receta/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select nombre_receta from receta where id_receta=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/receta', async (req, res) => {
  try {
    const {
      fk_id_plato,
      nombre_receta

    } = req.body;
    await connection.query(
      `insert into receta(fk_id_plato,nombre_receta)
      values ('${fk_id_plato}','${nombre_receta}')`
    )
    const [rows] = await connection.query(`select * from receta where id_receta=(select max(id_receta) from receta);`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
//1 48 video 6 abril parte 2
router.patch('/receta/:id', async (req, res) => {
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
      .query(`update receta set ${fieldsQuery.join()}
     where id_receta = ${id} `);

     const [rows] = await connection.query(`select * from receta where id_receta='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/receta/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from receta where id_receta = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;

