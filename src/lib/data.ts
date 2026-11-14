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
  },
  {
    title: "Air Conditioning Repair",
    description:
      "When it comes to AC or HVAC repair, we are the specialists that you should contact. Our technicians can quickly pinpoint and remedy or replace defective parts and components.",
    link: "Learn more",
    href: "/services/air-conditioning-repair",
    src: "/service2-800.avif",
  },
  {
    title: "Heating Installation",
    description:
      "Apart from installing ACs and HVACs, we can also set up heating devices. We strive to choose locations that offer maximum coverage so our customers can heat their properties without using too much energy.",
    link: "Learn more",
    href: "/services/heating-installation",
    src: "/service3-800.avif",
  },
  {
    title: "Heating Repair",
    description:
      "Use our office & home heating repair services to remedy problematic heating units. We can repair or replace faulty parts to restore the original functionality of the devices. Our prices are pocket-friendly and you will get your money's worth.",
    link: "Learn more",
    href: "/services/heating-repair",
    src: "/service4-800.avif",
  },
  {
    title: "Air Duct Sanitizing",
    description:
      "Customers can trust us with the cleaning and sanitizing of their air ducts. We have the products and tools to eliminate harmful particles such as dust, dirt, allergens, germs, etc. We can keep your vents pristine.",
    link: "Learn more",
    href: "/services/air-duct-sanitizing",
    src: "/service5-800.avif",
  },
  {
    title: "Attic Insulation",
    description:
      "We provide expert attic insulation services to enhance your home's energy efficiency. Our work helps lower heating and cooling costs while keeping your living space comfortable all year.",
    link: "Learn more",
    href: "/services/attic-insulation",
    src: "/service6-800.avif",
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
    name: "Call us at (281) 235-4684 to take advantage of our impeccable heating repair services!",
    description:
      "Book our affordable AC replacement services and other options by calling us now. Our phone operators will gladly answer your questions. You can find our number on our homepage. Let us know how we can help you!",
  },
];

export const servicesIntro = [
  {
    name: "",
    description:
      "If you are planning to have a new home constructed in Cypress, TX, one of the first things that you would need to do is to choose a reliable and professional heating installation company. This is one of the most essential parts of the house, especially if you want to be comfortable inside your own home. This is why you should always make sure to hire GSM A/C & General Contractor INC. when it comes to the heating system in your home. Here are some benefits to hiring home heating repair experts like us:",
  },
  {
    mame: "Professionals can provide you with a system that is efficient and works well with the house",
    description:
      "When it comes to the heating installation of your home you would not only be dealing with the actual installation of the furnace or air conditioner or the wiring of your heating system you would also be dealing with the type of system you should have for your home. You would also have to consider the climate of your area and the design of your house when you are deciding which kind of system to buy. When you leave the heating installation to us, you would no longer have to worry about any of this. We can guide you in buying the right system for your home and your area.",
  },
  {
    name: "Professionals have the skills and training to do the job",
    description:
      "Another reason why it is better to leave the installation of the system to professionals like us is because we would already be trained to handle such a complicated task and install the right kind of heating system for your home. You would not have to worry about anything during or after the installation, we would be responsible for it. If you want to make sure that the heating system installed in your home in Cypress, TX is up to par with the standards of the industry, hire experts. GSM A/C & General Contractor INC. offers a reliable home heating repair and installation service that you can count on. If you need more information about the services we offer, give us a call at (281) 235-4684 and let us address your concerns.",
  },
];

