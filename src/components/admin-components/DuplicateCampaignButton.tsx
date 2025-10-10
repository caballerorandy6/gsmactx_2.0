"use client";

import { duplicateCampaignAction } from "@/app/actions/campaignAction";
import { MenuItem } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const AdminDuplicateCampaignButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDuplicate = () => {
    startTransition(async () => {
      toast.loading("Duplicating campaign...");
      const result = await duplicateCampaignAction(id);
      toast.dismiss();

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <MenuItem>
      <button
        onClick={handleDuplicate}
        disabled={isPending}
        className="block px-3 py-1 text-sm/6 text-white hover:bg-gray-700 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Duplicating..." : "Duplicate"}
      </button>
    </MenuItem>
  );
};

export default AdminDuplicateCampaignButton;
