"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  validateResetTokenAction,
  resetPasswordAction,
} from "@/app/actions/passwordResetAction";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import AuthShell, {
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
  authSecondaryLinkClass,
} from "@/components/auth/AuthShell";
import ButtonSpinner from "@/components/ui/ButtonSpinner";
import { Skeleton } from "@/components/ui/Skeleton";

const BackToLogin = () => (
  <div className="mt-6 text-center">
    <Link href="/login" className={authSecondaryLinkClass}>
      <ArrowLeftIcon aria-hidden="true" className="size-4" />
      Back to Login
    </Link>
  </div>
);

export const ResetPasswordLoading = () => (
  <AuthShell>
    <div role="status">
      <span className="sr-only">Checking your reset link…</span>
      <Skeleton className="h-8 w-48 mx-auto mb-2" />
      <Skeleton className="h-4 w-64 mx-auto mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-11 w-full rounded-md" />
        <Skeleton className="h-11 w-full rounded-md" />
        <Skeleton className="h-11 w-full rounded-md" />
      </div>
    </div>
  </AuthShell>
);

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  minLength?: number;
};

const PasswordField = ({ id, label, value, onChange, hint, minLength }: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label htmlFor={id} className={authLabelClass}>
        {label}
      </label>
      <div className="relative mt-2.5">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          minLength={minLength}
          autoComplete="new-password"
          aria-describedby={hintId}
          className={`${authInputClass} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500 cursor-pointer"
        >
          {visible ? (
            <EyeSlashIcon aria-hidden="true" className="size-5" />
          ) : (
            <EyeIcon aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>
      {hint && (
        <p id={hintId} className="text-sm text-gray-400 mt-2">
          {hint}
        </p>
      )}
    </div>
  );
};

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
      return;
    }

    const validateToken = async () => {
      const result = await validateResetTokenAction(token);
      setIsValidToken(result.valid);
      if (result.email) {
        setEmail(result.email);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    startTransition(async () => {
      const result = await resetPasswordAction(token, {
        password,
        confirmPassword,
      });

      if (result.success) {
        setSuccess(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  if (isValidToken === null) {
    return <ResetPasswordLoading />;
  }

  if (!isValidToken) {
    return (
      <AuthShell>
        <div className="text-center">
          <XCircleIcon aria-hidden="true" className="mx-auto mb-4 size-10 text-red-400" />
          <h1 className="text-2xl font-bold tracking-tight text-balance text-white mb-3">
            This link is invalid or has expired
          </h1>
          <p className="text-gray-300 mb-6">
            Reset links work once and expire after 1 hour. Request a new one to
            continue.
          </p>
          <Link href="/forgot-password" className={authPrimaryButtonClass}>
            Request a new link
          </Link>
        </div>
        <BackToLogin />
      </AuthShell>
    );
  }

  if (success) {
    return (
      <AuthShell>
        <div className="text-center" role="status">
          <CheckCircleIcon aria-hidden="true" className="mx-auto mb-4 size-10 text-green-400" />
          <h1 className="text-2xl font-bold tracking-tight text-balance text-white mb-3">
            Password updated
          </h1>
          <p className="text-gray-300 mb-6">
            You can now log in with your new password.
          </p>
          <Link href="/login" className={authPrimaryButtonClass}>
            Go to Login
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-bold tracking-tight text-balance text-white text-center mb-2">
        Choose a new password
      </h1>
      <p className="text-gray-400 text-center mb-8">
        For <strong className="font-semibold text-white break-all">{email}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordField
          id="password"
          label="New password"
          value={password}
          onChange={setPassword}
          minLength={8}
          hint="At least 8 characters, with 1 uppercase letter, 1 number and 1 symbol."
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <button type="submit" disabled={isPending} className={authPrimaryButtonClass}>
          {isPending ? <ButtonSpinner label="Saving" /> : "Save new password"}
        </button>
      </form>

      <BackToLogin />
    </AuthShell>
  );
};

export default ResetPasswordForm;
