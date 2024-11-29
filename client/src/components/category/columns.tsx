"use client";

import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
const ActionCell = ({ category }: { category: Category }) => {
  const { toast } = useToast();
  const { mutate: deleteLetter } = useMutation({
    // mutationFn: async (formData: { id: string }) => {
    // @ts-ignore
    mutationFn: async () => {
      // const data = new FormData();
      // data.append("id", category.id.toString());
      const response = await axios.delete(`${ROUTES.CATEGORY}${category.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Kategori berhasil dihapus",
        className: "bg-standard text-white",
      });
      window.location.reload();
    },
    onError: (error: Error) => {
      // alert(error);
      // console.log(error);
      if (!axios.isAxiosError(error)) {
        return error;
      }
      if (error.status === 403) {
        toast({
          title: "Gagal",
          description: "Kategori masih dalam relasi",
          className: "bg-red-500 text-white",
        });
      }
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
            <Link
              to="/kategori-update/$id"
              params={{ id: category.id.toString() }}
            >
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="bg-standard text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Kategori "{category.nama_kategori}" akan dihapus
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            Kategori yang dihapus tidak dapat dikembalikan. Apakah anda yakin
            akan menghapus ?
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
export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nama_kategori",
    header: "Nama Kategori",
  },
  {
    accessorKey: "judul",
    header: "Keterangan",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const category = row.original;

      // const deleteLetter = async () => {
      //   // await axios.delete(`${ROUTES.ARSIP}${category.id}`);
      //   // toast({
      //   //   title: "Berhasil",
      //   //   description: "Surat berhasil dihapus",
      //   //   className: "bg-standard text-white",
      //   // });
      //   const { data } = useMutation({
      //     mutationFn: async () => {
      //       await axios.delete(`${ROUTES.ARSIP}${category.id}`);
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

      return <ActionCell category={category} />;
    },
  },
];
