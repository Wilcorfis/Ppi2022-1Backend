import mysql from "mysql2/promise"
import 'dotenv/config'

const conn=mysql.createPool({
    host:process.env.HOST_DB,
    user:process.env.USER_DB,
    database:process.env.DATABASE_NAME,
    port:process.env.PORT_DB,
    password:process.env.PASSWORD_DB

})


export default conn;