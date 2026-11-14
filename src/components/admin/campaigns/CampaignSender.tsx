"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  initializeCampaignEmailLogsAction,
  sendCampaignBatchAction,
  getCampaignStatsAction,
  retryFailedEmailsAction,
} from "@/app/actions/sendCampaignEmailAction";
import {
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface CampaignSenderProps {
  campaignId: string;
  campaignTitle: string;
}

interface CampaignStats {
  total: number;
  sent: number;
  failed: number;
  pending: number;
  emailsSentToday: number;
  remainingQuota: number;
}

export default function CampaignSender({
  campaignId,
  campaignTitle,
}: CampaignSenderProps) {
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load stats on mount and after operations
  const loadStats = async () => {
    try {
      const data = await getCampaignStatsAction(campaignId);
      setStats(data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();

    // Auto-refresh stats every 15 seconds if campaign is not complete
    const interval = setInterval(() => {
      if (stats && stats.pending > 0) {
        loadStats();
      }
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId, stats?.pending]);

  const handleInitialize = async () => {
    const confirmed = confirm(
      `Initialize campaign "${campaignTitle}"?\n\nThis will prepare ${stats?.total || "all"} email(s) for sending. This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsInitializing(true);
    try {
      const result = await initializeCampaignEmailLogsAction(campaignId);
      if (result.success) {
        toast.success(result.message);
        await loadStats();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to initialize campaign");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSendBatch = async () => {
    setIsSending(true);
    try {
      const result = await sendCampaignBatchAction(campaignId);
      if (result.success) {
        toast.success(result.message);
        await loadStats();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to send batch");
    } finally {
      setIsSending(false);
    }
  };

  const handleRetryFailed = async () => {
    setIsRetrying(true);
    try {
      const result = await retryFailedEmailsAction(campaignId);
      if (result.success) {
        toast.success(result.message);
        await loadStats();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to retry emails");
    } finally {
      setIsRetrying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  const isInitialized = stats && stats.total > 0;
  const isComplete = stats && stats.pending === 0 && stats.total > 0;
  const progress = stats && stats.total > 0 ? (stats.sent / stats.total) * 100 : 0;

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          Campaign: {campaignTitle}
        </h3>
        <p className="text-sm text-gray-400">
          Send emails in batches to respect Resend&apos;s daily limit
        </p>
      </div>

      {/* Stats Grid */}
      {isInitialized && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <EnvelopeIcon className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-400">Sent</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{stats.sent}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircleIcon className="h-5 w-5 text-red-400" />
              <span className="text-sm text-gray-400">Failed</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{stats.failed}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon className="h-5 w-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Pending</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isInitialized && stats && (
        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary-500 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Daily Quota Info */}
      {stats && (
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
          <h4 className="text-sm font-semibold text-white mb-2">
            Today&apos;s Quota
          </h4>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              {stats.emailsSentToday} / 100 emails sent today
            </span>
            <span
              className={`text-sm font-bold ${
                stats.remainingQuota > 20
                  ? "text-green-400"
                  : stats.remainingQuota > 0
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {stats.remainingQuota} remaining
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                stats.remainingQuota > 20
                  ? "bg-green-500"
                  : stats.remainingQuota > 0
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${(stats.emailsSentToday / 100) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {!isInitialized ? (
          <button
            onClick={handleInitialize}
            disabled={isInitializing}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isInitializing ? "Initializing…" : "Initialize Campaign"}
          </button>
        ) : isComplete ? (
          <div className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-center">
            ✓ Campaign Completed!
          </div>
        ) : (
          <>
            <button
              onClick={handleSendBatch}
              disabled={isSending || stats?.remainingQuota === 0}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <EnvelopeIcon className="h-5 w-5" />
              {isSending ? "Sending…" : "Send Next Batch"}
            </button>

            {stats && stats.failed > 0 && (
              <button
                onClick={handleRetryFailed}
                disabled={isRetrying}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ArrowPathIcon className="h-5 w-5" />
                {isRetrying ? "Retrying…" : `Retry ${stats.failed} Failed`}
              </button>
            )}
          </>
        )}
      </div>

      {/* Info Messages */}
      {!isInitialized && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm text-blue-300">
            💡 <strong>First time?</strong> Click &quot;Initialize Campaign&quot; to
            prepare the email list for this campaign.
          </p>
        </div>
      )}

      {stats && stats.remainingQuota === 0 && stats.pending > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-sm text-yellow-300">
            ⚠️ <strong>Daily limit reached.</strong> You&apos;ve sent 100 emails
            today. Come back tomorrow to send the next batch of {stats.pending}{" "}
            emails.
          </p>
        </div>
      )}
    </div>
  );
}
