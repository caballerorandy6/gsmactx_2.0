"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData, UserSchema } from "@/libs/zod";
import { ErrorMessage } from "@hookform/error-message";
import useSectionObserver from "@/hooks/useSectionObserver";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { saveEmailAction } from "@/app/actions/saveEmailAction";
import { sendEmailContactAction } from "@/app/actions/sendEmailContactAction";

export default function Contact() {
  const ref = useSectionObserver({ sectionName: "Contact" });
  const [isPending, startTransition] = useTransition();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      subscribe: true,
    },
  });

  const onSubmit = (data: UserFormData) => {
    // startTransition envuelve toda la lógica asíncrona
    startTransition(async () => {
      try {
        // Llama a las acciones del servidor una por una
        if (data.subscribe) {
          await saveEmailAction(data);
        }
        await sendEmailContactAction(data);

        // Si todo va bien, muestra un mensaje de éxito y resetea el formulario
        toast.success("Message sent successfully!");
        reset();
      } catch (error) {
        // Si alguna de las acciones falla, el catch lo capturará
        toast.error(
          "An unexpected error occurred. Please try again."
        );
      }
    });
  };

  return (
    <section id="contact" ref={ref} className="relative isolate bg-gray-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <svg className="absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-700">
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-gray-800/20"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
              <div className="absolute top-[calc(100%-13rem)] -left-56 transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]">
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)",
                  }}
                  className="aspect-1155/678 w-[72.1875rem] bg-linear-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                />
              </div>
            </div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
            >
              Get in touch
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base/7 text-gray-300"
            >
              Call now to schedule an appointment. At GSM A/C & General
              Contractor INC., we take pride in offering quality HVAC services
              suitable for residential and commercial projects. We can install
              and repair a wide variety of AC, HVAC, and heating units. We can
              also clean air ducts and insulate attics. Quality assistance is a
              phone call away!
            </motion.p>
            <motion.div
              variants={staggerContainer}
              className="mt-10 space-y-4 text-base/7 text-gray-300"
            >
              <motion.div variants={itemVariant} className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon className="h-7 w-6 text-gray-400" />
                </div>
                <div>
                  GSM A/C & General Contractor INC.
                  <br />
                  Cypress, TX 77433
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon className="h-7 w-6 text-gray-400" />
                </div>
                <div>
                  <Link
                    href="tel:+1 (281) 235-4684"
                    className="hover:text-white transition-colors"
                  >
                    +1 (281) 235-4684
                  </Link>
                </div>
              </motion.div>
              <motion.div variants={itemVariant} className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon className="h-7 w-6 text-gray-400" />
                </div>
                <div>
                  <Link
                    href="mailto:contactus@gsmactx.com"
                    className="hover:text-white transition-colors"
                  >
                    contactus@gsmactx.com
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm/6 font-semibold text-white"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("firstName")}
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="firstName"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm mt-1">{message}</p>
                    )}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm/6 font-semibold text-white"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("lastName")}
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="lastName"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm mt-1">{message}</p>
                    )}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm/6 font-semibold text-white"
                >
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("phone")}
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="phone"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm mt-1">{message}</p>
                    )}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-white"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    {...register("message")}
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    defaultValue={""}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-6 flex items-center gap-x-3"
            >
              <input
                {...register("subscribe")}
                id="subscribe"
                name="subscribe"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="subscribe"
                className="text-sm/6 font-semibold text-white"
              >
                Subscribe to our newsletter
              </label>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-md cursor-pointer bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Sending..." : "Send Message"}
              </button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
