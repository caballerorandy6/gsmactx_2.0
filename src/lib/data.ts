import { getCampaignsListAction } from "@/app/actions/campaignAction";

/** Limited-time offer shown in the home hero; `slug` deep-links it into /book-appointment. */
export const heroOffer = {
  slug: "ac-checkup",
  title: "AC Check-Up",
  price: "$69.99",
  regularPrice: "$99.99",
  discount: "30% OFF",
  serviceType: "AC_MAINTENANCE",
} as const;

/**
 * Real Business Information from Google Business Profile
 * Source: Google Maps - GSM A/C & General Contractor INC.
 * Last verified: October 2025
 */
export const businessInfo = {
  name: "GSM A/C & General Contractor INC.",
  legalName: "GSM A/C General & Contractor Inc",
  phone: "+1-281-235-4684",
  website: "https://www.gsmactx.com",

  // Real address from Google Business Profile
  address: {
    street: "19410 FM 529 A4",
    city: "Cypress",
    state: "TX",
    zip: "77433",
    country: "US",
    fullAddress: "19410 FM 529 A4, Cypress, TX 77433",
  },

  // Google Maps listing (Business Profile)
  mapsUrl:
    "https://www.google.com/maps/place/G+S+M+A%2FC+%26+General+Contractor+INC./@29.8801535,-95.7088008,15z/data=!4m6!3m5!1s0x8640d7a7761d3e75:0x5aa72afac9b36840!8m2!3d29.8801145!4d-95.7088761!16s%2Fg%2F11n5cyv1cm?entry=ttu",

  // Verified 2026-11-14: each profile names the business and links gsmactx.com
  socialProfiles: [
    { name: "Facebook", href: "https://www.facebook.com/GSMACTX.USA/" },
    { name: "Instagram", href: "https://www.instagram.com/gsmactx/" },
    { name: "YouTube", href: "https://www.youtube.com/@gsmactx" },
    { name: "TikTok", href: "https://www.tiktok.com/@gsmactx" },
  ],
  // Older Facebook page ("GSM AC TX"), still the company's; schema only
  legacyFacebook: "https://www.facebook.com/gsmactx/",

  // Real coordinates from Google Maps
  geo: {
    latitude: "29.8801145",
    longitude: "-95.7088761",
  },

  // Real business hours from Google (Updated 2 weeks ago)
  openingHours: [
    { dayOfWeek: "Monday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Tuesday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Wednesday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Thursday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Friday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Saturday", opens: "08:00", closes: "20:00" },
    // Sunday: Closed
  ],

  // Fallback review data from Google (snapshot 2026-11-12). Live values come
  // from getGooglePlaceDetails(); keep this close to them for JSON-LD.
  reviews: {
    aggregateRating: "4.9",
    reviewCount: "226",
  },

  // Business description from Google
  description:
    "Repair service offering same-day service and new units, plus efficient staff and reasonable pricing.",

  // Service areas
  serviceAreas: [
    "Cypress",
    "Houston",
    "Katy",
    "Spring",
    "Tomball",
    "The Woodlands",
  ],

  // Year established
  established: "2005",

  // Price range
  priceRange: "$$",
};

export const navigation = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
  { name: "FAQ", href: "/#faq" },
  { name: "Book Appointment", href: "/book-appointment" },
];

export const adminNavigation = [
  { name: "Admin Dashboard", href: "/admin-dashboard" },
  { name: "Appointments", href: "/appointments" },
  { name: "Create Appointment", href: "/create-appointment" },
  { name: "Contacts", href: "/contacts" },
  { name: "View Campaigns", href: "/view-campaigns" },
  { name: "Create Campaign", href: "/create-campaign" },
  { name: "Test Campaign", href: "/test-campaign" },
  { name: "Settings", href: "/settings" },
];

export const adminNavigationSections = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin-dashboard" },
    ],
  },
  {
    title: "Appointments",
    items: [
      { name: "All Appointments", href: "/appointments" },
      { name: "New Appointment", href: "/create-appointment" },
    ],
  },
  {
    title: "Contacts",
    items: [
      { name: "All Contacts", href: "/contacts" },
    ],
  },
  {
    title: "Campaigns",
    items: [
      { name: "All Campaigns", href: "/view-campaigns" },
      { name: "New Campaign", href: "/create-campaign" },
      { name: "Test Campaign", href: "/test-campaign" },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "Settings", href: "/settings" },
    ],
  },
];

export const allServices = [
  {
    id: "air-conditioning-installation",
    name: "Air Conditioning Installation",
    href: "/services/air-conditioning-installation",
  },
  {
    id: "air-conditioning-repair",
    name: "Air Conditioning Repair",
    href: "/services/air-conditioning-repair",
  },
  {
    id: "heating-installation",
    name: "Heating Installation",
    href: "/services/heating-installation",
  },
  {
    id: "heating-repair",
    name: "Heating Repair",
    href: "/services/heating-repair",
  },
  {
    id: "air-duct-sanitizing",
    name: "Air Duct Sanitizing",
    href: "/services/air-duct-sanitizing",
  },
  {
    id: "attic-insulation",
    name: "Attic Insulation",
    href: "/services/attic-insulation",
  },
];

