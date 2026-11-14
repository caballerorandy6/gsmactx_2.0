import { allServices, businessInfo } from "@/lib/data";

export const dynamic = "force-static";

const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const to12h = (time: string) => {
  const hour = Number(time.split(":")[0]);
  return `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
};

/**
 * Plain-text summary of the business for AI search tools (llms.txt standard).
 * Built from businessInfo/allServices so it never drifts from the site.
 * Only verified facts: no offers, ratings or claims pending owner review.
 */
export function GET() {
  const { name, website, address, serviceAreas, established } = businessInfo;
  const phone = formatPhone(businessInfo.phone);
  const firstDay = businessInfo.openingHours[0];
  const lastDay = businessInfo.openingHours.at(-1)!;

  const body = `# ${name}

> HVAC company in Cypress, Texas, serving homes and businesses since ${established}. We install and repair air conditioning and heating systems, sanitize air ducts and insulate attics across Cypress, Houston, Katy and nearby areas.

## Key facts

- Business: ${name}
- Address: ${address.fullAddress}
- Phone: ${phone}
- Hours: ${firstDay.dayOfWeek}–${lastDay.dayOfWeek}, ${to12h(firstDay.opens)} to ${to12h(firstDay.closes)}; Sunday closed
- Service areas: ${serviceAreas.join(", ")}, TX
- In business since: ${established}
- Book online: ${website}/book-appointment
- Google Maps: ${businessInfo.mapsUrl}

## Services

${allServices.map((s) => `- [${s.name}](${website}${s.href})`).join("\n")}

## Main pages

- [Home](${website}/): About the company, services, customer reviews, contact and FAQ
- [All services](${website}/services): Overview of every service with common questions
- [Book an appointment](${website}/book-appointment): Choose a service, date and time online
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
