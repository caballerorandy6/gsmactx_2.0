import { Metadata } from "next";
import SideBar from "@/components/ui/SideBar";

export const metadata: Metadata = {
  title: "GSM A/C General & Contractor Inc, Services Page",
  description: "Services offered by GSM A/C General & Contractor Inc.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="sm:flex">
      <div className="hidden sm:block fixed left-0 h-screen w-64">
        <SideBar />
      </div>
      <div className="flex-1 sm:ml-64 mx-auto">{children}</div>
    </section>
  );
}