export const services = [
  {
    title: "Air Conditioning Installation",
    description:
      "We have the know-how and resources to install AC and HVAC units of all generations. We keep drilling to a minimum and always clean up after ourselves because we respect the properties of our customers.",
    link: "Learn more",
    href: "/services/air-conditioning-installation",
    src: "/service1-800.avif",
    metaDescription:
      "New AC and HVAC system installation in Cypress, Katy and Houston, TX. Clean, careful work and help choosing the right unit. Call (281) 235-4684.",
  },
  {
    title: "Air Conditioning Repair",
    description:
      "When it comes to AC or HVAC repair, we are the specialists that you should contact. Our technicians can quickly pinpoint and remedy or replace defective parts and components.",
    link: "Learn more",
    href: "/services/air-conditioning-repair",
    src: "/service2-800.avif",
    metaDescription:
      "AC repair in Cypress, Katy and Houston, TX. We find the problem, fix or replace the faulty part, and get your home cool again. Call (281) 235-4684.",
  },
  {
    title: "Heating Installation",
    description:
      "Apart from installing ACs and HVACs, we can also set up heating devices. We strive to choose locations that offer maximum coverage so our customers can heat their properties without using too much energy.",
    link: "Learn more",
    href: "/services/heating-installation",
    src: "/service3-800.avif",
    metaDescription:
      "Furnace and heating system installation in Cypress, Katy and Houston, TX, placed for even, efficient heat. Call GSM A/C at (281) 235-4684.",
  },
  {
    title: "Heating Repair",
    description:
      "Use our office & home heating repair services to remedy problematic heating units. We can repair or replace faulty parts to restore the original functionality of the devices. Our prices are pocket-friendly and you will get your money's worth.",
    link: "Learn more",
    href: "/services/heating-repair",
    src: "/service4-800.avif",
    metaDescription:
      "Heating and furnace repair in Cypress, Katy and Houston, TX. We repair or replace faulty parts at fair prices. Call GSM A/C at (281) 235-4684.",
  },
  {
    title: "Air Duct Sanitizing",
    description:
      "Customers can trust us with the cleaning and sanitizing of their air ducts. We have the products and tools to eliminate harmful particles such as dust, dirt, allergens, germs, etc. We can keep your vents pristine.",
    link: "Learn more",
    href: "/services/air-duct-sanitizing",
    src: "/service5-800.avif",
    metaDescription:
      "Air duct cleaning and sanitizing in Cypress, Katy and Houston, TX. We remove dust, allergens and germs from your vents. Call (281) 235-4684.",
  },
  {
    title: "Attic Insulation",
    description:
      "We provide expert attic insulation services to enhance your home's energy efficiency. Our work helps lower heating and cooling costs while keeping your living space comfortable all year.",
    link: "Learn more",
    href: "/services/attic-insulation",
    src: "/service6-800.avif",
    metaDescription:
      "Attic insulation in Cypress, Katy and Houston, TX that lowers heating and cooling costs and keeps your home comfortable. Call (281) 235-4684.",
  },
];

export const features = [
  {
    name: "Capable Specialists",
    description:
      "At GSM A/C & General Contractor INC., we use innovative techniques and state-of-the-art equipment to correctly carry out labor-intensive and time-sensitive cooling and heating projects. We can install ACs, heating units, and HVACs on any make and model, and give our customers the tools they need to keep their properties at a comfortable and cozy temperature all year long. We never use one-size-fits-all solutions because we are completely aware that each job is unique. Choosing our heating repair services and other options is choosing to partner with competent professionals.",
  },
  {
    name: "Superior Customer Service Since 2005",
    description:
      "Many homeowners and businesses in Cypress, TX have made us their go-to company because we offer quality HVAC services. Our experienced and well-trained technicians will help with the selection of your system by explaining the advantages and disadvantages of your available options. They will provide you with the details you need to make an educated decision suitable for your needs and budget. Once you have made your choice, they will handle the installation work and make sure your unit is working at optimal efficiency. Let us make things easier for you.",
  },
  {
    name: "How do you book a service?",
    description:
      "Call us at (281) 235-4684 to book our impeccable heating repair services, our affordable AC replacement services and our other options. Our phone operators will gladly answer your questions. Let us know how we can help you!",
  },
];

// Service page copy. Restructured for search and AI citation (question
// headings, answer first, short paragraphs) without adding or dropping claims.
// A blank line inside `description` starts a new paragraph.
export const air_conditioning_installation = [
  {
    name: "",
    description:
      "Our affordable AC replacement services are just a call away for property owners in the Cypress, TX area. If the cost of quality air conditioning replacement is what worries you, GSM A/C & General Contractor INC. offers really affordable rates for the high-quality services we provide.",
  },
  {
    name: "Why shouldn't you delay replacing an old AC?",
    description:
      "Because an old and damaged air conditioning system costs you more money in recurring repairs and can lead to more damage. When a system is already very old, it needs a lot more frequent repairs.\n\nThis isn't something you'd want to happen, so save yourself from it and replace the system before it gets there.",
  },
  {
    name: "Why leave AC replacement to professionals?",
    description:
      "Replacing an air conditioning system takes expertise, proper training and the right tools. Air conditioning systems can be tricky to deal with, especially if you have no experience whatsoever, and planning the entire replacement process can get quite overwhelming.\n\nLeave the job to professionals like us: we determine which air conditioning system will work best for your home or workplace, and we handle the replacement process from start to end.",
  },
  {
    name: "How do we replace an air conditioning system?",
    description:
      "Our air conditioning replacement service is all about using the right tools and following the correct procedures, so the new system is installed according to industry standards.\n\nFirst, we prepare the tools the replacement needs, including proper sealants and fixatives. Then we remove the existing air conditioning system correctly, so we don't cause any kind of damage to the wall behind the AC unit. Finally, we install the new AC system and double-check our work for accuracy.",
  },
  {
    name: "",
    description:
      "If your air conditioning system is too old, you know who to call for a successful replacement. When it comes to affordable AC replacement services in Cypress, TX, you can always rely on GSM A/C & General Contractor INC. To book our services, call us at (281) 235-4684 today!",
  },
];

