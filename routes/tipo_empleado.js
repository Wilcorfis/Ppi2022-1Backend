import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/tipo_empleados', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from tipo_empleado;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/tipo_empleados/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from tipo_empleado where id_tipo_empleado=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/tipo_empleado/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from tipo_empleado where id_tipo_empleado=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/tipo_empleado', async (req, res) => {
  try {
    const {
      nombre,

    } = req.body;
    await connection.query(
      `insert into tipo_empleado(nombre)
      values ('${nombre}')`
    )
    const [rows] = await connection.query(`select * from tipo_empleado where nombre='${nombre}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

router.patch('/tipo_empleado/:id', async (req, res) => {
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
      .query(`update tipo_empleado set ${fieldsQuery.join()}
     where id_tipo_empleado = ${id} `);

     const [rows] = await connection.query(`select * from tipo_empleado where id_tipo_empleado='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/tipo_empleado/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from tipo_empleado where id_tipo_empleado = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;
