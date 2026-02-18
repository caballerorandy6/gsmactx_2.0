"use client";

import { useTransition } from "react";
import { MenuItem } from "@headlessui/react";
import { initializeCampaignEmailLogsAction } from "@/app/actions/sendCampaignEmailAction";
import { toast } from "sonner";

const SendCampaignButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleSend = async () => {
    try {
      startTransition(async () => {
        toast.loading("Initializing campaign…");
        const result = await initializeCampaignEmailLogsAction(id);
        if (result.success) {
          toast.dismiss();
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    } catch {
      toast.error("Failed to initialize campaign.");
    }
  };

  return (
    <MenuItem>
      <button
        onClick={handleSend}
        disabled={isPending}
        className={`flex w-full px-3 py-1 text-sm/6 data-focus:bg-white/10 transition-colors cursor-pointer text-green-500 hover:bg-green-500/10 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Send
      </button>
    </MenuItem>
  );
};

export default SendCampaignButton;