export const air_conditioning_repair = [
  {
    name: "",
    description:
      "GSM A/C & General Contractor INC. offers immediate HVAC repair solutions to property owners in the Cypress, TX area, so you can always rely on us for a quick and quality AC repair service. Even if you're careful with your AC maintenance, there will come a time when it breaks down on you.",
  },
  {
    name: "How soon should a malfunctioning AC be repaired?",
    description:
      "As soon as possible once it starts to malfunction. Frequent AC malfunctions can be a result of underlying problems in your HVAC system, so don't wait for it to get worse, and don't let days come and go without using your AC.\n\nGet the repair done in a single sitting. That is only possible when you turn to our team for the repair job: we respond to all calls right away, and we complete the air conditioning repair in a timely manner, ensuring excellent workmanship.",
  },
  {
    name: "What can you expect from our AC repair service?",
    description:
      "Our technicians promptly respond to your calls and provide an efficient repair service. We guarantee long-lasting repair solutions at all times.\n\nWe have the skills, tools and other equipment to complete the repair work in a timely manner, and rest assured that no damage will be left untreated. When it's time to have your air conditioning unit fixed, don't hesitate to call us right away.",
  },
  {
    name: "",
    description:
      "Once you notice signs of AC failure, call GSM A/C & General Contractor INC. for a reliable air conditioning repair service right away. Don't delay, as it can only lead to more problems. If you're looking for a reliable AC technician in Cypress, TX, you now know which one to call. To book our HVAC repair services, give us a call at (281) 235-4684 today!",
  },
];

export const heating_installation = [
  {
    name: "",
    description:
      "GSM A/C & General Contractor INC. offers a reliable home heating repair and installation service in Cypress, TX that you can count on. If you are planning to have a new home constructed, one of the first things you need to do is choose a reliable and professional heating installation company, because the heating system is one of the most essential parts of the house if you want to be comfortable inside your own home.",
  },
  {
    name: "How do professionals choose the right heating system for your home?",
    description:
      "We guide you in buying the right system for your home and your area, taking into account the climate of your area and the design of your house. That way you get a system that is efficient and works well with the house.\n\nHeating installation is not only the installation of the furnace or air conditioner or the wiring of your heating system; you also have to decide the type of system your home should have. When you leave the heating installation to us, you no longer have to worry about any of this.",
  },
  {
    name: "Why leave heating installation to trained professionals?",
    description:
      "Because we are trained to handle such a complicated task and to install the right kind of heating system for your home. You don't have to worry about anything during or after the installation: we are responsible for it.\n\nIf you want to make sure that the heating system installed in your home in Cypress, TX is up to par with the standards of the industry, hire experts. If you need more information about the services we offer, give us a call at (281) 235-4684 and let us address your concerns.",
  },
];

export const heating_repair = [
  {
    name: "",
    description:
      "GSM A/C & General Contractor INC. is a highly recommended company that you can trust in Cypress, TX for your heating repair needs. Your HVAC system is a complex system that keeps your home at a comfortable temperature and helps regulate its temperature and humidity. To keep your family comfortable, keep it in great condition by calling a reliable heating repair service.",
  },
  {
    name: "Why should you fix your heating system right away?",
    description:
      "Because damage increases in proportion to how long you wait, and that means higher repair costs. Once signs of HVAC failure show, such as strange odors, vibrations and sounds coming from the system, take action right away: an immediate repair is the best way to stop further harm.\n\nAvoid taking the DIY route, because it can lead to more problems. With HVAC repair experts like us you don't need to worry about the cost, as we provide some of the best HVAC service rates.",
  },
  {
    name: "How do we repair your heating system?",
    description:
      "We operate with a high-standard checklist as part of our HVAC repair process, which is how we guarantee efficient service and quality solutions for your damaged HVAC system. We have extensive training in the repair of complex HVAC systems, plus the experience, knowledge, abilities and equipment to perform any HVAC repair service.\n\nWith years of experience, trusting a professional like GSM A/C & General Contractor INC. is the right choice. If you need our quality heating repair service in Cypress, TX, contact us at (281) 235-4684 right away!",
  },
];

export const air_duct_sanitizing = [
  {
    name: "",
    description:
      "Cleaning the contaminants out of your air duct system significantly decreases the negative impacts of mold and dust. People who are susceptible to indoor air pollution, especially those with allergies, should breathe clean, healthy air that is constantly flowing. GSM A/C & General Contractor INC. provides quality HVAC services that include special air duct sanitizing. Here are the top 4 comfort-related reasons to have it done.",
  },
  {
    name: "How does duct cleaning make your home cleaner?",
    description:
      "Removing the dust from inside your ductwork makes your home a cleaner place to live. After a few hours of inactivity, dust begins to collect in your ductwork like it does everywhere else in your house in Cypress, TX.\n\nWhen the system turns on, that dust starts to move, but it doesn't stay in the ductwork: it enters your home through the walls and floors and settles into the carpeting, furniture and bedding.",
  },
  {
    name: "Does duct cleaning improve indoor air quality?",
    description:
      "Yes. You'll always have cleaner air to breathe if you keep your air ducts clean, and cleaner air keeps your family safe even if no one in your home has allergies or respiratory issues. Every time you breathe in dangerous pollutants and dust, it may cause sneezing and coughing and affect your sinuses and bronchial congestion.",
  },
  {
    name: "What irritants are in your air ducts?",
    description:
      "More than just dust. Your air ducts also hold contaminants and harmful microorganisms, so the air you breathe may contain bacteria, pollen, mildew, pet dander and other contaminants. Instead of recirculating those possible issues, our routine air duct cleaning services can help keep your family far healthier.",
  },
  {
    name: "Can duct cleaning remove odors?",
    description:
      "Yes. Our thorough cleaning of the air ducts helps remove odors trapped in dust particles, so your house has a fresher scent. Every house has a distinct aroma, and it's not always the most enjoyable: stale odors can develop over time from mildew, paint fumes, tobacco use, food, cleaning supplies and pets.",
  },
  {
    name: "",
    description:
      "Call GSM A/C & General Contractor INC. at (281) 235-4684 if you need our air duct cleaning and sanitizing services for your property in Cypress, TX. You can also call our team for quality HVAC services.",
  },
];

