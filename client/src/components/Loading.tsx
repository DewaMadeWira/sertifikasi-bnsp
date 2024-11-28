import React from "react";
import loading from "/loading.gif";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center font-outfit">
      <div className="flex items-center ">
        <img src={loading} alt="" width={100} />
        <p className="pt-10 text-2xl italic">Loading...</p>
      </div>
    </div>
  );
}
