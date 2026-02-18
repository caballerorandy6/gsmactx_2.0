import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RCWebState } from "@/lib/interfaces";

export const useGSMStore = create<RCWebState>()(
  persist(
    (set) => ({
      // Navigation state
      activeSection: "Home",
      setActiveSection: (section) => set({ activeSection: section }),
      timeOfLastClick: 0,
      setTimeOfLastClick: (time) => set({ timeOfLastClick: time }),
      hash: "",
      setHash: (hash) => set({ hash }),

      // UI state (not persisted - reset on each page load)
      scrolled: false,
      setScrolled: (scrolled) => set({ scrolled }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      showHeader: false,
      showFooter: false,
      setShowHeader: (show) => set({ showHeader: show }),
      setShowFooter: (show) => set({ showFooter: show }),

      // Dialog state (not persisted)
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

      // Auth state (persisted)
      isLoadingAuth: false,
      setIsLoadingAuth: (loading) => set({ isLoadingAuth: loading }),
      admin: null,
      setAdmin: (admin) => set({ admin }),

      // Hydration state
      hasMounted: false,
      setHasMounted: (mounted) => set({ hasMounted: mounted }),
    }),
    {
      name: "gsmactx-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist important state, not UI state
      partialize: (state) => ({
        activeSection: state.activeSection,
        admin: state.admin,
      }),
      // Skip hydration to prevent mismatch, hydrate manually in useEffect
      skipHydration: true,
    }
  )
);

// Selectors for optimized re-renders (use these instead of destructuring)
export const useScrolled = () => useGSMStore((state) => state.scrolled);
export const useSetScrolled = () => useGSMStore((state) => state.setScrolled);
export const useMobileMenuOpen = () => useGSMStore((state) => state.mobileMenuOpen);
export const useSetMobileMenuOpen = () => useGSMStore((state) => state.setMobileMenuOpen);
export const useActiveSection = () => useGSMStore((state) => state.activeSection);
export const useSetActiveSection = () => useGSMStore((state) => state.setActiveSection);
export const useAdmin = () => useGSMStore((state) => state.admin);
export const useSetAdmin = () => useGSMStore((state) => state.setAdmin);
export const useHasMounted = () => useGSMStore((state) => state.hasMounted);
export const useSetHasMounted = () => useGSMStore((state) => state.setHasMounted);
