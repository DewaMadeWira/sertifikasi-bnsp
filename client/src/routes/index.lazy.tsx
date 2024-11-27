import { columns } from "@/components/letter/columns";
import { DataTable } from "@/components/letter/data-table";
import LetterTable from "@/components/letter/page";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Letter } from "@/types/letter";
import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useQuery } from "react-query";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { toast } = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["surat"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/api/letter");
      return data as Letter[];
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (data == undefined) return <div>Error loading data: </div>;

  console.log(data);
  return (
    <Sidebar>
      <h1 className="text-4xl">Arsip Surat</h1>
      {/* <div className="">{JSON.stringify(data)}</div> */}
      <DataTable columns={columns} data={data} />
      {/* <DataTable columns={columns} data={data!}></DataTable> */}
    </Sidebar>
  );
}
