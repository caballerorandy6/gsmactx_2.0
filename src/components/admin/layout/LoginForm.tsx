"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";
import { AdminFormData, AdminSchema } from "@/lib/validations/zod";
import { loginAction } from "@/app/actions/loginAction";

import ButtonSpinner from "@/components/ui/ButtonSpinner";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import AuthShell, {
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
  authSecondaryLinkClass,
} from "@/components/auth/AuthShell";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormData>({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 1. Manejo del envío del formulario
  const onSubmit = async (data: AdminFormData) => {
    startTransition(async () => {
      try {
        const result = await loginAction(data);

        if (result.message) {
          toast.error(result.message);
          reset();
        }
      } catch (error) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          return;
        }
        toast.error("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <AuthShell>
      <h1 className="text-2xl font-bold tracking-tight text-balance text-white text-center mb-8">
        Admin Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="email" className={authLabelClass}>
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck="false"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`mt-2.5 ${authInputClass}`}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p id="email-error" className="text-red-400 text-sm mt-2">
                  {message}
                </p>
              )}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className={authLabelClass}>
                Password
              </label>
              <Link
                href="/forgot-password"
                className="rounded-sm text-sm text-primary-400 hover:text-primary-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors motion-reduce:transition-none"
              >
                Forgot password?
              </Link>
            </div>
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`mt-2.5 ${authInputClass}`}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p id="password-error" className="text-red-400 text-sm mt-2">
                  {message}
                </p>
              )}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={`mt-8 ${authPrimaryButtonClass}`}
        >
          {isPending ? <ButtonSpinner label="Logging in" /> : "Log in"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <Link href="/" className={authSecondaryLinkClass}>
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          Back to Home
        </Link>
      </div>
    </AuthShell>
  );
};

export default LoginForm;
