export type EmailTemplateType = "promotional" | "newsletter" | "service-reminder" | "seasonal";

export interface EmailTemplate {
  id: EmailTemplateType;
  name: string;
  description: string;
  category: string;
  icon: string;
  thumbnail: string;
  defaultTitle: string;
  defaultSubject: string;
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
    defaultTitle: "Wishing You a Safe & Cozy Halloween!",
    defaultSubject: "🎃 Happy Halloween from G S M A/C & General Contractor INC! Special HVAC Offers Inside",
    defaultContent: `Happy Halloween from your friends at G S M A/C & General Contractor INC!

As the cooler weather settles in and spooky season arrives, we want to make sure your home stays comfortable and energy-efficient. There's nothing scarier than a broken heating system on a cold October night!

This Halloween season, we're offering our valued customers:

🔧 $69.99 A/C Check-Up Special
Complete system inspection to prepare for winter (Regularly $99.99)

🏠 FREE Filter & Surge Protection
With any new system installation

Whether you need heating repairs, air duct cleaning, or attic insulation before the holidays, our licensed and insured technicians are ready to help. With over 20 years of experience and same-day service available, we're here to keep your family comfortable all season long.

Don't let HVAC issues haunt your home this fall! Give us a call today at +1 (281) 235-4684 or visit our website to schedule your service.

Stay warm, stay safe, and have a wonderful Halloween!

The G S M A/C & General Contractor INC Team
Your Trusted HVAC Partner in Cypress, TX`,
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
    defaultSubject: "📰 Your Monthly HVAC Newsletter from G S M A/C & General Contractor INC - Expert Tips Inside",
    defaultContent: "Welcome to our monthly newsletter from G S M A/C & General Contractor INC! Here are some important tips to keep your HVAC system running efficiently:\n\n• Schedule regular maintenance\n• Change filters every 3 months\n• Keep outdoor units clear of debris\n\nThank you for trusting us with your HVAC needs!\n\nThe G S M A/C & General Contractor INC Team\nYour Trusted HVAC Partner in Cypress, TX",
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
    defaultSubject: "🛠️ Don't Forget: Your HVAC Maintenance is Due - G S M A/C & General Contractor INC",
    defaultContent: "Hello from G S M A/C & General Contractor INC!\n\nIt's been a while since your last HVAC service! Regular maintenance helps prevent costly breakdowns and keeps your system running efficiently.\n\nSchedule your maintenance checkup today and ensure comfort all year round. Call us at +1 (281) 235-4684 or visit our website.\n\nThe G S M A/C & General Contractor INC Team\nYour Trusted HVAC Partner in Cypress, TX",
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
    defaultSubject: "🎉 Summer Special from G S M A/C & General Contractor INC: Beat the Heat with Our AC Deals!",
    defaultContent: "Hello from G S M A/C & General Contractor INC!\n\nSummer is almost here! Don't let the heat catch you unprepared.\n\nGet your AC serviced or installed now with our special summer promotion. Beat the rush and stay cool all season long!\n\nCall us at +1 (281) 235-4684 or visit our website to schedule your service.\n\nThe G S M A/C & General Contractor INC Team\nYour Trusted HVAC Partner in Cypress, TX",
    colors: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
    },
  },
];
