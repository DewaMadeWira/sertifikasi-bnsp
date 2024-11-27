import { useQuery } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { Letter } from "@/types/letter";

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
    queryKey: ["surat"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/api/letter");
      return data as Letter[];
    },
  });

  return isLoading ? "Loading" : <DataTable columns={columns} data={data!} />;
}
