import { SectionName } from "./types";
import { SafeAdmin } from "@/lib/types";

export interface RCWebState {
  activeSection: SectionName;
  setActiveSection: (section: SectionName) => void;
  timeOfLastClick: number;
  setTimeOfLastClick: (time: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleClickModal: () => void;
  isOpenProjectsDialog: boolean;
  setIsOpenProjectsDialog: (open: boolean) => void;
  handleClickProjectsDialog: () => void;
  isOpenLetsContactDialog: boolean;
  setOpenLetsContactDialog: (open: boolean) => void;
  handleClickLetsContactDialog: () => void;
  hash: string;
  setHash: (hash: string) => void;
  scrolled: boolean;
  setScrolled: (scrolled: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  showHeader: boolean;
  showFooter: boolean;
  setShowHeader: (show: boolean) => void;
  setShowFooter: (show: boolean) => void;
  isLoadingAuth: boolean;
  setIsLoadingAuth: (loading: boolean) => void;
  admin: SafeAdmin | null;
  setAdmin: (admin: SafeAdmin | null) => void;
  hasMounted: boolean;
  setHasMounted: (mounted: boolean) => void;
}

export interface GooglePlacesReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  photos?: {
    height: number;
    width: number;
    photo_reference: string;
    html_attributions: string[];
  }[];
}

export interface Review extends GooglePlacesReview {
  photoUrl: string | null;
}

export interface IImage {
  src: string;
  alt: string;
}

export interface CampaignEmailProps {
  content: string;
  imageUrl?: string; // La URL de la imagen de la campaña es opcional
}

export interface Campaign {
  id: string;
  title: string;
  subject: string;
  content: string;
  createdAt: Date;
  sent: boolean;
  sentAt: Date | null;
  createdBy: string;
  admin: SafeAdmin;
  imageUrl?: string;
  templateType?: string;
}

export interface CampaignEmailProps {
  subject: string;
  title: string;
  content: string;
  imageUrl?: string;
  recipientEmail?: string;
  unsubscribeUrl?: string;
}

// Appointment Types
export type ServiceType =
  | "AC_MAINTENANCE"
  | "HEATING_MAINTENANCE"
  | "AC_REPAIR"
  | "HEATING_REPAIR"
  | "AC_INSTALLATION"
  | "HEATING_INSTALLATION"
  | "FULL_HVAC_INSTALLATION"
  | "DUCT_CLEANING"
  | "FREE_ESTIMATE";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: ServiceType;
  scheduledDate: Date;
  scheduledTime: string;
  address: string;
  notes: string | null;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  admin: SafeAdmin | null;
}

// Service type labels for display
export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  AC_MAINTENANCE: "A/C Maintenance",
  HEATING_MAINTENANCE: "Heating Maintenance",
  AC_REPAIR: "A/C Repair",
  HEATING_REPAIR: "Heating Repair",
  AC_INSTALLATION: "A/C Installation",
  HEATING_INSTALLATION: "Heating Installation",
  FULL_HVAC_INSTALLATION: "Full HVAC Installation",
  DUCT_CLEANING: "Duct Cleaning",
  FREE_ESTIMATE: "Free Estimate",
};

// Status labels and colors for display
export const APPOINTMENT_STATUS_CONFIG: Record<
  AppointmentStatus,
  { label: string; color: string; bgColor: string }
> = {
  PENDING: {
    label: "Pending",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  COMPLETED: {
    label: "Completed",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
};

// Appointment email props
export interface AppointmentEmailProps {
  clientName: string;
  clientEmail: string;
  serviceType: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  notes?: string;
}
