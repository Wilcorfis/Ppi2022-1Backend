import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/mesas', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from mesa;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/mesas/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from mesa where id_mesa=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/mesa/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from mesa where id_mesa=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/meso/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select codigo from mesa where id_mesa=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/mesa', async (req, res) => {
  try {
    const {
      cantidad_personas,
      codigo
    } = req.body;
    const disponible="s"
    await connection.query(
      `insert into mesa(cantidad_personas,disponible,codigo)
      values ('${cantidad_personas}','${disponible}','${codigo}')`
    )
    const [rows] = await connection.query(`select * from mesa where id_mesa=(select max(id_mesa) from mesa);`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
//1 48 video 6 abril parte 2
router.patch('/mesa/:id', async (req, res) => {
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
      .query(`update mesa set ${fieldsQuery.join()}
     where codigo = ${id} `);

     const [rows] = await connection.query(`select * from mesa where codigo='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});
router.patch('/mesaestadon/:id', async (req, res) => {
  try {
    const { id } = req.params
    const disponible="n"

    await connection
      .query(`update mesa set 
        disponible='${disponible}'
        where codigo = '${id}' `);

    return res.status(200).json("ok")

  } catch (error) {
    res.status(500).json({ error: error })

  }
});
router.patch('/mesaestados/:id', async (req, res) => {
  try {
    const { id } = req.params
    const disponible="s"

    await connection
      .query(`update mesa set 
        disponible='${disponible}'
        where codigo = '${id}' `);

    return res.status(200).json("ok")

  } catch (error) {
    res.status(500).json({ error: error })

  }
});
router.patch('/mesaestados2/:id', async (req, res) => {
  try {
    const { id } = req.params
    const disponible="s"

    await connection
      .query(`update mesa set 
        disponible='${disponible}'
        where codigo = '${id}' `);

    return res.status(200).json("ok")

  } catch (error) {
    res.status(500).json({ error: error })

  }
});

router.delete('/mesa/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from mesa where codigo = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;