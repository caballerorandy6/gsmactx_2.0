"use client";

import { MenuItem } from "@headlessui/react";
import { createAndSendTestCampaignAction } from "@/app/actions/createAndSendTestCampaignAction";
import { toast } from "sonner";

interface AdminSendTestCampaignButtonProps {
  id: string;
}

const AdminSendTestCampaignButton = ({
  id,
}: AdminSendTestCampaignButtonProps) => {
  const handleSendTestCampaign = async () => {
    const confirmed = confirm(
      "Send test campaign to test emails?\n\nThis will send to:\n• caballerorandy7@gmail.com\n• gsmactx@outlook.com\n• michel@gsmactx.com\n• ***REMOVED***\n• ***REMOVED***"
    );

    if (!confirmed) return;

    try {
      toast.loading("Fetching campaign data...");

      // Fetch campaign data
      const response = await fetch(`/api/campaigns/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch campaign");
      }

      const campaign = await response.json();

      // Create FormData from campaign
      const formData = new FormData();
      formData.append("title", campaign.title);
      formData.append("subject", campaign.subject);
      formData.append("content", campaign.content);

      // If there's an image URL, we need to fetch it and convert to File
      if (campaign.imageUrl) {
        const imageResponse = await fetch(campaign.imageUrl);
        const imageBlob = await imageResponse.blob();
        const imageName = campaign.imageUrl.split('/').pop() || 'image.jpg';
        const imageFile = new File([imageBlob], imageName, { type: imageBlob.type });
        formData.append("image", imageFile);
      }

      toast.dismiss();
      toast.loading("Sending test campaign...");

      const result = await createAndSendTestCampaignAction(formData);
      toast.dismiss();

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss();
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
