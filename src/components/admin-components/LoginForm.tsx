"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";
import { AdminFormData, AdminSchema } from "@/libs/zod";
import { loginAction } from "@/app/actions/loginAction";

import ButtonSpinner from "@/components/ButtonSpinner";

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
    // 1. Contenedor principal para centrar todo en la pantalla
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-8">
          Admin Login
        </h2>

        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-white"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-semibold text-white"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="flex w-28 justify-center rounded-md cursor-pointer bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {isPending ? <ButtonSpinner /> : "Log in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
