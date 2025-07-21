import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RCWebState } from "@/libs/interfaces";

export const useGSMStore = create<RCWebState>()(
  persist(
    (set) => ({
      activeSection: "Home",
      setActiveSection: (section) => set({ activeSection: section }),
      timeOfLastClick: 0,
      setTimeOfLastClick: (time) => set({ timeOfLastClick: time }),
      isOpen: false,
      setIsOpen: (open) => set({ isOpen: open }),
      handleClickModal: () => set((state) => ({ isOpen: !state.isOpen })),
      isOpenProjectsDialog: false,
      setIsOpenProjectsDialog: (open) => set({ isOpenProjectsDialog: open }),
      handleClickProjectsDialog: () =>
        set((state) => ({ isOpenProjectsDialog: !state.isOpenProjectsDialog })),
      isOpenLetsContactDialog: false,
      setOpenLetsContactDialog: (open) =>
        set({ isOpenLetsContactDialog: open }),
      handleClickLetsContactDialog: () =>
        set((state) => ({
          isOpenLetsContactDialog: !state.isOpenLetsContactDialog,
        })),
      hash: "",
      setHash: (hash) => set({ hash }),
      scrolled: false,
      setScrolled: (scrolled) => set({ scrolled }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      showHeader: false,
      showFooter: false,
      setShowHeader: (show) => set({ showHeader: show }),
      setShowFooter: (show) => set({ showFooter: show }),
      isLoadingAuth: false,
      setIsLoadingAuth: (loading) => set({ isLoadingAuth: loading }),
      admin: null,
      setAdmin: (admin) => set({ admin }),
    }),
    {
      name: "gsmactx-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : sessionStorage
      ),
    }
  )
);
