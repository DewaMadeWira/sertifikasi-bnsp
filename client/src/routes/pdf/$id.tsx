import { createFileRoute, Link } from "@tanstack/react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { ROUTES } from "@/types/routes";
import { Letter } from "@/types/letter";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Download, Edit } from "lucide-react";
import { STYLE } from "@/types/style";

export const Route = createFileRoute("/pdf/$id")({
  component: RouteComponent,
});
function RouteComponent() {
  const { id } = Route.useParams();
  const {
    data: pdfUrl,
    isLoading,
    error,
  } = useQuery(
    ["pdf", id],
    async () => {
      const response = await axios.get(ROUTES.ARSIP_PDF + id, {
        responseType: "blob", // Fetch as Blob
      });
      return URL.createObjectURL(response.data); // Convert Blob to URL
    },
    {
      staleTime: Infinity,
    }
  );
  const {
    data: letter,
    isLoading: loadingArsip,
    error: errorArsip,
  } = useQuery<Letter>({
    queryKey: ["surat_satu", id],
    staleTime: Infinity,
    queryFn: async () => {
      const { data } = await axios.get<Letter>(`${ROUTES.ARSIP}${id}`);
      return data;
    },
  });
  if (isLoading || loadingArsip) return <div>Loading...</div>;
  // if (loadingArsip) return <div>Loading...</div>;
  if (!letter || pdfUrl == undefined) {
    console.log("===");
    console.log(errorArsip);
    console.log(error);
    window.location.reload();
    return <div>Error loading data: </div>;
  }

  return (
    <Sidebar>
      <h1 className="text-3xl">Preview Arsip Surat</h1>
      <div className="flex gap-2 w-1/3 mt-5">
        <div className="">
          <p>Nomor </p>
          <p>Kategori </p>
          <p>Judul </p>
          <p>Tanggal Pengarsipan</p>
        </div>
        <div className=" w-fit">
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </div>
        <div className=" ">
          <p>{letter.nomor_surat}</p>
          <p>{letter.nama_kategori}</p>
          <p>{letter.judul}</p>
          <p>{letter.created_at.slice(0, 10)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <embed src={pdfUrl} width="80%" height="400px" type="application/pdf" />
      </div>
      <div className="flex gap-3 mt-10">
        <a href={ROUTES.ARSIP_PDF + id} download>
          <Button className={STYLE.BUTTON_PRIMARY}>
            <div className="flex justify-between w-16">
              <p>Unduh</p>
              <Download></Download>
            </div>
          </Button>
        </a>
        <Button className={STYLE.BUTTON_PRIMARY}>
          <Link to="/pdf/update/$id" params={{ id: id }}>
            <div className="flex justify-between w-20 items-center">
              <p>Ganti File</p>
              <Edit></Edit>
            </div>
          </Link>
        </Button>
      </div>
    </Sidebar>
  );
}
