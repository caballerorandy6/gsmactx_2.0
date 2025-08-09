"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { unsubscribeFromCampaignAction } from "@/app/actions/campaignAction";

const UnsubscribeButtonAction = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUnsubscribe = async () => {
    startTransition(async () => {
      toast.loading("Unsubscribing...");
      try {
        const result = await unsubscribeFromCampaignAction(email);
        toast.dismiss();

        if (result.success) {
          toast.success(result.message);
          router.push("/");
        } else {
          toast.error(`Failed to unsubscribe: ${result.message}`);
        }
      } catch (error) {
        toast.dismiss();
        console.error("Error during unsubscribe action:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <button
      onClick={handleUnsubscribe}
      disabled={isPending}
      className="bg-red-600 font-semibold text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed"
    >
      {isPending ? "Unsubscribing..." : "Unsubscribe"}
    </button>
  );
};

export default UnsubscribeButtonAction;
