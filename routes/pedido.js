import { Router } from "express";

import connection from'../db/db.js';
const router = Router();

router.get('/pedidos', async (req, res) => {

  try {
    const [rows] = await connection.query('select * from pedido;');
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/pedidos/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from pedido where id_pedido=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/pedido/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from pedido where id_pedido=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/pedido', async (req, res) => {
  try {
    const {
      fk_id_cliente,
      fk_id_empleado,
      fk_id_mesa,
      fecha
    } = req.body;
    const estado="En espera"
  
    await connection.query(
      `insert into pedido(fk_id_cliente,fk_id_empleado,fk_id_mesa,fecha,estado)
      values ('${fk_id_cliente}','${fk_id_empleado}','${fk_id_mesa}',STR_TO_DATE('${fecha}','%d/%m/%Y'),'${estado}')`
    )
    const [rows] = await connection.query(`select * from pedido where id_pedido=(select max(id_pedido) from pedido) and fk_id_cliente='${fk_id_cliente}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
//1 48 video 6 abril parte 2
router.patch('/pedido/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      fk_id_cliente,
      fk_id_empleado,
      fk_id_mesa,
      fecha
    } = req.body;
    const result = await connection
    .query(`update pedido set 
      fk_id_cliente='${fk_id_cliente}',
      fk_id_empleado='${fk_id_empleado}',
      fk_id_mesa='${fk_id_mesa}',
      fecha=STR_TO_DATE('${fecha}','%d/%m/%Y')

      where id_pedido = '${id}' `);


     const [rows] = await connection.query(`select * from pedido where id_pedido='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/pedido/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from pedido where id_pedido = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;
