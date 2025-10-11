"use client";

import { motion } from "framer-motion";
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid";
import { businessInfo } from "@/libs/data";
import type { PlaceRatingData } from "@/types/google-places";

interface TrustIndicatorsProps {
  googleData: PlaceRatingData | null;
  itemVariants: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: { duration: number; ease: [number, number, number, number] };
    };
  };
}

export default function TrustIndicators({
  googleData,
  itemVariants,
}: TrustIndicatorsProps) {
  // Use Google data if available, otherwise fall back to static data
  const rating = googleData?.rating ?? parseFloat(businessInfo.reviews.aggregateRating);
  const reviewCount = googleData?.totalReviews ?? parseInt(businessInfo.reviews.reviewCount);

  return (
    <motion.div
      variants={itemVariants}
      className="mb-4 sm:mb-6 flex justify-center items-center gap-3 sm:gap-4 flex-wrap"
    >
      {/* 5-Star Rating from Google */}
      <motion.div
        className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400 fill-gray-400"
              }`}
            />
          ))}
        </div>
        <span className="text-xs sm:text-sm font-semibold text-white">
          {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
        </span>
      </motion.div>

      {/* Years in Business */}
      <motion.div
        className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-400" />
        <span className="text-xs sm:text-sm font-semibold text-white">
          {new Date().getFullYear() - parseInt(businessInfo.established)} Years
          in Business
        </span>
      </motion.div>

      {/* Google Verified Badge */}
      {googleData && (
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          title={`Last updated: ${new Date(googleData.lastFetched).toLocaleString()}`}
        >
          <svg
            className="h-3 w-3 sm:h-4 sm:w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-[10px] sm:text-xs font-semibold text-white">
            Google Verified
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
