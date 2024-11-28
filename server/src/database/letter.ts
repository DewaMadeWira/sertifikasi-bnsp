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
  const [rows]  = await pool.query<[RowDataPacket]>(`SELECT arsip_surat.id,arsip_surat.nomor_surat,arsip_surat.judul, kategori_surat.nama_kategori, arsip_surat.file_pdf, arsip_surat.created_at from arsip_surat INNER join kategori_surat on arsip_surat.id_kategori = kategori_surat.id`);
  return rows as unknown as Letter[] ;
}

export async function getLetter(id:number) {
  const [rows]  = await pool.query<[RowDataPacket]>(
    `
    SELECT arsip_surat.id,arsip_surat.nomor_surat,arsip_surat.judul, kategori_surat.nama_kategori, arsip_surat.file_pdf,  arsip_surat.created_at from arsip_surat INNER join kategori_surat on arsip_surat.id_kategori = kategori_surat.id WHERE arsip_surat.id = ?
  `,
    [id]
  );
  return rows[0] as Letter;
}

export async function updateLetter({id,nomor_surat,id_kategori,judul,file_pdf}:Letter) {
const [result] = await pool.query<[RowDataPacket]>(`
 UPDATE arsip_surat SET nomor_surat = ?, id_kategori = ?, judul=?, file_pdf = ? WHERE id = ?; 
  `, [nomor_surat,id_kategori,judul,file_pdf,id])
  return result
}

export async function deleteLetter(id:number) {
const [result] = await pool.query<[RowDataPacket]>(`
 DELETE FROM arsip_surat WHERE id = ? ; 
  `, [id])
  return result
}