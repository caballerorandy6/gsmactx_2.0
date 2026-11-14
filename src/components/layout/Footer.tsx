import Link from "next/link";
import Image from "next/image";
import { businessInfo, navigation } from "@/lib/data";
import Facebook from "@/components/icons/Facebook";
import Instagram from "@/components/icons/Instagram";
import TikTok from "@/components/icons/TikTok";
import YouTube from "@/components/icons/YouTube";
import Yelp from "@/components/icons/Yelp";
import Google from "@/components/icons/Google";

interface Social {
  name: string;
  href: string;
  icon: React.ElementType;
}

const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** "08:00" → "8 AM", "20:30" → "8:30 PM" */
function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

/** Groups consecutive days that share the same hours: "Mon–Sat" / "8 AM – 8 PM". */
function groupHours() {
  const byDay = new Map(
    businessInfo.openingHours.map((h) => [
      h.dayOfWeek,
      `${formatTime(h.opens)} – ${formatTime(h.closes)}`,
    ])
  );
  const groups: { days: string; hours: string }[] = [];
  let start = 0;
  for (let i = 1; i <= WEEK.length; i++) {
    const prev = byDay.get(WEEK[i - 1]) ?? "Closed";
    const next = i < WEEK.length ? (byDay.get(WEEK[i]) ?? "Closed") : null;
    if (next !== prev) {
      const first = WEEK[start].slice(0, 3);
      const last = WEEK[i - 1].slice(0, 3);
      groups.push({
        days: start === i - 1 ? WEEK[start] : `${first}–${last}`,
        hours: prev,
      });
      start = i;
    }
  }
  return groups;
}

const phoneDisplay = businessInfo.phone.replace(
  /^\+1-(\d{3})-(\d{3})-(\d{4})$/,
  "($1) $2-$3"
);

const socialIcons: Record<string, Social["icon"]> = {
  Facebook,
  Instagram,
  YouTube,
  TikTok,
  Yelp,
};

const social: Social[] = [
  ...businessInfo.socialProfiles.map((profile) => ({
    name: profile.name,
    href: profile.href,
    icon: socialIcons[profile.name],
  })),
  {
    name: "Google",
    href: businessInfo.mapsUrl,
    icon: Google,
  },
];

const images = [
  {
    src: "/certified.avif",
    alt: "Certified HVAC Contractor - GSM A/C",
    id: "certified",
  },
  {
    src: "/customer.avif",
    alt: "10% New Customer and Referral Discount",
    id: "customer",
  },
  {
    src: "/discount.avif",
    alt: "10% Discount for Seniors and Military",
    id: "discount",
  },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-gray-900 border-t border-white/10">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-20 lg:px-8">
        {/* Badges Section */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          {images.map((image) => (
            <div
              key={image.id}
              className="block"
            >
              <Image
                width={336}
                height={336}
                src={image.src}
                alt={image.alt}
                className="object-contain size-28 opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-12" aria-hidden="true" />

        {/* Name, address, phone, hours and service areas (match the LocalBusiness JSON-LD) */}
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-10 text-center text-sm/6 text-gray-300 sm:grid-cols-3 sm:text-left">
          <div>
            <h2 className="font-semibold text-white">{businessInfo.name}</h2>
            <address className="mt-3 not-italic">
              <a
                href={businessInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {businessInfo.address.street}
                <br />
                {businessInfo.address.city}, {businessInfo.address.state}{" "}
                {businessInfo.address.zip}
              </a>
              <br />
              <a
                href={`tel:${businessInfo.phone}`}
                className="mt-2 inline-block font-semibold text-white hover:text-primary-300 transition-colors"
              >
                {phoneDisplay}
              </a>
            </address>
          </div>
          <div>
            <h2 className="font-semibold text-white">Hours</h2>
            <dl className="mt-3 space-y-1">
              {groupHours().map((g) => (
                <div
                  key={g.days}
                  className="flex justify-center gap-x-3 sm:justify-start"
                >
                  <dt className="w-16 shrink-0 text-right text-gray-400 sm:w-20 sm:text-left">{g.days}</dt>
                  <dd className="tabular-nums">{g.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-semibold text-white">Service areas</h2>
            <p className="mt-3">
              {businessInfo.serviceAreas.slice(0, -1).join(", ")} and{" "}
              {businessInfo.serviceAreas.at(-1)}.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm/6 mb-10"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-white transition-colors duration-200 font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-x-4 mb-10">
          {social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-gray-400 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-primary-400"
            >
              <span className="sr-only">
                GSM A/C on {item.name} (opens in a new tab)
              </span>
              <item.icon aria-hidden="true" className="size-6" />
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8" aria-hidden="true" />

        {/* Copyright & Credits */}
        <div className="text-center space-y-2 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-400">
            {`© ${new Date().getFullYear()} GSM A/C & General Contractor INC.`}
          </p>
          <p className="text-xs text-gray-400">All rights reserved.</p>
          <p className="mt-4 text-xs text-gray-400">
            Developed by{" "}
            <Link
              href="https://rcweb.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 font-semibold hover:text-white transition-colors"
            >
              RC Web Solutions LLC
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
