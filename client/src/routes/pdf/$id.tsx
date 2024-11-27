import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { ROUTES } from "@/types/routes";

export const Route = createFileRoute("/pdf/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: pdfUrl,
    isLoading,
    error,
  } = useQuery(["pdf"], async () => {
    const response = await axios.get(ROUTES.ARSIP_PDF + id, {
      responseType: "blob", // Fetch as Blob
    });
    return URL.createObjectURL(response.data); // Convert Blob to URL
  });
  const { id } = Route.useParams();
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <iframe src={`${ROUTES.ARSIP_PDF}5`} width="100%" height="600px"></iframe> */}
      <embed src={pdfUrl} width="80%" height="400px" type="application/pdf" />
      {/* <Document
        // file=
        file={`${ROUTES.ARSIP_PDF}5`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
}
