import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";
import { useMutation } from "react-query";
import axios from "axios";
import { ROUTES } from "@/types/routes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { STYLE } from "@/types/style";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/create_category")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    nama_kategori: "",
    judul: "",
  });
  const { toast } = useToast();
  const createCategory = useMutation({
    mutationKey: ["create_category"],
    mutationFn: async () => {
      // console.log(data);
      const response = await axios.post(ROUTES.CATEGORY, {
        nama_kategori: formData.nama_kategori,
        judul: formData.judul,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("Success");
      toast({
        title: "Berhasil",
        description: "Kategori berhasil ditambahkan",
        className: "bg-standard text-white",
      });

      // Handle success - can clear form, show notification etc
      // queryClient.invalidateQueries(["pdfs"]); // If you need to refetch PDF list
    },
    onError: (error: Error) => {
      // alert(error);
      // console.log(error);
      if (!axios.isAxiosError(error)) {
        return error;
      }
      if (error.status === 409) {
        toast({
          title: "Gagal",
          description: "Kategori sudah ada",
          className: "bg-red-500 text-white",
        });
      }
      // toast({
      //   title: "Gagal",
      //   description: "Kategori gagal ditambahkan",
      //   className: "bg-red-500 text-white",
      // });
      // Handle error - can show notification etc
    },
  });

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCategory.mutate(formData as any);
  };
  return (
    <Sidebar>
      <h1 className="text-3xl">Kategori Surat - Tambah</h1>

      <p className="mt-2">
        Tambahkan data kategori. Jika sudah selesai jangan lupa untuk menekan
        tombol "Simpan".
      </p>
      <div className="flex gap-2 mt-10 ">
        <div className="flex flex-col gap-6 items-center ">
          {/* <p>Nomor surat </p> */}
          <p>Nama Kategori </p>
          <p>Judul </p>
        </div>
        <div className="flex flex-col gap-6">
          <p>:</p>
          <p>:</p>
        </div>
        <div className="flex flex-col gap-2 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              name="nama_kategori"
              placeholder="Nama Kategori"
              required
              value={formData.nama_kategori}
              onChange={handleFormChange}
            ></Input>
            <Input
              onChange={handleFormChange}
              value={formData.judul}
              name="judul"
              placeholder="Judul "
              required
            ></Input>
            <div className="w-full flex justify-end gap-2">
              <Link to="/">
                <Button className={STYLE.BUTTON_PRIMARY + "mt-2"}>
                  Kembali
                </Button>
              </Link>
              <Button className={STYLE.BUTTON_PRIMARY + "mt-2"}>Simpan</Button>
            </div>
          </form>
        </div>
      </div>
    </Sidebar>
  );
}
