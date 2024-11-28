import { columns } from "@/components/letter/columns";
import { DataTable } from "@/components/letter/data-table";
import Loading from "@/components/Loading";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Letter } from "@/types/letter";
import { ROUTES } from "@/types/routes";
import { STYLE } from "@/types/style";
import { createFileRoute, Link } from "@tanstack/react-router";
import axios from "axios";
import { useQuery } from "react-query";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["surat"],
    queryFn: async () => {
      const { data } = await axios.get(ROUTES.ARSIP);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return data as Letter[];
    },
  });
  if (isLoading) return <Loading></Loading>;
  if (data == undefined) return <div>Error loading data: </div>;

  console.log(data);
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
