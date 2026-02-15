"use client";

import Link from "next/link";
import { MenuItem } from "@headlessui/react";

const EditCampaignButton = ({ id }: { id: string }) => {
  return (
    <MenuItem as={Link} href={`/edit-campaign/${id}`}>
      <span className="block px-3 py-1 text-sm/6 text-gray-300 data-[focus]:bg-white/10 transition-colors cursor-pointer hover:bg-white/10">
        Edit
      </span>
    </MenuItem>
  );
};

export default EditCampaignButton;
