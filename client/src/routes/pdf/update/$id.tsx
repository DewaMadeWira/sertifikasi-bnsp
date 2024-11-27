import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { STYLE } from "@/types/style";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/category";
import axios from "axios";
import { ROUTES } from "@/types/routes";
import { useMutation, useQuery } from "react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Letter } from "@/types/letter";
export const Route = createFileRoute("/pdf/update/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: letter, isLoading: isLoadingLetter } = useQuery({
    queryKey: ["update_letter", id],
    queryFn: async () => {
      const { data } = await axios.get(ROUTES.ARSIP + id);
      console.log(data);
      return data as Letter;
    },
    staleTime: Infinity,
  });
  if (isLoadingLetter) return <div>Loading...</div>;
  if (letter == undefined) return <div>Error loading data: </div>;

  const { data, isLoading } = useQuery({
    queryKey: ["kategori_update"],
    queryFn: async () => {
      const { data } = await axios.get(ROUTES.CATEGORY);
      console.log(data);
      return data as Category[];
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (data == undefined) return <div>Error loading data: </div>;

  const [formData, setFormData] = useState({
    nomor_surat: letter.nomor_surat,
    id_kategori: letter.id_kategori,
    judul: letter.judul,
    file: null,
  });
  const { toast } = useToast();
  const updateLetter = useMutation({
    mutationKey: ["update_letter", id],
    mutationFn: async (formData: {
      id: string;
      nomor_surat: string;
      id_kategori: string;
      judul: string;
      file: File | null;
    }) => {
      const data = new FormData();
      data.append("id", id);
      data.append("nomor_surat", formData.nomor_surat);
      data.append("id_kategori", formData.id_kategori);
      data.append("judul", formData.judul);
      if (formData.file) {
        data.append("file", formData.file);
      }
      const response = await axios.post(ROUTES.ARSIP, data);
      return response.data;
    },
    onSuccess: () => {
      console.log("Success");
      toast({
        title: "Berhasil",
        description: "Surat berhasil diupdate",
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

  const handleFileChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    updateLetter.mutate(formData as any);
  };
  return (
    <Sidebar>
      <h1 className="text-3xl">Arsip Surat - Edit</h1>

      <p className="mt-2">Edit file surat yang sudah diarsipkan</p>
      <p>Catatan : Gunakan file dengan Format PDF</p>
      <div className="flex gap-2 mt-10 ">
        <div className="flex flex-col gap-6 items-center ">
          <p>Nomor surat </p>
          <p>Kategori </p>
          <p>Judul </p>
          <p>File PDF </p>
        </div>
        <div className="flex flex-col gap-6">
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </div>
        <div className="flex flex-col gap-2 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              name="nomor_surat"
              placeholder="Nomor Surat"
              required
              value={formData.nomor_surat}
              onChange={handleFormChange}
            ></Input>
            <Select
              name="id_kategori"
              value={formData.id_kategori}
              // onValueChange={handleFormChange}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  id_kategori: value,
                }));
              }}
              required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent className="bg-standard text-white">
                {data.map((category) => (
                  <SelectItem value={category.id.toString()}>
                    {category.nama_kategori}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              onChange={handleFormChange}
              value={formData.judul}
              name="judul"
              placeholder="Judul Surat"
              required
            ></Input>
            <Input
              name="file"
              type="file"
              className="text-white mt-1"
              onChange={handleFileChange}
              accept="application/pdf"
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
