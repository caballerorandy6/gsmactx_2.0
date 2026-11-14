"use client";

import { MenuItem } from "@headlessui/react";

const DeleteCampaignButton = ({ onSelect }: { onSelect: () => void }) => (
  <MenuItem>
    <button
      type="button"
      onClick={onSelect}
      className="block w-full cursor-pointer px-3 py-1 text-left text-sm/6 text-red-400 transition-colors hover:bg-red-500/10 data-focus:bg-white/10"
    >
      Delete
    </button>
  </MenuItem>
);

export default DeleteCampaignButton;
