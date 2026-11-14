import { Metadata } from "next";
import { Toaster } from "sonner";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <AdminHeader />

      <div className="flex pt-24 sm:pt-28 md:pt-32">
        <AdminSidebar />

        <main className="min-w-0 flex-1 px-3 sm:px-4 md:px-6 lg:px-8 pb-24 md:pb-4">
          <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-10">{children}</div>
        </main>
      </div>

      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}
