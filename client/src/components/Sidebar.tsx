import React from "react";
import { Link } from "@tanstack/react-router";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  //   const { toast } = useToast();
  return (
    <div className="h-screen w-full font-outfit flex">
      <aside className=" w-1/6 p-5 border-r-[1px] border-white h-screen">
        <h3 className="font-bold text-xl ">Menu</h3>
        <div className="flex flex-col gap-5 mt-10 text-lg">
          <Link
            to="/"
            className="[&.active]:font-bold hover:border-b-[1px] border-white pb-3"
          >
            Arsip
          </Link>
          <Link
            to="/kategori"
            className="[&.active]:font-bold hover:border-b-[1px] border-white pb-3"
          >
            Kategori
          </Link>
          <Link
            to="/about"
            className="[&.active]:font-bold hover:border-b-[1px] border-white pb-3"
          >
            About
          </Link>
        </div>
      </aside>
      <div className="w-full p-10">{children}</div>
    </div>
  );
}
