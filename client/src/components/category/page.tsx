import { useQuery } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { Letter } from "@/types/letter";
import { ROUTES } from "@/types/routes";

// async function getData(): Promise<Letter[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

export default async function LetterTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["kategori_tabel"],
    queryFn: async () => {
      const { data } = await axios.get(ROUTES.CATEGORY);
      return data as Letter[];
    },
  });

  return isLoading ? "Loading" : <DataTable columns={columns} data={data!} />;
}
