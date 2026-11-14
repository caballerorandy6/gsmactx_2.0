"use client";

import { MenuItem } from "@headlessui/react";

const SendTestCampaignButton = ({ onSelect }: { onSelect: () => void }) => (
  <MenuItem>
    <button
      type="button"
      onClick={onSelect}
      className="block w-full cursor-pointer px-3 py-1 text-left text-sm/6 text-white transition-colors hover:bg-gray-700 data-focus:bg-white/10"
    >
      Send test
    </button>
  </MenuItem>
);

export default SendTestCampaignButton;
