"use client";

import Image from "next/image";
import { unsubscribeFromCampaignAction } from "@/app/actions/campaignAction";
import { useTransition } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const UnsubscribePage = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleUnsubscribe = () => {
    startTransition(() => {
      try {
        toast.loading("Unsubscribing...");
        unsubscribeFromCampaignAction(email)
          .then((result) => {
            if (result.success) {
              toast.dismiss();
              toast.success(result.message);
              redirect("/"); // Redirect to home or a confirmation page after successful unsubscribe
            } else {
              toast.error("Failed to unsubscribe: " + result.message);
            }
          })
          .catch((error) => {
            console.error("Error during unsubscribe action:", error);
            toast.error("An error occurred while trying to unsubscribe.");
          });
      } catch (error) {
        console.error("Error during unsubscribe action:", error);
        toast.error("An error occurred while trying to unsubscribe.");
      }
    });
  };

  return (
    <section
      id="unsubscribe"
      className="min-h-screen flex items-center justify-center px-4 flex-col text-center "
    >
      <Image
        src="/logo.avif"
        alt="Unsubscribe"
        className="mb-4 w-40 h-40 rounded-full object-contain"
        width={500}
        height={500}
      />
      <h2 className="text-center text-xl font-mono tracking-tight text-white mb-8">
        If you no longer wish to receive our newsletter, you can unsubscribe at
        any time by clicking the link below.
      </h2>
      <button
        onClick={handleUnsubscribe}
        className="bg-red-600 font-semibold text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
      >
        {isPending ? "Unsubscribing..." : "Unsubscribe"}
      </button>
    </section>
  );
};

export default UnsubscribePage;
