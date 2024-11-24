import { RowDataPacket } from "mysql2";
import { pool } from "../database";
import { Category } from "../types/category";
import { Letter } from "../types/letter";


export async function createLetter(letterNumber: string, category: number,title: string,fileName:string) {
const [result] = await pool.query<[RowDataPacket]>(`
  INSERT INTO arsip_surat (nomor_surat,id_kategori,judul,file_pdf)
  VALUES (?,?,?,?)
  `, [letterNumber,category,title,fileName])
  return result
}

export async function getAllLetter() {
  const [rows]  = await pool.query<[RowDataPacket]>(`SELECT * FROM arsip_surat`);
  return rows as unknown as Letter[] ;
}

export async function getLetter(id:number) {
  const [rows]  = await pool.query<[RowDataPacket]>(
    `
  SELECT * 
  FROM arsip_surat
  WHERE id = ?
  `,
    [id]
  );
  return rows[0] as Letter;
}