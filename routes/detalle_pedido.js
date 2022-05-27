import { Router } from "express";

import connection from'../db/db.js';
const router = Router();


router.get('/detalle_pedido', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from detalle_pedido;`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.patch('/detalle_pedidopago/:id', async (req, res) => {
  try {
    const { id } = req.params
    const estado="Terminado"

    await connection
      .query(`update pedido set 
        estado='${estado}'
        where id_pedido = '${id}' `);

    return res.status(200).json("ok")

  } catch (error) {
    res.status(500).json({ error: error })

  }
});
router.get('/detalle_pedidopago', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`
    
select fk_id_pedido,fk_id_mesa,group_concat(fk_id_plato SEPARATOR ' , ') as cantidad,group_concat(suma SEPARATOR ' , ')as total from(
select t.fk_id_pedido,t.fk_id_mesa,t.fk_id_plato, group_concat(sum_value) as suma
  from (select fk_id_pedido,p.nombre,pe.fk_id_mesa ,fk_id_plato,sum(p.costo) as sum_value
          from detalle_pedido inner join plato p on p.id_plato=fk_id_plato
         inner join pedido pe on pe.id_pedido=fk_id_pedido where p.activo='s' and pe.estado='En espera'
         group by fk_id_pedido) t
 group by t.fk_id_pedido 

union all 

SELECT A.fk_id_pedido,A.fk_id_mesa,GROUP_CONCAT(A.count SEPARATOR ' , ') as cantidad,A.fk_id_plato
FROM
   (SELECT fk_id_pedido,p.nombre,pe.fk_id_mesa,fk_id_plato, CONCAT(p.nombre,'(',count(p.nombre),')') AS count   
    FROM detalle_pedido inner join plato p on p.id_plato=fk_id_plato
     inner join pedido pe on pe.id_pedido=fk_id_pedido where p.activo='s' and pe.estado='En espera'
    GROUP BY fk_id_pedido, p.nombre) A
GROUP BY A.fk_id_pedido 
)detalle_pedido;
 
    
    `);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

router.get('/detalle_pedidos', async (req, res) => {

  try {
    const [rows] = await connection.query(`select id_detalle_pedido,fk_id_pedido,fk_id_plato from detalle_pedido inner join pedido p on fk_id_pedido=p.id_pedido where p.estado="En espera";`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/detalle_pedidos/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from detalle_pedido where id_detalle_pedido=${id}`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/detalle_pedido/:id', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`select * from detalle_pedido where id_detalle_pedido=${id};`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.post('/detalle_pedido', async (req, res) => {
  try {
    const {
      fk_id_pedido,
      fk_id_plato

    } = req.body;
    await connection.query(
      `insert into detalle_pedido(fk_id_pedido,fk_id_plato)
      values ('${fk_id_pedido}','${fk_id_plato}')`
    )
    const [rows] = await connection.query(`select * from detalle_pedido where  id_detalle_pedido=(select max(id_detalle_pedido) from detalle_pedido) and fk_id_pedido='${fk_id_pedido}';`);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

router.patch('/detalle_pedido/:id', async (req, res) => {
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
      .query(`update detalle_pedido set ${fieldsQuery.join()}
     where id_detalle_pedido = ${id} `);

     const [rows] = await connection.query(`select * from detalle_pedido where id_detalle_pedido='${id}';`);
     return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error})

  }
});

router.delete('/detalle_pedido/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    await connection.query(`delete from detalle_pedido where id_detalle_pedido = ${id};`);
    return res.status(200).json('Registro eliminado correctamente')

  } catch (error) {
    res.status(500).json({ error: error })
    
  }

})


export default router;
