import Sidebar from "@/components/Sidebar";
import { createLazyFileRoute } from "@tanstack/react-router";
import photo from "/public/foto.png";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <Sidebar>
      <h1 className="text-4xl">About</h1>
      <div className="flex mt-10 gap-10">
        <img src={photo} width={200} alt="" />
        <div className="">
          <p className="font-bold  text-xl">Aplikasi ini dibuat oleh :</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <p>Nama </p>
              <p>Prodi </p>
              <p>NIM </p>
              <p>Tanggal </p>
            </div>
            <div className="">
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div className="">
              <p>Nama </p>
              <p>Prodi </p>
              <p>NIM </p>
              <p>Tanggal </p>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
