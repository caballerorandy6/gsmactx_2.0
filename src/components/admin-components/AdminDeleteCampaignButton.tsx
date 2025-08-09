"use client";

import { useTransition } from "react";
import { deleteCampaignAction } from "@/app/actions/campaignAction";
import { MenuItem } from "@headlessui/react";
import { toast } from "sonner";

const AdminDeleteCampaignButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        toast.loading("Deleting campaign...");
        const result = await deleteCampaignAction(id);
        if (result.success) {
          toast.dismiss();
          toast.success(result.message);
        } else {
          toast.error("Failed to delete campaign: " + result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          "An unexpected error occurred while deleting the campaign."
        );
      }
    });
  };

  return (
    <MenuItem as="button" onClick={handleDelete} disabled={isPending}>
      <span
        className={`block w-full text-left px-3 py-1 text-sm/6 text-red-400 data-[focus]:bg-white/10 cursor-pointer transition-colors ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Delete
      </span>
    </MenuItem>
  );
};

export default AdminDeleteCampaignButton;
