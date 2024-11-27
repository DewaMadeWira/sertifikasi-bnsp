"use client";

import { Letter } from "@/types/letter";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/types/routes";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const columns: ColumnDef<Letter>[] = [
  {
    accessorKey: "nomor_surat",
    header: "Nomor Surat",
  },
  {
    accessorKey: "nama_kategori",
    header: "Kategori",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Pengarsipan",
    cell: ({ row }) => {
      let data = row.original.created_at;
      data = data.slice(0, 10);
      return data;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const letter = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-standard text-white">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.nomor_surat)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hapus</DropdownMenuItem>
            <DropdownMenuItem>
              <a href={`${ROUTES.ARSIP_PDF}${letter.id}`}>Unduh</a>
            </DropdownMenuItem>
            <DropdownMenuItem>Lihat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
