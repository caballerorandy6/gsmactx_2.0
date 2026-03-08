import { Metadata } from "next";
import SideBar from "@/components/ui/SideBar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingCTAButtons from "@/components/ui/FloatingCTAButtons";

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
      <ScrollToTop />
      <FloatingCTAButtons />
      <div className="hidden sm:block fixed left-0 h-screen w-56 md:w-60 lg:w-64">
        <SideBar />
      </div>
      <div className="flex-1 sm:ml-56 md:ml-60 lg:ml-64 mx-auto">{children}</div>
    </section>
  );
}
