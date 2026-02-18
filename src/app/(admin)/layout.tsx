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

      <div className="flex pt-16">
        <AdminSidebar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-6">{children}</div>
        </main>
      </div>

      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}
