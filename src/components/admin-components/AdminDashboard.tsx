import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Welcome to the GSM A/C General & Contractor Inc Admin Dashboard",
};

export default function AdminDashboard({ user }) {
  return (
    <section id="admin-dashboard" className="bg-[rgba(10,15,26,0.50)]">
      {/* Main content */}

      <main className="pt-20">
        <h1 className="text-4xl font-bold text-center">
          Welcome, {user?.name}!
        </h1>
        {/* Aquí va el contenido principal del dashboard */}
      </main>
    </section>
  );
}
