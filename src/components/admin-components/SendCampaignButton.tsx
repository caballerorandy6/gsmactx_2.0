"use client";

import { useTransition } from "react";
import { MenuItem } from "@headlessui/react";
import { sendCampaignEmailAction } from "@/app/actions/sendCampaignEmailAction";
import { toast } from "sonner";
import { Link } from "node_modules/@react-email/components/dist";

const SendCampaignButton = ({ id }: { id: string }) => {
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
    <MenuItem as={Link} onClick={handleSend} disabled={isPending}>
      <span
        className={`flex w-full px-3 py-1 text-sm/6 data-[focus]:bg-white/10 transition-colors cursor-pointer text-green-500 hover:bg-green-500/10 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Send
      </span>
    </MenuItem>
  );
};

export default SendCampaignButton;
