"use client";

import { useTransition } from "react";
import { subscribeToCampaignAction } from "@/app/actions/campaignAction";
import { toast } from "sonner";

const SubscribeToCampaign = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = async (email: string) => {
    startTransition(async () => {
      toast.loading("Subscribing...");
      try {
        const result = await subscribeToCampaignAction(email);
        toast.dismiss();

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(`Failed to subscribe: ${result.message}`);
        }
      } catch (error) {
        toast.dismiss();
        console.error("Error during subscribe action:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <button
      onClick={() => handleSubscribe(email)}
      disabled={isPending}
      className="bg-red-600 font-semibold text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed"
    >
      {isPending ? "Subscribing..." : "Subscribe"}
    </button>
  );
};

export default SubscribeToCampaign;
