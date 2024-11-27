import Sidebar from "@/components/Sidebar";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "react-query";
import axios from "axios";
import { ROUTES } from "@/types/routes";
import { Category } from "@/types/category";
import { DataTable } from "@/components/category/data-table";
import { columns } from "@/components/category/columns";
import { Button } from "@/components/ui/button";
import { STYLE } from "@/types/style";

export const Route = createLazyFileRoute("/kategori")({
  component: Kategori,
});

function Kategori() {
  const { data, isLoading } = useQuery({
    queryKey: ["surat"],
    queryFn: async () => {
      const { data } = await axios.get(ROUTES.CATEGORY);
      return data as Category[];
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (data == undefined) return <div>Error loading data: </div>;
  return (
    <Sidebar>
      <h1 className="text-4xl">Arsip Surat</h1>
      {/* <div className="">{JSON.stringify(data)}</div> */}
      <p className="w-1/2 mt-2">
        Berikut ini adalah surat-surat yang telah terbit dan diarsipkan. Klik
        "Lihat" pada kolom aksi untuk menampilkan surat{" "}
      </p>
      <div className="mt-10">
        <DataTable columns={columns} data={data} />
      </div>

      <Link to="/create_pdf">
        <Button className={STYLE.BUTTON_PRIMARY + " mt-10 "}>
          Arsipkan Surat
        </Button>
      </Link>
      {/* <DataTable columns={columns} data={data!}></DataTable> */}
    </Sidebar>
  );
}
