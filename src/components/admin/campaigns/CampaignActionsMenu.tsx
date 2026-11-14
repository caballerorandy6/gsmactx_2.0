"use client";

import { useState, useTransition } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { toast } from "sonner";
import {
  deleteCampaignAction,
  getCampaignByIdAction,
} from "@/app/actions/campaignAction";
import { createAndSendTestCampaignAction } from "@/app/actions/createAndSendTestCampaignAction";
import { initializeCampaignEmailLogsAction } from "@/app/actions/sendCampaignEmailAction";
import ConfirmDialog from "@/components/admin/common/ConfirmDialog";
import DeleteCampaignButton from "./DeleteCampaignButton";
import SendCampaignButton from "./SendCampaignButton";
import SendTestCampaignButton from "./SendTestCampaignButton";
import TestRecipientList from "./TestRecipientList";
import EditCampaignButton from "./EditCampaignButton";
import DuplicateCampaignButton from "./DuplicateCampaignButton";

type PendingConfirm = "test" | "send" | "delete" | null;

const CampaignActionsMenu = ({ id, title }: { id: string; title: string }) => {
  const [confirming, setConfirming] = useState<PendingConfirm>(null);
  const [isPending, startTransition] = useTransition();

  const runTest = () => {
    startTransition(async () => {
      const toastId = toast.loading("Sending test…");
      try {
        const campaign = await getCampaignByIdAction(id);
        if (!campaign) throw new Error("Campaign not found");

        const formData = new FormData();
        formData.append("title", campaign.title);
        formData.append("subject", campaign.subject);
        formData.append("content", campaign.content);

        if (campaign.imageUrl) {
          const imageBlob = await (await fetch(campaign.imageUrl)).blob();
          const imageName = campaign.imageUrl.split("/").pop() || "image.jpg";
          formData.append(
            "image",
            new File([imageBlob], imageName, { type: imageBlob.type })
          );
        }

        const result = await createAndSendTestCampaignAction(formData);
        if (result.success) {
          toast.success(result.message, { id: toastId });
          setConfirming(null);
        } else {
          toast.error(result.message, { id: toastId });
        }
      } catch {
        toast.error("Couldn't send the test. Try again.", { id: toastId });
      }
    });
  };

  const runSend = () => {
    startTransition(async () => {
      const toastId = toast.loading("Queuing campaign…");
      try {
        const result = await initializeCampaignEmailLogsAction(id);
        if (result.success) {
          toast.success(result.message, { id: toastId });
          setConfirming(null);
        } else {
          toast.error(result.message, { id: toastId });
        }
      } catch {
        toast.error("Couldn't queue the campaign. Try again.", { id: toastId });
      }
    });
  };

  const runDelete = () => {
    startTransition(async () => {
      const toastId = toast.loading("Deleting campaign…");
      try {
        const result = await deleteCampaignAction(id);
        if (result.success) {
          toast.success(result.message, { id: toastId });
          setConfirming(null);
        } else {
          toast.error(`Couldn't delete the campaign: ${result.message}`, {
            id: toastId,
          });
        }
      } catch {
        toast.error("Couldn't delete the campaign. Try again.", {
          id: toastId,
        });
      }
    });
  };

  return (
    <>
      <Menu as="div" className="relative flex-none">
        <MenuButton
          aria-label={`Options for ${title}`}
          className="relative block cursor-pointer rounded text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
        >
          <span className="absolute -inset-2.5" />
          <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg ring-1 ring-white/10 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <SendTestCampaignButton onSelect={() => setConfirming("test")} />
          <SendCampaignButton onSelect={() => setConfirming("send")} />
          <EditCampaignButton id={id} />
          <DuplicateCampaignButton id={id} />
          <DeleteCampaignButton onSelect={() => setConfirming("delete")} />
        </MenuItems>
      </Menu>

      <ConfirmDialog
        open={confirming === "test"}
        onClose={() => setConfirming(null)}
        onConfirm={runTest}
        tone="primary"
        title="Send a test of this campaign?"
        description={
          <>
            <strong className="font-semibold text-white">{title}</strong> goes
            out right away, marked [TEST], to:
            <TestRecipientList />
          </>
        }
        confirmLabel="Send test"
        pendingLabel="Sending…"
        isPending={isPending}
      />

      <ConfirmDialog
        open={confirming === "send"}
        onClose={() => setConfirming(null)}
        onConfirm={runSend}
        tone="primary"
        title="Send this campaign to all subscribers?"
        description={
          <>
            <strong className="font-semibold text-white">{title}</strong> will
            be queued for every subscriber. Emails go out in daily batches of
            up to 100 and can&apos;t be recalled once sent.
          </>
        }
        confirmLabel="Send campaign"
        pendingLabel="Queuing…"
        isPending={isPending}
      />

      <ConfirmDialog
        open={confirming === "delete"}
        onClose={() => setConfirming(null)}
        onConfirm={runDelete}
        title="Delete this campaign?"
        description={
          <>
            <strong className="font-semibold text-white">{title}</strong> will
            be permanently deleted. This can&apos;t be undone.
          </>
        }
        confirmLabel="Delete campaign"
        pendingLabel="Deleting…"
        isPending={isPending}
      />
    </>
  );
};

export default CampaignActionsMenu;