export const air_conditioning_installation = [
  {
    name: "",
    description:
      "You should not delay when it comes to replacing your old and damaged air conditioning system. Doing so means you are going to end up spending more money on recurring repairs and potentially more damage. When it's already very old, it means a lot more frequent repairs will be needed. This isn't something that you’d want to happen. Save yourself from that. If it's the cost of our quality air conditioning replacement services you are worried about, there is GSM A/C & General Contractor INC. that can offer you really affordable rates for the high-quality services that we provide. Our affordable AC replacement services are just a call away from the property owners in the Cypress, TX area.",
  },
  {
    name: " When Replacing an AC System",
    description:
      "Air conditioning systems can be tricky to deal with, especially if you have no experience whatsoever. You need the expertise and proper training as well as the right tools in order to successfully replace an air conditioning system. It can get quite overwhelming planning the entire replacement process. So, you should leave the job to professionals like us. We can determine which air conditioning system will work best for your home or workplace, and we'll handle the replacement process from start to end.",
  },
  {
    name: "We Can Replace Air Conditioning Systems!",
    description:
      "Our air conditioning replacement service is all about using the right tools and following the correct procedures so that the new air conditioning system will be installed according to industry standards. We'll prepare the tools needed for the replacement task, including proper sealants and fixatives. We'll then proceed to remove the existing air conditioning system, making sure we do it correctly so that we won't cause any kind of damage to the wall behind the AC unit. We'll then install the new AC system, making sure we double-check our work for accuracy. If your air conditioning system is too old, you know who to call for a successful replacement.",
  },
  {
    name: "",
    description:
      "When it comes to affordable AC replacement services in Cypress, TX, you can always rely on GSM A/C & General Contractor INC. To book our services, feel free to call us at (281) 235-4684 today!",
  },
];

export const air_conditioning_repair = [
  {
    name: "",
    description:
      "Even if you’re careful with your AC maintenance, there will come a time when it will break down on you. Frequent AC malfunctions can be a result of underlying problems in your HVAC system. Don’t wait for it to get worse. Have it fixed now! There is nothing to fret about that because you can always rely on GSM A/C & General Contractor INC. for a quick and quality AC repair service. We offer immediate HVAC repair solutions to property owners in the Cypress, TX area, so don’t hesitate to call us!",
  },
  {
    name: " Is it time for a repair?",
    description:
      "You should have your air conditioning fixed as soon as possible once it starts to malfunction. You need not wait for days to come and go without using your AC. Ensure you get the repair done in a single sitting. That is only possible when you turn to our team for the repair job. We respond to all calls right, and we complete the air conditioning repair task in a timely manner, ensuring excellent workmanship.",
  },
  {
    name: "It is time to call our experts!",
    description:
      "When it’s time to have your air conditioning unit fixed, don’t hesitate to call us right away. You can expect our technicians to promptly respond to your calls and provide you with an efficient repair service. We can guarantee to provide you with long-lasting repair solutions at all times. We have the skills, tools, and other equipment that allow us to complete the repair work in a timely manner. Rest assured that there will be no damage that will be left untreated.",
  },
  {
    name: "",
    description:
      "Once you notice signs of AC failure, call GSM A/C & General Contractor INC. for a reliable air conditioning repair service right away. Don’t delay as it can only lead to more problems. If you’re looking for a reliable AC technician in Cypress, TX, you now know which one to call for the job. To book our HVAC repair services, feel free to give us a call at (281) 235-4684 today!",
  },
];

export const heating_installation = [
  {
    name: "",
    description:
      "If you are planning to have a new home constructed in Cypress, TX, one of the first things that you would need to do is to choose a reliable and professional heating installation company. This is one of the most essential parts of the house, especially if you want to be comfortable inside your own home. This is why you should always make sure to hire GSM A/C & General Contractor INC. when it comes to the heating system in your home. Here are some benefits to hiring home heating repair experts like us:",
  },
  {
    name: "Professionals can provide you with a system that is efficient and works well with the house",
    description:
      "When it comes to the heating installation of your home you would not only be dealing with the actual installation of the furnace or air conditioner or the wiring of your heating system you would also be dealing with the type of system you should have for your home. You would also have to consider the climate of your area and the design of your house when you are deciding which kind of system to buy. When you leave the heating installation to us, you would no longer have to worry about any of this. We can guide you in buying the right systemb for your home and your area.",
  },
  {
    name: " Professionals have the skills and training to do the job",
    description:
      "Another reason why it is better to leave the installation of the system to professionals like us is because we would already be trained to handle such a complicated task and install the right kind of heating system for your home. You would not have to worry about anything during or after the installation, we would be responsible for it. If you want to make sure that the heating system installed in your home in Cypress, TX is up to par with the standards of the industry, hire experts. GSM A/C & General Contractor INC. offers a reliable home heating repair and installation service that you can count on. If you need more information about the services we offer, give us a call at (281) 235-4684 and let us address your concerns.",
  },
];