export const attic_insulation = [
  {
    name: "",
    description:
      "A poorly insulated attic lets Houston heat pour into your home in summer and lets warm air escape in winter, so your HVAC system works harder and your energy bills climb. GSM A/C & General Contractor INC. adds and replaces attic insulation for homes in Cypress, TX and the surrounding area.",
  },
  {
    name: "How does attic insulation lower your energy bills?",
    description:
      "Insulation slows the transfer of heat through your ceiling, so your A/C and furnace run less to hold the temperature you set.",
  },
  {
    name: "Does it make your home more comfortable?",
    description:
      "Yes. Rooms under the attic stop running hotter or colder than the rest of the house.",
  },
  {
    name: "Does insulation put less strain on your HVAC system?",
    description:
      "Yes. Shorter run times mean less wear on your equipment.",
  },
  {
    name: "",
    description:
      "Call GSM A/C & General Contractor INC. at (281) 235-4684 to have your attic insulation checked, or book an appointment online.",
  },
];

export const faqs = [
  {
    question: "What HVAC services do you offer?",
    answer:
      "We offer a range of HVAC services including air conditioning installation, air conditioning repair, heating installation, heating repair, air duct sanitizing, and attic insulation.",
  },
  {
    question: "How can I schedule a service?",
    answer:
      "Book online at gsmactx.com/book-appointment or call us at (281) 235-4684. We are open Monday through Saturday, 8 AM to 8 PM.",
  },
  {
    question: "Do you provide emergency HVAC services?",
    answer:
      "Yes, we provide emergency HVAC services to ensure your comfort and safety at all times.",
  },
];

type Faq = { question: string; answer: string };

/** Questions shown on every service page, after the service-specific ones. */
export const commonServiceFaqs: Faq[] = [
  {
    question: "How can I schedule a service?",
    answer:
      "Book online at gsmactx.com/book-appointment or call us at (281) 235-4684. We are open Monday through Saturday, 8 AM to 8 PM.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We are based in Cypress, TX and serve homes and businesses in Cypress, Houston, Katy, Spring, Tomball and The Woodlands.",
  },
];

type ServicePageContent = {
  /** Descriptive H1: names the service and the city. */
  heading: string;
  tagline: string;
  signsHeading: string;
  /** General HVAC warning signs only: no claims about the business. */
  signs: string[];
  /** Ids from `allServices`, linked at the bottom of the page. */
  related: string[];
};

/** Per-service page content keyed by service id (see /services/[id]). */
export const servicePageContent: Record<string, ServicePageContent> = {
  "air-conditioning-installation": {
    heading: "Air Conditioning Installation in Cypress, TX",
    tagline: "New AC and HVAC systems, sized for your home and installed with care.",
    signsHeading: "Signs it may be time to replace your AC",
    signs: [
      "The system is 10 to 15 years old or more.",
      "Repairs are getting more frequent and more expensive.",
      "It still runs on R-22 refrigerant, which is no longer produced in the U.S.",
      "Some rooms never cool down, or the house falls behind on the hottest afternoons.",
      "Your cooling bills keep rising while your usage stays the same.",
    ],
    related: ["air-conditioning-repair", "attic-insulation", "air-duct-sanitizing"],
  },
  "air-conditioning-repair": {
    heading: "Air Conditioning Repair in Cypress, TX",
    tagline: "We find what is wrong, fix or replace the faulty part, and get your home cool again.",
    signsHeading: "Signs your AC needs repair",
    signs: [
      "The vents blow warm or barely cool air.",
      "Ice forms on the refrigerant lines or the outdoor unit.",
      "Water leaks or pools around the indoor unit.",
      "Grinding, squealing or banging noises when the system runs.",
      "The system turns on and off in short cycles.",
      "The thermostat is set, but the house never reaches the temperature.",
    ],
    related: ["air-conditioning-installation", "air-duct-sanitizing", "heating-repair"],
  },
  "heating-installation": {
    heading: "Heating Installation in Cypress, TX",
    tagline: "Furnaces and heating systems placed and set up for even, efficient heat.",
    signsHeading: "Signs it may be time for a new heating system",
    signs: [
      "The furnace is 15 to 20 years old or more.",
      "You are calling for repairs every winter.",
      "Some rooms stay cold while others overheat.",
      "Your heating bills rise from one winter to the next.",
      "A repair quote is getting close to the cost of a new system.",
    ],
    related: ["heating-repair", "attic-insulation", "air-conditioning-installation"],
  },
  "heating-repair": {
    heading: "Heating Repair in Cypress, TX",
    tagline: "Furnace and heating repair for homes and offices, with faulty parts repaired or replaced.",
    signsHeading: "Signs your heating needs repair",
    signs: [
      "No heat, or the air from the vents is only lukewarm.",
      "The burner flame on a gas furnace is yellow instead of blue.",
      "A burning smell that lasts beyond the first days of the season.",
      "The furnace turns on and off much more often than usual.",
      "Rattling, banging or screeching noises when the heat runs.",
    ],
    related: ["heating-installation", "air-duct-sanitizing", "air-conditioning-repair"],
  },
  "air-duct-sanitizing": {
    heading: "Air Duct Cleaning and Sanitizing in Cypress, TX",
    tagline: "Dust, allergens and germs removed from your ducts and vents.",
    signsHeading: "Signs your air ducts need cleaning",
    signs: [
      "Dust puffs out of the vents or settles on the registers soon after you clean.",
      "A musty smell when the system starts.",
      "Allergy symptoms that get worse indoors.",
      "You recently remodeled and construction dust got into the system.",
      "Signs of pests or rodents in the ductwork.",
    ],
    related: ["air-conditioning-repair", "heating-repair", "attic-insulation"],
  },
  "attic-insulation": {
    heading: "Attic Insulation in Cypress, TX",
    tagline: "Insulation that keeps Houston heat out in summer and warm air in during winter.",
    signsHeading: "Signs your attic needs more insulation",
    signs: [
      "Upstairs rooms are noticeably hotter in summer.",
      "You can see the tops of the ceiling joists, so the insulation is too thin.",
      "The insulation looks flattened, wet or stained.",
      "The ceiling feels warm to the touch on hot days.",
      "Your A/C runs almost nonstop through the summer.",
    ],
    related: ["air-conditioning-installation", "heating-installation", "air-duct-sanitizing"],
  },
};

