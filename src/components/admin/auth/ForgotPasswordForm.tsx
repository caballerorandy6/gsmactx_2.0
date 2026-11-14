"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { requestPasswordResetAction } from "@/app/actions/passwordResetAction";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import AuthShell, {
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
  authSecondaryLinkClass,
} from "@/components/auth/AuthShell";
import ButtonSpinner from "@/components/ui/ButtonSpinner";

const BackToLogin = () => (
  <div className="mt-6 text-center">
    <Link href="/login" className={authSecondaryLinkClass}>
      <ArrowLeftIcon aria-hidden="true" className="size-4" />
      Back to Login
    </Link>
  </div>
);

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    startTransition(async () => {
      const result = await requestPasswordResetAction(email.trim());

      if (result.success) {
        setSubmitted(true);
      } else {
        toast.error(result.message);
      }
    });
  };

  if (submitted) {
    return (
      <AuthShell>
        <div className="text-center" role="status">
          <CheckCircleIcon
            aria-hidden="true"
            className="mx-auto mb-4 size-10 text-green-400"
          />
          <h1 className="text-2xl font-bold tracking-tight text-balance text-white mb-3">
            Check your email
          </h1>
          <p className="text-gray-300 mb-4">
            If an account exists for{" "}
            <strong className="font-semibold text-white break-all">{email}</strong>,
            a password reset link is on its way.
          </p>
          <p className="text-sm text-gray-400">
            The link expires in 1 hour. Check your spam folder if you don&apos;t
            see it.
          </p>
        </div>
        <BackToLogin />
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-bold tracking-tight text-balance text-white text-center mb-2">
        Forgot your password?
      </h1>
      <p className="text-gray-400 text-center mb-8">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className={authLabelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            spellCheck="false"
            className={`mt-2.5 ${authInputClass}`}
          />
        </div>

        <button type="submit" disabled={isPending} className={authPrimaryButtonClass}>
          {isPending ? <ButtonSpinner /> : "Send reset link"}
        </button>
      </form>

      <BackToLogin />
    </AuthShell>
  );
};

export default ForgotPasswordForm;