export const heating_repair = [
  {
    name: "",
    description:
      "You need to be careful around your home’s HVAC system. This is because it is a complex system that keeps a home at a comfortable temperature. Your HVAC system also helps regulate the temperature and humidity in your home. You should keep your HVAC system in great condition if you want to keep your family comfortable. You can do this by calling a reliable heating repair service. GSM A/C & General Contractor INC. is a highly recommended company that you can trust in Cypress, TX when it comes to your heating repair needs.",
  },
  {
    name: "Why Fix Your HVAC System Right Away",
    description:
      "Some signs will tell you that your HVAC system needs immediate repair. Strange odors, vibrations, and sounds emanating from your HVAC system should not be ignored. Once signs of HVAC failure show, you must take action right away. Damage will increase in proportion to how long you wait. This means higher repair costs. The best course of action is an immediate repair to stop further harm. Avoid taking the DIY route, though, because doing so can potentially lead to more problems. If you have some HVAC repair experts like us, you don’t need to worry about the cost, as we provide some of the best HVAC service rates.",
  },
  {
    name: "Let Us Fix Your Heating System",
    description:
      "We have extensive training in the repair of complex HVAC systems. We can handle any HVAC work because we have the experience, knowledge, and abilities. We have the equipment to perform any HVAC repair service. With us, you can guarantee the best solution for your damaged HVAC system. We can guarantee efficient service and quality solutions because we operate with a high-standard checklist as part of our HVAC repair process. With years of experience, trusting a professional like GSM A/C & General Contractor INC. is the right choice. If you need our quality heating repair service in Cypress, TX, feel free to contact us at (281) 235-4684 right away!",
  },
];

export const air_duct_sanitizing = [
  {
    name: "",
    description:
      "The negative impacts of mold and dust are significantly decreased by cleaning up the contaminants from your air duct system. Those who are susceptible to indoor air pollution, especially those with allergies, should breathe clean, healthy air that is constantly flowing. We provide quality HVAC services that also include special air duct sanitizing services. Here are the top 4 comfort-related reasons why you need GSM A/C & General Contractor INC.",
  },
  {
    name: "Cleaner Home Environment",
    description:
      "After a few hours of inactivity, dust in your ductwork begins to collect like it does everywhere else in your house in Cypress, TX. The dust starts to move when the system turns on, but it doesn’t stay in the ductwork. It enters your home through the walls and floors and settles into the carpeting, furniture, and bedding. Your home will become a cleaner environment to live in if you remove dust from within.",
  },
  {
    name: "Better Air Quality",
    description:
      "What level of air quality are you breathing? Cleaner air keeps your family safe even if no one in your home has allergies or respiratory issues. Every time you breathe in dangerous pollutants and dust, it may cause sneezing and coughing, as well as have an impact on your sinuses and bronchial congestion. You’ll always have cleaner air to breathe if you keep your air ducts clean.",
  },
  {
    name: "Fewer Irritants",
    description:
      "Your air ducts contain more than just dust. There are also contaminants and harmful microorganisms there. The air you breathe may contain bacteria, pollen, mildew, pet dander, and other contaminants. Instead of recirculating possible issues, our routine air duct cleaning services can help keep your family far healthier.",
  },
  {
    name: "Better Odor",
    description:
      "Every house has a distinct aroma. It’s not always the most enjoyable experience. Stale odours can develop over time and can be caused by a variety of things, including mildew, paint fumes, tobacco usage, food, cleaning supplies, and pets. You’ll have a house with a fresher scent thanks to our thorough cleaning of the air ducts, which helps remove aromas that are trapped in dust particles.",
  },
  {
    name: "",
    description:
      "Call GSM A/C & General Contractor INC. at (281) 235-4684 if you require our air duct cleaning & sanitizing services for your property in Cypress, TX. You can also call our team for quality HVAC services.",
  },
];

export const attic_insulation = [
  {
    name: "",
    description:
      "Customers can trust us with the cleaning and sanitizing of their air ducts. We have the products and tools to eliminate harmful particles such as dust, dirt, allergens, germs, etc. We can keep your vents pristine.",
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
      "You can schedule a service by contacting us through our website or calling our customer service number.",
  },
  {
    question: "Do you provide emergency HVAC services?",
    answer:
      "Yes, we provide emergency HVAC services to ensure your comfort and safety at all times.",
  },
];

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
