"use client";

import { useEffect } from "react";
import { useGSMStore } from "@/store/gsmactx-store";

/**
 * Hydrates the Zustand store on the client side after mount.
 * This prevents hydration mismatches between server and client.
 * Must be included once in the app layout.
 */
export default function StoreHydration() {
  useEffect(() => {
    // Rehydrate the persisted store on client mount
    useGSMStore.persist.rehydrate();
  }, []);

  return null;
}
