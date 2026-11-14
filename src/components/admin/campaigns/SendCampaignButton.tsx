"use client";

import { MenuItem } from "@headlessui/react";

const SendCampaignButton = ({ onSelect }: { onSelect: () => void }) => (
  <MenuItem>
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full cursor-pointer px-3 py-1 text-sm/6 text-green-500 transition-colors hover:bg-green-500/10 data-focus:bg-white/10"
    >
      Send
    </button>
  </MenuItem>
);

export default SendCampaignButton;
