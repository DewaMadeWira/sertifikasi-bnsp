import Sidebar from "@/components/Sidebar";
import { createLazyFileRoute } from "@tanstack/react-router";
import photo from "/public/foto.png";

export const Route = createLazyFileRoute("/kategori")({
  component: Kategori,
});

function Kategori() {
  return (
    <Sidebar>
      <h1 className="text-4xl">Kategori</h1>
    </Sidebar>
  );
}
