export type EmailTemplateType = "promotional" | "newsletter" | "service-reminder" | "seasonal";

export interface EmailTemplate {
  id: EmailTemplateType;
  name: string;
  description: string;
  category: string;
  icon: string;
  thumbnail: string;
  defaultTitle: string;
  defaultContent: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: "promotional",
    name: "Promotional",
    description: "Perfect for special offers, discounts, and urgent deals",
    category: "Sales",
    icon: "🔥",
    thumbnail: "/templates/promotional.png",
    defaultTitle: "Special Limited Time Offer!",
    defaultContent: "Don't miss out on our exclusive promotion. Save big on all HVAC services this month!\n\nLimited time only - Book now and get 20% OFF on AC installation or heating repair.",
    colors: {
      primary: "#ef4444",
      secondary: "#dc2626",
    },
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Share company news, tips, and valuable information",
    category: "Information",
    icon: "📰",
    thumbnail: "/templates/newsletter.png",
    defaultTitle: "Your Monthly HVAC Tips & News",
    defaultContent: "Welcome to our monthly newsletter! Here are some important tips to keep your HVAC system running efficiently:\n\n• Schedule regular maintenance\n• Change filters every 3 months\n• Keep outdoor units clear of debris",
    colors: {
      primary: "#3b82f6",
      secondary: "#2563eb",
    },
  },
  {
    id: "service-reminder",
    name: "Service Reminder",
    description: "Remind customers about maintenance and checkups",
    category: "Service",
    icon: "🛠️",
    thumbnail: "/templates/service.png",
    defaultTitle: "Time for Your HVAC Maintenance Checkup",
    defaultContent: "It's been a while since your last HVAC service! Regular maintenance helps prevent costly breakdowns and keeps your system running efficiently.\n\nSchedule your maintenance checkup today and ensure comfort all year round.",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
    },
  },
  {
    id: "seasonal",
    name: "Seasonal/Event",
    description: "Holiday specials, summer/winter campaigns, anniversaries",
    category: "Events",
    icon: "🎉",
    thumbnail: "/templates/seasonal.png",
    defaultTitle: "Get Ready for Summer with Cool Savings!",
    defaultContent: "Summer is almost here! Don't let the heat catch you unprepared.\n\nGet your AC serviced or installed now with our special summer promotion. Beat the rush and stay cool all season long!",
    colors: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
    },
  },
];

export const getTemplateById = (id: EmailTemplateType): EmailTemplate | undefined => {
  return emailTemplates.find((template) => template.id === id);
};
