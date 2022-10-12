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
    
   

    select w.fk_id_pedido,w.codigo,w.suma,k.cantidad  from(
    
    select t.fk_id_pedido,codigo, group_concat(sum_value) as suma
      from (select fk_id_pedido,p.nombre,m.codigo ,sum(p.costo) as sum_value
              from detalle_pedido inner join plato p on p.id_plato=fk_id_plato
             inner join pedido pe on pe.id_pedido=fk_id_pedido inner join mesa m on pe.fk_id_mesa=m.id_mesa where p.activo='s' and pe.estado='En espera'
             group by fk_id_pedido) t
     group by t.fk_id_pedido )w inner join
    
    
    ( SELECT A.fk_id_pedido,GROUP_CONCAT(A.count SEPARATOR ' , ') as cantidad
    FROM
       (SELECT fk_id_pedido,p.nombre, CONCAT(p.nombre,'(',count(p.nombre),')') AS count   
        FROM detalle_pedido inner join plato p on p.id_plato=fk_id_plato
         inner join pedido pe on pe.id_pedido=fk_id_pedido where p.activo='s' and pe.estado='En espera'
        GROUP BY fk_id_pedido, p.nombre) A
    GROUP BY A.fk_id_pedido)k on k.fk_id_pedido=w.fk_id_pedido;
 
    
    `);
    return res.status(200).json(rows)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})
router.get('/detalle_pedidopago2', async (req, res) => {

  try {
    const { id } = req.params
    const [rows] = await connection.query(`
    
    SELECT fk_id_pedido,nombre,costo,codigo from detalle_pedido inner join pedido on id_pedido=fk_id_pedido 
    inner join plato on fk_id_plato=id_plato inner join mesa on pedido.fk_id_mesa=id_mesa where pedido.estado='Terminado' and plato.activo='s' order by fk_id_pedido DESC
 
    
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
