"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CampaignSchema, CampaignFormData } from "@/lib/validations/zod";
import { createAndSendTestCampaignAction } from "@/app/actions/createAndSendTestCampaignAction";
import { ErrorMessage } from "@hookform/error-message";
import { SafeAdmin } from "@/lib/types";
import { useRouter } from "next/navigation";
import CampaignEmailPreview from "./CampaignEmailPreview";

const TestCampaignForm = ({ user }: { user: SafeAdmin | null }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
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

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", undefined, { shouldValidate: true });
    // Reset file input
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: CampaignFormData) => {
    const confirmed = confirm(
      "Send test campaign to test emails?\n\nThis will send to:\n• caballerorandy7@gmail.com\n• gsmactx@outlook.com\n• michel@gsmactx.com\n• mchapelli305@gmail.com\n• mchapelli305@yahoo.com"
    );

    if (!confirmed) return;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subject", data.subject);
    formData.append("content", data.content);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    startTransition(async () => {
      try {
        toast.loading("Sending test campaign…");
        const result = await createAndSendTestCampaignAction(formData);

        toast.dismiss();
        if (result.success) {
          toast.success(result.message);
          reset();
          setImagePreview(null);
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.dismiss();
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <section
      id="test-campaign-form"
      className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 mt-10"
    >
      <main className="py-20">
        <h1 className="text-4xl font-bold text-center">
          Welcome, {user?.name}!
        </h1>
        <div className="min-h-screen flex justify-center pt-20">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6 flex flex-col items-center justify-center">
              <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-2">
                Test Campaign
              </h2>
              <p className="text-center text-sm text-purple-300">
                This will be sent immediately to:
              </p>
              <ul className="text-xs text-purple-200 mt-2 space-y-1">
                <li>• caballerorandy7@gmail.com</li>
                <li>• gsmactx@outlook.com</li>
                <li>• michel@gsmactx.com</li>
                <li>• mchapelli305@gmail.com</li>
                <li>• mchapelli305@yahoo.com</li>
              </ul>
            </div>

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
                    type="text"
                    autoComplete="off"
                    placeholder="e.g., Summer Promotion 2025"
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500"
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
                  Subject{" "}
                  <span className="text-gray-400 text-xs">
                    (what subscribers will see in their inbox)
                  </span>
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("subject")}
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    placeholder="e.g., 🔥 50% OFF on all our services!"
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500"
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
                  Image{" "}
                  <span className="text-gray-400 text-xs">
                    (optional - max. 5MB)
                  </span>
                </label>
                <div className="mt-2.5">
                  <input
                    id="image"
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/gif, image/avif"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-400"
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
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-white">
                        Image Preview:
                      </p>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
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

              {/* Content */}
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
                    maxLength={2000}
                    autoComplete="off"
                    placeholder="Write your email content here. You can include promotion details, important dates, etc."
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <ErrorMessage
                      errors={errors}
                      name="content"
                      render={({ message }) => (
                        <p className="text-red-500 text-sm">{message}</p>
                      )}
                    />
                    <p className="text-sm text-gray-400">
                      {watch("content")?.length || 0}/2000 characters
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-between">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                disabled={
                  !watch("title") || !watch("subject") || !watch("content")
                }
                className="flex justify-center rounded-md cursor-pointer bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                Preview Email
              </button>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex justify-center rounded-md cursor-pointer bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex justify-center rounded-md cursor-pointer bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
                >
                  {isPending ? "Sending…" : "Send Test Campaign"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Email Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Email Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <CampaignEmailPreview
                subject={watch("subject") || ""}
                title={watch("title") || ""}
                content={watch("content") || ""}
                imageUrl={imagePreview || undefined}
                recipientEmail="test@example.com"
                unsubscribeUrl="#"
              />
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestCampaignForm;
