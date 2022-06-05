import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/receta_ingredientes', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from receta_ingrediente;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/receta_ingredientes/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from receta_ingrediente where id_receta_ingrediente=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/receta_ingrediente/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from receta_ingrediente where id_receta_ingrediente=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/receta_ingrediente', async (req, res) => {
  try {
    const {
      descripcion,
      fk_id_ingrediente,
      fk_id_receta,
      cantidad,
      unidad
    } = req.body;
    await connection.query(
      `insert into receta_ingrediente(descripcion,fk_id_ingrediente,fk_id_receta,cantidad,unidad)
      values ('${descripcion}','${fk_id_ingrediente}','${fk_id_receta}','${cantidad}','${unidad}')`
    )
    const [rows] = await connection.query(`select * from receta_ingrediente where id_receta_ingrediente=(select max(id_receta_ingrediente) from receta_ingrediente);`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

router.patch('/receta_ingrediente/:id', async (req, res) => {
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
      .query(`update receta_ingrediente set ${fieldsQuery.join()}
     where id_receta_ingrediente = ${id} `);

     const [rows] = await connection.query(`select * from receta_ingrediente where id_receta_ingrediente='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/receta_ingrediente/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from receta_ingrediente where id_receta_ingrediente = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;
