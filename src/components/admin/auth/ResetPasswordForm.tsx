"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  validateResetTokenAction,
  resetPasswordAction,
} from "@/app/actions/passwordResetAction";
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Loading state
  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Validating reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid/expired token
  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-500/20 p-4">
                <XCircleIcon className="h-12 w-12 text-red-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              Invalid or Expired Link
            </h2>

            <p className="text-gray-400 mb-6">
              This password reset link is invalid or has expired.
              Please request a new one.
            </p>

            <div className="space-y-3">
              <Link
                href="/forgot-password"
                className="block w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors text-center"
              >
                Request New Link
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-500/20 p-4">
                <CheckCircleIcon className="h-12 w-12 text-green-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              Password Reset Successfully
            </h2>

            <p className="text-gray-400 mb-6">
              Your password has been changed. You can now log in with your new password.
            </p>

            <button
              onClick={() => router.push("/login")}
              className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/logo-small.avif"
              alt="GSM A/C Logo"
              width={120}
              height={120}
              className="h-20 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Create a new password for <strong className="text-white">{email}</strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-lg bg-gray-900 border border-white/10 text-white pl-11 pr-11 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Min 8 characters, 1 uppercase, 1 number, 1 special character
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-lg bg-gray-900 border border-white/10 text-white pl-11 pr-11 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