/**
 * Service-specific FAQ, keyed by service id. Rendered on the service page and
 * reused verbatim for its FAQPage JSON-LD, so visible text and schema match.
 */
export const serviceFaqs: Record<string, Faq[]> = {
  "air-conditioning-installation": [
    {
      question: "Should I repair or replace my old AC?",
      answer:
        "If your unit is old and needs repairs again and again, replacing it usually costs less over time than paying for recurring repairs. Our technicians look at your current system, explain the pros and cons of each option, and recommend what fits your home and budget.",
    },
    {
      question: "What does an AC installation include?",
      answer:
        "We help you choose the right system for your home, remove the old unit without damaging the wall or the area around it, install the new system to industry standards, double-check the work and clean up before we leave.",
    },
    {
      question: "Which AC brands do you install?",
      answer:
        "We install air conditioning and HVAC units of any make and model, and help you compare the options before you buy.",
    },
  ],
  "air-conditioning-repair": [
    {
      question: "What are the signs my AC needs repair?",
      answer:
        "Warm air from the vents, a unit that turns on and off often, strange noises or smells, and breakdowns that keep coming back. Frequent malfunctions usually point to an underlying problem, so it is best to have it checked before the damage grows.",
    },
    {
      question: "Can you fix my AC in one visit?",
      answer:
        "That is our goal. Our technicians find the cause, then repair or replace the faulty part so the system cools again, and they double-check the work before leaving.",
    },
    {
      question: "Do you repair all AC brands?",
      answer:
        "Yes. We work on air conditioning and HVAC systems of any make and model.",
    },
  ],
  "heating-installation": [
    {
      question: "Which heating system is right for my home?",
      answer:
        "It depends on the size and layout of your home and on the local climate. We explain the options, help you pick an efficient system and install it so it works well with the house.",
    },
    {
      question: "Where should a furnace be installed?",
      answer:
        "We choose a location that gives the best coverage, so the heat reaches every room evenly without wasting energy.",
    },
    {
      question: "Do you install heating in new homes?",
      answer:
        "Yes. If you are building a new home in Cypress or the surrounding area, we can plan and install the heating system from the start.",
    },
  ],
  "heating-repair": [
    {
      question: "What are the signs my furnace needs repair?",
      answer:
        "Strange odors, vibrations or noises coming from the system, uneven heat, or a furnace that will not turn on. Damage grows the longer you wait, so it is cheaper to fix it right away.",
    },
    {
      question: "Can I repair my furnace myself?",
      answer:
        "We do not recommend it. Heating systems are complex, and a DIY repair can create bigger and more expensive problems. Our technicians are trained to diagnose and repair them safely.",
    },
    {
      question: "Do you repair or replace heating parts?",
      answer:
        "Both. We repair the faulty part when that is the better option, and replace it when it cannot be restored.",
    },
  ],
  "air-duct-sanitizing": [
    {
      question: "Why should I clean and sanitize my air ducts?",
      answer:
        "Dust collects in the ductwork and is blown back into your rooms every time the system turns on. Cleaning and sanitizing the ducts means less dust on your furniture and bedding, cleaner air and a fresher-smelling home.",
    },
    {
      question: "What does duct sanitizing remove?",
      answer:
        "Dust, dirt, pollen, pet dander, mildew, bacteria and the odors trapped in dust particles.",
    },
    {
      question: "Who benefits most from duct sanitizing?",
      answer:
        "Everyone breathes the air that moves through the ducts, but it helps most in homes with allergies, asthma or other breathing problems, and in homes with pets.",
    },
  ],
  "attic-insulation": [
    {
      question: "How does attic insulation lower my energy bills?",
      answer:
        "Insulation slows the heat moving through your ceiling, so less Houston heat gets in during summer and less warm air escapes in winter. Your A/C and furnace run less to hold the temperature you set.",
    },
    {
      question: "How do I know if my attic needs more insulation?",
      answer:
        "Rooms under the attic that run hotter or colder than the rest of the house, an HVAC system that runs for a long time, and energy bills that keep climbing. We can check your attic and tell you what it needs.",
    },
    {
      question: "Do you add new insulation or replace the old one?",
      answer:
        "Both. We add insulation on top of what you have when it is in good condition, and replace it when it is not.",
    },
  ],
};

