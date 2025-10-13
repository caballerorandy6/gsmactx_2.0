"use client";

import { MenuItem } from "@headlessui/react";
import { sendTestCampaignAction } from "@/app/actions/sendTestCampaignAction";
import { toast } from "sonner";

interface AdminSendTestCampaignButtonProps {
  id: string;
}

const AdminSendTestCampaignButton = ({
  id,
}: AdminSendTestCampaignButtonProps) => {
  const handleSendTestCampaign = async () => {
  const confirmed = confirm(
    "Send test campaign to test emails?\n\nThis will send to:\n• caballerorandy7@gmail.com\n• gsmactx@outlook.com\n• michel@gsmactx.com\n• mchapelli305@gmail.com\n• mchapelli305@yahoo.com"
  );

    if (!confirmed) return;

    try {
      toast.loading("Sending test campaign...");
      const result = await sendTestCampaignAction({ id });
      toast.dismiss();

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error sending test campaign:", error);
      toast.error("Failed to send test campaign");
    }
  };

  return (
    <MenuItem>
      <button
        onClick={handleSendTestCampaign}
        className="block w-full text-left px-3 py-1 text-sm/6 text-white hover:bg-gray-700 cursor-pointer"
      >
        Send Test
      </button>
    </MenuItem>
  );
};

export default AdminSendTestCampaignButton;
