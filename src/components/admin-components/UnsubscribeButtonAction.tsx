"use client";

import { useTransition, useState } from "react";
import { toast } from "sonner";
import { unsubscribeFromCampaignAction } from "@/app/actions/campaignAction";
import Link from "next/link";

const UnsubscribeButtonAction = ({ token }: { token: string }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUnsubscribe = async () => {
    startTransition(async () => {
      toast.loading("Unsubscribing...");
      try {
        const result = await unsubscribeFromCampaignAction(token);
        toast.dismiss();

        if (result.success) {
          toast.success(result.message);
          setIsSuccess(true);
        } else {
          toast.error(`Failed to unsubscribe: ${result.message}`);
        }
      } catch {
        toast.dismiss();
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-green-400">
          Successfully Unsubscribed
        </h3>
        <p className="mt-2 text-gray-300">
          You will no longer receive emails from this campaign.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-xs ring-1 ring-inset ring-white/20 hover:bg-white/20 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

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
