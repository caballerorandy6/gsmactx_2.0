"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CampaignSchema, CampaignFormData } from "@/libs/zod";
import { upsertCampaignAction } from "@/app/actions/campaignAction";
import { ErrorMessage } from "@hookform/error-message";

const AdminCampaignForm = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(CampaignSchema),
    defaultValues: {
      title: "",
      subject: "",
      content: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file, { shouldValidate: true });
    } else {
      setImagePreview(null);
      setValue("image", undefined, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: CampaignFormData) => {
    const formData = new FormData();

    // Append the image file if it exists
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    // Append the image URL if it exists
    else if (imagePreview && imagePreview.startsWith("http")) {
      formData.append("image", imagePreview);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    startTransition(async () => {
      try {
        const result = await upsertCampaignAction(formData);

        if (result.success) {
          toast.success(result.message);
          reset();
          setImagePreview(null);
        }
      } catch (error) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          return;
        }
        console.error("Campaign upsert error:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <section id="admin-form" className="bg-[rgba(10,15,26,0.50)]">
      {/* Main content */}

      <main className="py-20">
        <h1 className="text-4xl font-bold text-center">
          Welcome, {user?.name}!
        </h1>
        <div className="min-h-screen flex justify-center pt-20">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-8">
              Create Campaign
            </h2>

            {/* Title */}
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-semibold text-white"
                >
                  Title
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("title")}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm mt-1">{message}</p>
                    )}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm/6 font-semibold text-white"
                >
                  Subject
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("subject")}
                    id="subject"
                    name="subject"
                    type="subject"
                    autoComplete="current-subject"
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="subject"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm mt-1">{message}</p>
                    )}
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm/6 font-semibold text-white"
                >
                  Imagen
                </label>
                <div className="mt-2.5">
                  <input
                    id="image"
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/gif, image/avif"
                    // No usamos 'register' directamente para tener control sobre el onChange
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-400"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="image"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm mt-1">{message}</p>
                    )}
                  />
                </div>
                {imagePreview && (
                  <div className="mt-4 rounded-lg bg-[#0a0f1a] p-4 border border-white/10">
                    <p className="text-sm font-medium text-white mb-2">
                      Image Preview:
                    </p>
                    <Image
                      src={imagePreview}
                      alt="Image Preview"
                      width={200}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm/6 font-semibold text-white"
                >
                  Content
                </label>
                <div className="mt-2.5">
                  <textarea
                    {...register("content")}
                    id="content"
                    name="content"
                    rows={6}
                    autoComplete="current-content"
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="content"
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
                className="flex w-full justify-center rounded-md cursor-pointer bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                {isPending ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default AdminCampaignForm;
