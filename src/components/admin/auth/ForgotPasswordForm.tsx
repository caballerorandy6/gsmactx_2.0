"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { requestPasswordResetAction } from "@/app/actions/passwordResetAction";
import { EnvelopeIcon, ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-500/20 p-4">
                <CheckCircleIcon className="h-12 w-12 text-green-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">Check Your Email</h2>

            <p className="text-gray-400 mb-6">
              If an account exists with <strong className="text-white">{email}</strong>,
              you will receive a password reset link shortly.
            </p>

            <p className="text-sm text-gray-500 mb-6">
              The link will expire in 1 hour. Check your spam folder if you don&apos;t see it.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            Forgot Password?
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Enter your email and we&apos;ll send you a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg bg-gray-900 border border-white/10 text-white pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500"
                />
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordForm;
