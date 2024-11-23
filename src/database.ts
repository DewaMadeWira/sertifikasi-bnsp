import mysql,{RowDataPacket } from "mysql2";

export const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "sertifikasi_db",
  })
  .promise();



// const kategori = await getCategory(1);
// console.log(kategori);