export const emailsToSeed = [
  "88ragnarok@gmail.com",
  "a51craigster@sbcglobal.net",
  "adefashe@hotmail.com",
  "adelinks2000@yahoo.com",
  "adestherlog@gmail.com",
  "adonayrscuba@gmail.com",
  "aida.sanches@hotmail.com",
  "aisack05@yahoo.com",
  "aisackos@yahoo.com",
  "alan_in_wa@yahoo.com",
  "albert.mesa@att.net",
  "alianzarebellc@gmail.com",
  "allen.orum@gmail.com",
  "allison@alandaughtrylaw.com",
  "amakaumachia@gmail.com",
  "amakaumadia@gmail.com",
  "ammarlazo@yahoo.com",
  "ammie32@sbcglobal.net",
  "amymaxwell9@gmail.com",
  "andrewtaulton@hotmail.com",
  "angus@heavyequipmentguide.com",
  "annewaldrep@att.net",
  "arielfigeroa883@gmail.com",
  "arizreynolds@att.com",
  "arondhuchins@gmail.com",
  "aronhutchins@gmail.com",
  "asantiago1027@yahoo.com",
  "attorney.dave@yahoo.com",
  "azgcm@outlook.com",
  "badaopemipo@gmail.com",
  "barret@saihouston.com",
  "barretdl85@gmail.com",
  "batuner2019@gmail.com",
  "baturner2019@gmail.com",
  "bbcamarillo@gmail.com",
  "beatriztamayo@yahoo.com",
  "bellowphillman@gmail.com",
  "bellshawn70@yahoo.com",
  "benjaminsaucedo2@gmail.com",
  "bennyzhuang09@gmail.com",
  "berguer5843@sbcglobal.net",
  "berniemccoyjr@hotmail.com",
  "bernshausen@gmail.com",
  "bigbendsky@gmail.com",
  "billk@highstreetllc.com",
  "billy@wwtshou.com",
  "blueseas@gmail.com",
  "bmcmillen961@gmail.com",
  "bmstevens4@gmail.com",
  "brad.maddux@yahoo.com",
  "bradc@morrellmasonry.com",
  "brian.lardi@hotmail.com",
  "brightbholdings@yahoo.com",
  "britgetclytn@yahoo.com",
  "brud200@gmail.com",
  "butthyder@gmail.com",
  "c_stroy26@yahoo.com",
  "captainstevewebber@gmail.com",
  "carmenlozano21@gmail.com",
  "catherinemontz@yahoo.com",
  "cedeag@hotmail.com",
  "chamdal6@sbcglobal.net",
  "changstein3@gmail.com",
  "charles.gray@att.net",
  "charles.grey@att.net",
  "chitra.shukla@att.net",
  "chris.pricejk2019@gmail.com",
  "chris6401@att.net",
  "cicumarin@yahoo.com",
  "cisneroscustomcarpentry@yahoo.com",
  "cjpivonka@comcast.net",
  "cjsingh727@gmail.com",
  "clhernz59@yahoo.com",
  "cnblackshear@gmail.com",
  "cobincnielson@gmail.com",
  "condefa@hotmail.com",
  "cookiell1355@yahoo.com",
  "cora.straker@yahoo.com",
  "corbincneilson@gmail.com",
  "cposell@simplystatedhouston.com",
  "cprokofieff@gmail.com",
  "cruckconstruction@gmail.com",
  "crukcontruction@gmail.com",
  "ctownsend1047@gmail.com",
  "custodiocastro1@gmail.com",
  "d.boehm4106@gmail.com",
  "dahri@att.net",
  "dale.labeau@gmail.com",
  "dan@flangeprotection.com",
  "dania.lopez@yahoo.com",
  "dania.lopez43@yahoo.com",
  "danielle_brown86@yahoo.com",
  "daubers.pups85@icloud.com",
  "david@lukahenergy.com",
  "davidckurtz06@gmail.com",
  "davidholtgrave94@gmail.com",
  "dbankstxii@aol.com",
  "dberger@ipipes.com",
  "deesworld@gmail.com",
  "derick52@hotmail.com",
  "derik52@hotmail.com",
  "deswilli711@gmail.com",
  "dhg5737@gmail.com",
  "djrice@gmail.com",
  "dmalinowski@slb.com",
  "donaldrrawls@yahoo.com",
  "dovesics@gmail.com",
  "drc@trueimageortho.com",
  "dreasanchez@yahoo.com",
  "drgizersky@gmail.com",
  "duartenayiby@gmail.com",
  "dulcemduarte@icloud.com",
  "duy.luong@yahoo.com",
  "ed@theheritagemeyerland.com",
  "edgarvillafane@gmail.com",
  "eduard.g.bustos@gmail.com",
  "eduriermarquez@gmail.com",
  "eduviermarquez@gmail.com",
  "edward.g.bustos@gmail.com",
  "eifer731@gmail.com",
  "elejew8@gmail.com",
  "elfoster4@hotmail.com",
  "elita.musliu@yahoo.com",
  "elizabethbarberena@live.com",
  "elizabethbonnie50@gmail.com",
  "ella3118@hotmail.com",
  "ella3118@sbcglobal.net",
  "emaniehendo@gmail.com",
  "emilieramos@att.net",
  "emmanuel177493@gmail.com",
  "emmanuel77493@gmail.com",
  "enasonso1988@gmail.com",
  "enblackshear@gmail.com",
  "epanesso74@gmail.com",
  "ernestonap@gmail.com",
  "erodez00@hotmail.com",
  "esther.dunn@gmail.com",
  "esthert.dunne@gmail.com",
  "estraveler@aol.com",
  "evadiez64@gmail.com",
  "evamex3@yahoo.com",
  "exkloosiuz@yahoo.com",
  "fabpluquet@gmail.com",
  "fadiakdhelias@gmail.com",
  "fatemac@dhtexas.org",
  "fatemah@dhtexas.org",
  "fjones@endeavordevel.com",
  "flaviah@me.com",
  "frenchys7955@gmail.com",
  "fsstewart1@gmail.com",
  "g-castillos@live.com",
  "g.jonesnov03@gmail.com",
  "gannon_cj@yahoo.com",
  "garcia8367@att.net",
  "garmaly@att.net",
  "gary.burkinshaw@me.com",
  "gbluescreen@gmail.com",
  "gefons@fonscor.com",
  "gilbert@gbgarza.com",
  "gillispiekyle@yahoo.com",
  "gisgurutx@gmail.com",
  "glchaoin@outlook.com",
  "glchapin@outlook.com",
  "glgowen@yahoo.com",
  "glrice65@gmail.com",
  "glrke65@gmail.com",
  "gonzalezlupe@yahoo.com",
  "gonzalezlupe51@yahoo.com",
  "greg.tran@sbcglobal.net",
  "gregorybekker.gb@gmail.com",
  "gregv133@yahoo.com",
  "grosu.dan@gmail.com",
  "gunilla.abbott@gmail.com",
  "gunther.groning@gmail.com",
  "gunther.gronins@gmail.com",
  "guzmancito71@hotmail.com",
  "hadja3@yahoo.com",
  "hank0007@aol.com",
  "hank007@aol.com",
  "helenjack426@gmail.com",
  "helenparker@att.net",
  "helenparker@cct.net",
  "henurse2@hotmail.com",
  "hnicole0711@yahoo.com",
  "hparedes97@gmail.com",
  "htruffintejeda@gmail.com",
  "hudnallk@yahoo.com",
  "hughlsp@gmail.com",
  "iconteh8@gmail.com",
  "icontet8@gmail.com",
  "igaby1927@gmail.com",
  "info@sqsoccer.com",
  "j23nichola@hotmail.com",
  "jacob.a.sneed@gmail.com",
  "jadlen@live.com",
  "jameslm95@yahoo.com",
  "jameson@gmail.com",
  "jayhousholder@gmail.com",
  "jaypee1128@gmail.com",
  "jcaraujo@sbcglobal.net",
  "jckbrr.tt@gmail.com",
  "jcryquilt@gmail.com",
  "jennifer.master@sagemontchurch.org",
  "jerome.rhodes55@yahoo.com",
  "jessica@dtlogos.com",
  "jfeagin69@gmail.com",
  "jh322278@yahoo.com",
  "jhonnatanrubio@hotmail.com",
  "jhonnyraia2@toxicologyassociates.com",
  "jilliancumo@sbcglobal.net",
  "jlgowen@yahoo.com",
  "jlgrayado@gmail.com",
  "jljones1948@att.net",
  "jmata_1953@yahoo.com",
  "jmolexen@yahoo.com",
  "joe11023@cloud.com",
  "joe11023@icloud.com",
  "joec@smartsubseaus.com",
  "joecambell145@gmail.com",
  "joel2006ana@yahoo.com",
  "joey@thedalyround.com",
  "johnferruzzo87@gmail.com",
  "johnnyraia2_@hotmail.com",
  "jolivet.lilliam@gmail.com",
  "jonnette.finly@dtps.state.tx.us",
  "josec8619@gmail.com",
  "joygregory@sbcglobal.net",
  "jpkoke@gmail.com",
  "jpol50@yahoo.com",
  "jpolson@yahoo.com",
  "jroddy06@gmail.com",
  "jroddyob@gmail.com",
  "jrodriguez@sentriforce.com",
  "jthomas@constantsecurity.net",
  "jujurn10@comcast.net",
  "k-nakol@yahoo.com",
  "kaasproperties25@gmail.com",
  "katz4now@hotmail.com",
  "kayleezittrer@gmail.com",
  "kblestarge@gmail.com",
  "kconstanten@hotmail.com",
  "keithcordero@sbcglobal.net",
  "kendra.walker@compass.com",
  "kevingardener2014@gmail.com",
  "kevinplyons@icloud.com",
  "khutalechetan@gmail.com",
  "kpoirrier@aol.com",
  "kumar128@gmail.com",
  "lagiraldillabakery@gmail.com",
  "landmark672002@yahoo.com",
  "larrydoral@gmail.com",
  "lashandamaule@hotmail.com",
  "latashadorsey72304@yahoo.com",
  "ld_texas@yahoo.com",
  "ldmhtx@gmail.com",
  "leland.a.cannon@gmail.com",
  "lemasupply@hotmail.com",
  "levuh@yahoo.com",
  "lgaby1927@gmail.com",
  "lidialva@yahoo.com",
  "linlinheahn@yahoo.com",
  "lisa.a.degraff@gmail.com",
  "lisa@texasreg.com",
  "lise@texasreg.com",
  "lnmercado@amcast.net",
  "lnmercado@comcast.net",
  "lorev767@gmail.com",
  "lpaneso@hotmail.com",
  "luciobazan@hotmail.com",
  "luv2jam85@gmail.com",
  "maggie@charlotte.com.mx",
  "mando.g369@gmail.com",
  "mangal.mirwais14060@gmail.com",
  "marcojec@hotmail.com",
  "marcusdspencer@hotmail.com",
  "mark77379@yahoo.com",
  "markccddsmbao@yahoo.com",
  "markecddsmba@yahoo.com",
  "markus@earl-and-markus.com",
  "matt_kessinger@yahoo.com",
  "maxmmotta@gmail.com",
  "mayhews1115@gmail.com",
  "mbakery@memorialbakery.com",
  "mcmarlison@aol.com",
  "mdolan.tx@gmail.com",
  "meganholtgrave@gmail.com",
  "meilyn.corona@yahoo.com",
  "melissamcclain14@aol.com",
  "melissawong365@gmail.com",
  "mflores4life@aol.com",
  "michaeldavidblanco@gmail.com",
  "mikedelacruz50@yahoo.com",
  "mikey.57255@gmail.com",
  "milmeg@aol.com",
  "miss_nu2@yahoo.com",
  "mjorgeortega@gmail.com",
  "mjsvr@att.net",
  "mmancia@aol.com",
  "morrisondm@gmail.com",
  "morrisondn@gmail.com",
  "mourningcar@gmail.com",
  "mpeek76@gmail.com",
  "mpozos87@gmail.com",
  "mrmichaelbednar@gmail.com",
  "mrstv@att.net",
  "ms.khong@outlook.com",
  "mybulkaccount@yahoo.com",
  "n_nakol@yahoo.com",
  "nahly730@gmail.com",
  "narilynriley@yahoo.com",
  "nathomas580@gmail.com",
  "nathomas80@yahoo.com",
  "nb281171@yahoo.com",
  "ndnguyen@outlook.com",
  "nellycs28@yahoo.com",
  "nermeena.kamal@gmail.com",
  "netocouso@yahoo.com",
  "netocouso@yahoo.es",
  "nhoffman1970@gmail.com",
  "nieser@sbcglobal.net",
  "nuella246@gmail.com",
  "obj.g@att.net",
  "odumbj@gmail.com",
  "olatubosun.funmi@yahoo.com",
  "olga.bonjour@yahoo.com",
  "orlandac36@gmail.com",
  "orthojunkie@gmail.com",
  "orum.michael@gmail.com",
  "pablorubio2123@gmail.com",
  "patriciabermudez@gmail.com",
  "patriciambermudez@gmail.com",
  "paulgerke53@gmail.com",
  "pbrown5353@yahoo.com",
  "pedromanuelantuna@gmail.com",
  "planit3x@gmail.com",
  "prettypawspetspallc@gmail.com",
  "property.hun@ahmadiyya.us",
  "queenbea27@sbcglobal.net",
  "radducci@bldrschoice.com",
  "raidele90@gmail.com",
  "ramonfgarcia@yahoo.com",
  "raulmchdo@yahoo.com",
  "raydele90@gmail.com",
  "raymondweems1@gmail.com",
  "rayologistic@gmail.com",
  "rayologistics@gmail.com",
  "rb08182013@gmail.com",
  "rbenson09.rd@gmail.com",
  "rcj2012@icloud.com",
  "rdcarmi@gmail.com",
  "rdruce@ieee.org",
  "reginaperkins@gmail.com",
  "reginaperkins@sbcglobal.net",
  "renaissancerenovationllc@gmail.com",
  "reynoldsconnor47@gmail.com",
  "ridgejoh30ml@gmail.com",
  "rigos1411@gmail.com",
  "riverstomdriving@sbc.global.net",
  "riverstonedriving@sbcglobal.net",
  "rjstaffeld@yahoo.com",
  "rlacazia@yahoo.com",
  "roberca31@gmail.com",
  "robertahum1992@gmail.com",
  "roberto.dalton@sls.com",
  "robinlhale@peoplepc.com",
  "rodnaisycherilson@yahoo.com",
  "rosalie.schwarz5@gmail.com",
  "roxanavelez95@gmail.com",
  "rskutca@sbcglobal.net",
  "rsolchal@jrbengineering.com",
  "ryanroeske@yahoo.com",
  "s.inclan88@yahoo.com",
  "s.inclan88c@yahoo.com",
  "safresa2013@hotmail.com",
  "safresa2103@hotmail.com",
  "sales@citywidepatios.com",
  "sam.banda@integrallift.com",
  "sandragarcia0103@gmail.com",
  "sandrammvalencia@gmail.com",
  "sanhouty@gmail.com",
  "santihcalifornia@aol.com",
  "sarahaggreh@yahoo.com",
  "sealadetio@gmail.com",
  "shailapochi@gmail.com",
  "shanbay@att.net",
  "sharondwhetstone@gmail.com",
  "shawn.fro@icloud.com",
  "shenshong0125@gmail.com",
  "shih_kang@yahoo.com",
  "shishabraids@yahoo.com",
  "silverbackcollision@live.com",
  "smrk2022@outlook.com",
  "sovonthou@yahoo.com",
  "sschiba786@gmail.com",
  "staciyclark@gmail.com",
  "starr219@gmail.com",
  "steflebrun@doffing.net",
  "stereomann74@gmail.com",
  "stevenflowers@yahoo.com",
  "sunny.timbalia@gmail.com",
  "sv442l@yahoo.com",
  "t.abi13@yahoo.com",
  "tahashujauddin@yahoo.com",
  "tarig.osman007@gmail.com",
  "tarig.osmano07@gmail.com",
  "tdgood111@yahoo.com",
  "teamheitman@hotmail.com",
  "terancegartica@yahoo.com",
  "texaskickboxing@gmail.com",
  "timothy.villanueva@att.net",
  "tndunn13@gmail.com",
  "tolmultiservice@gmail.com",
  "tom.brewer@danerealtytexas.com",
  "tonis@svllc.net",
  "topefolarin@gmail.com",
  "topefolarin@hotmail.com",
  "tosinodetola@hotmail.com",
  "travisself07@yahoo.com",
  "tristatetaxidermy@comcast.net",
  "ttran1188@gmail.com",
  "twalls@superbag.com",
  "twryc@comcast.net",
  "txrealtor@comcast.net",
  "tysonlanch@gmail.com",
  "underbrinkjan@gmail.com",
  "vassolo@gmail.com",
  "vegajoanna07@gmail.com",
  "velazquez77091@hotmail.com",
  "velmashockley@prodigy.net",
  "vernnonhuggans@gmail.com",
  "vesseygiles@gmail.com",
  "vidiliaz@yahoo.com",
  "villedayoni78@gmail.com",
  "vpgarza0501@gmail.com",
  "vrangel425@gmail.com",
  "vsenp8@gmail.com",
  "vsenp8@yahoo.com",
  "waldrep.tom@att.net",
  "weeds1957sparkle@yahoo.com",
  "whbronw@hotmail.com",
  "xavier@as.hn",
  "yglesias1996@icloud.com",
  "yglesias2004@yahoo.com",
  "ykchod@gmail.com",
  "ymmlumm@gmail.com",
  "yoaluz@yahoo.com",
  "yolanager@icloud.com",
  "yudithpedraza@gmail.com",
  "zachary@leveledconcrete.com",
  "zarrarahmad@gmail.com",
  "zelaya_francis@yahoo.com",
];

export const getSidebarNavigation = async () => {
  const campaigns = await getCampaignsListAction();
  return [
    { id: "all", label: "All Campaigns", count: campaigns.length },
    {
      id: "sent",
      label: "Sent",
      count: campaigns.filter((c) => c.sent === true).length,
    },
    {
      id: "not-sent",
      label: "Not Sent",
      count: campaigns.filter((c) => c.sent === false).length,
    },
  ];
};

/** Every official profile, for schema.org `sameAs` (entity linking for search and AI). */
export const businessSameAs = [
  ...businessInfo.socialProfiles.map((profile) => profile.href),
  businessInfo.legacyFacebook,
  businessInfo.mapsUrl,
];
