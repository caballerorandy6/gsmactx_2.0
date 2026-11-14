import { Metadata } from "next";
import Header from "@/components/layout/Header";
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
      <Header />
      <FloatingCTAButtons />
      <SideBar />
      <div className="flex-1 sm:ml-56 md:ml-60 lg:ml-64 mx-auto">{children}</div>
    </section>
  );
}
