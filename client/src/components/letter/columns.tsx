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
import { ROUTES, ROUTES_CLIENT } from "@/types/routes";
import { useMutation } from "react-query";
import axios from "axios";
import { Link } from "@tanstack/react-router";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }
const ActionCell = ({ letter }: { letter: Letter }) => {
  const { toast } = useToast();
  const { mutate: deleteLetter } = useMutation({
    mutationFn: async () => {
      await axios.delete(`${ROUTES.ARSIP}${letter.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Surat berhasil dihapus",
        className: "bg-standard text-white",
      });
      window.location.reload();
    },
  });

  return (
    <AlertDialog>
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
          <DropdownMenuItem>
            <AlertDialogTrigger>Hapus</AlertDialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href={`${ROUTES.ARSIP_PDF}${letter.id}`}>Unduh</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/pdf/$id" params={{ id: letter.id.toString() }}>
              Lihat
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="bg-standard text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Surat "{letter.judul}" akan dihapus
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            Surat yang dihapus tidak dapat dikembalikan. Apakah anda yakin akan
            menghapus ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Existing alert dialog content */}
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Kembali</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => deleteLetter()}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
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
      const { toast } = useToast();

      // const deleteLetter = async () => {
      //   // await axios.delete(`${ROUTES.ARSIP}${letter.id}`);
      //   // toast({
      //   //   title: "Berhasil",
      //   //   description: "Surat berhasil dihapus",
      //   //   className: "bg-standard text-white",
      //   // });
      //   const { data } = useMutation({
      //     mutationFn: async () => {
      //       await axios.delete(`${ROUTES.ARSIP}${letter.id}`);
      //       console.log(data);

      //       // document.body.appendChild(link)
      //       // link.click()
      //       // link.remove()
      //     },
      //     onSuccess: (data) => {
      //       toast({
      //         title: "Berhasil",
      //         description: "Surat berhasil dihapus",
      //         className: "bg-standard text-white",
      //       });
      //     },
      //   });
      // };

      return <ActionCell letter={letter} />;
    },
  },
];
