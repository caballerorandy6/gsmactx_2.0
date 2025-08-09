"use client";

import { useTransition } from "react";
import { MenuItem } from "@headlessui/react";
import { sendCampaignEmailAction } from "@/app/actions/campaignAction";
import { toast } from "sonner";

const AdminSendCampaignButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleSend = async () => {
    try {
      startTransition(async () => {
        toast.loading("Sending campaign...");
        const result = await sendCampaignEmailAction({ id });
        if (result.success) {
          toast.dismiss();
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    } catch (error) {
      console.error("Error sending campaign:", error);
      toast.error("Failed to send campaign.");
    }
  };

  return (
    <MenuItem as="button" onClick={handleSend} disabled={isPending}>
      <span
        className={`block w-full text-left px-3 py-1 text-sm/6 text-green-500 data-[focus]:bg-white/10 cursor-pointer transition-colors ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Send
      </span>
    </MenuItem>
  );
};

export default AdminSendCampaignButton;
