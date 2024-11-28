import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { ROUTES } from "@/types/routes";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { STYLE } from "@/types/style";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";

export const Route = createFileRoute("/kategori-update/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [formData, setFormData] = useState({
    nama_kategori: "",
    judul: "",
  });
  console.log("tes");
  // console.log(formData);

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["update", id],
    queryFn: async () => {
      const { data } = await axios.get(ROUTES.CATEGORY + id);
      console.log("data fetch");
      setFormData({
        nama_kategori: data.nama_kategori,
        judul: data.judul,
      });
      console.log(data);
      return data;
    },
    staleTime: Infinity,
  });

  const { toast } = useToast();
  const updateCategory = useMutation({
    mutationKey: ["create_category"],
    mutationFn: async () => {
      // console.log(data);
      const response = await axios.put(ROUTES.CATEGORY, {
        nama_kategori: formData.nama_kategori,
        id: id,
        judul: formData.judul,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("Success");
      toast({
        title: "Berhasil",
        description: "Kategori berhasil diupdate",
        className: "bg-standard text-white",
      });
      // Handle success - can clear form, show notification etc
      // queryClient.invalidateQueries(["pdfs"]); // If you need to refetch PDF list
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
    updateCategory.mutate(formData as any);
  };
  if (isLoadingCategory) return <Loading></Loading>;
  if (category == undefined) return <div>Error loading data: </div>;
  console.log(category);
  // if (isLoading) return <div>Loading...</div>;
  // if (data == undefined) return <div>Error loading data: </div>;

  return (
    <Sidebar>
      <h1 className="text-3xl">Kategori Surat - Update</h1>

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
              placeholder="Judul Surat"
              required
            ></Input>
            <div className="w-full flex justify-end">
              <Button className={STYLE.BUTTON_PRIMARY + "mt-2"}>Simpan</Button>
            </div>
          </form>
        </div>
      </div>
    </Sidebar>
  );
}
