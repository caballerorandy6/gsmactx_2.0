import { Metadata } from "next";
import { Toaster } from "sonner";
import AdminHeader from "@/components/admin/layout/AdminHeader";

export const metadata: Metadata = {
  title: {
    template: "%s | GSM A/C General & Contractor Inc",
    default: "Administration Panel",
  },
  description: "GSM A/C General & Contractor Inc Administration Panel",
};

/**
 * @param {React.ReactNode} children
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white">
      <AdminHeader />

      <main className="relative pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-6">{children}</div>
      </main>

      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}
