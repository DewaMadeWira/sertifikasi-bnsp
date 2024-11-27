import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { toast } = useToast();
  return (
    <Sidebar>
      <h1 className="text-4xl">Arsip Surat</h1>
    </Sidebar>
  );
}
