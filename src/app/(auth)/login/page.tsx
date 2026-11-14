import { Metadata } from "next";
import AdminLoginForm from "@/components/admin/layout/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login - GSM A/C",
  robots: { index: false, follow: false },
};

const LoginPage = () => {
  return <AdminLoginForm />;
};

export default LoginPage;
