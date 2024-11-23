import mysql,{RowDataPacket } from "mysql2";
import { Category } from "./types/category";

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "sertifikasi_db",
  })
  .promise();


export async function createCategory(name:string) {
const [result] = await pool.query<[RowDataPacket]>(`
  INSERT INTO kategori_surat (nama_kategori)
  VALUES (?)
  `, [name])
  return result
  // const [rows]  = await pool.query<[RowDataPacket]>(`SELECT * FROM kategori_surat`);
  // return rows as unknown as Category[] ;
}

export async function getAllCategory() {
  const [rows]  = await pool.query<[RowDataPacket]>(`SELECT * FROM kategori_surat`);
  return rows as unknown as Category[] ;
}
export async function getCategory(id:number) {
  const [rows]  = await pool.query<[RowDataPacket]>(
    `
  SELECT * 
  FROM kategori_surat
  WHERE id = ?
  `,
    [id]
  );
  return rows[0] as Category;
}
export async function updateCategory(name:string,id:number) {
const [result] = await pool.query<[RowDataPacket]>(`
 UPDATE kategori_surat SET nama_kategori = ? WHERE id = ?; 
  `, [name,id])
  return result
}
export async function deleteCategory(id:number) {
const [result] = await pool.query<[RowDataPacket]>(`
 DELETE FROM kategori_surat WHERE id = ? ; 
  `, [id])
  return result
}


// const kategori = await getCategory(1);
// console.log(kategori);
