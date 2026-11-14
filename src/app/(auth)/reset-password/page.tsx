import { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm, {
  ResetPasswordLoading,
} from "@/components/admin/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password - GSM A/C Admin",
  description: "Create a new password for your admin account",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
