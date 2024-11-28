import Sidebar from "@/components/Sidebar";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "react-query";
import axios from "axios";
import { ROUTES, ROUTES_CLIENT } from "@/types/routes";
import { Category } from "@/types/category";
import { DataTable } from "@/components/category/data-table";
import { columns } from "@/components/category/columns";
import { Button } from "@/components/ui/button";
import { STYLE } from "@/types/style";
import Loading from "@/components/Loading";

export const Route = createLazyFileRoute("/kategori")({
  component: Kategori,
});

function Kategori() {
  const { data, isLoading } = useQuery({
    queryKey: ["surat"],
    queryFn: async () => {
      const { data } = await axios.get(ROUTES.CATEGORY);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return data as Category[];
    },
  });
  if (isLoading) return <Loading></Loading>;
  if (data == undefined) return <div>Error loading data: </div>;
  return (
    <Sidebar>
      <h1 className="text-4xl">Kategori Surat</h1>
      {/* <div className="">{JSON.stringify(data)}</div> */}
      <p className="w-1/2 mt-2">
        Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat.
        Klik "Tambah" untuk menbambahkan kategori baru{" "}
      </p>
      <div className="mt-10">
        <DataTable columns={columns} data={data} />
      </div>

      <Link to={ROUTES_CLIENT.CATEGORY_CREATE}>
        <Button className={STYLE.BUTTON_PRIMARY + " mt-10 "}>
          Tambah Kategori
        </Button>
      </Link>
      {/* <DataTable columns={columns} data={data!}></DataTable> */}
    </Sidebar>
  );
}
