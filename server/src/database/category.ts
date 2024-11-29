import { RowDataPacket } from "mysql2";
import { pool } from "../database";
import { Category } from "../types/category";

export async function createCategory(name:string,judul:string) {
  try {
const [result] = await pool.query<[RowDataPacket]>(`
  INSERT INTO kategori_surat (nama_kategori,judul)
  VALUES (?,?)
  `, [name,judul])
    
  return result
  } catch (error) {
    // console.error('Duplicate key error:', error.message);
    // return error
    throw new Error('Category already exists');
}
    // console.error(error);
    // if (error.includes('Duplicate entry')) {
    //   throw new Error('Category already exists');
    // }
  // }
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

export async function updateCategory(name:string,id:number,judul:string) {
const [result] = await pool.query<[RowDataPacket]>(`
 UPDATE kategori_surat SET nama_kategori = ?, judul= ? WHERE id = ?; 
  `, [name,judul,id])
  return result
}

export async function deleteCategory(id:number) {
  try {
  const [result] = await pool.query<[RowDataPacket]>(`
  DELETE FROM kategori_surat WHERE id = ? ; 
  `, [id])
  return result
    
  } catch (error) {
    
    throw new Error('Category still in Relation');
  }
}
