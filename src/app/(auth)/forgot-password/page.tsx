import { Metadata } from "next";
import ForgotPasswordForm from "@/components/admin/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password - GSM A/C Admin",
  description: "Reset your admin password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
