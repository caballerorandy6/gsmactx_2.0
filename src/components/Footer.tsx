import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/libs/data";
import Facebook from "./icons/Facebook";
import Google from "./icons/Google";
import { LockClosedIcon } from "@heroicons/react/24/outline";

interface Social {
  name: string;
  href: string;
  icon: React.ElementType;
}

const social: Social[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/gsmactx/?ref=page_internal",
    icon: Facebook,
  },
  {
    name: "Google",
    href: "https://www.google.com/maps/place/G+S+M+A%2FC+%26+General+Contractor+INC./@29.8801535,-95.7088008,15z/data=!4m6!3m5!1s0x8640d7a7761d3e75:0x5aa72afac9b36840!8m2!3d29.8801145!4d-95.7088761!16s%2Fg%2F11n5cyv1cm?entry=ttu",
    icon: Google,
  },
];

const images = [
  {
    src: "/certified.avif",
    alt: "Certified",
    id: "certified",
  },
  {
    src: "/customer.avif",
    alt: "Customer Satisfaction",
    id: "customer",
  },
  {
    src: "/discount.avif",
    alt: "Discount for Seniors and Military",
    id: "discount",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/10">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-20 lg:px-8">
        {/* Badges Section */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          {images.map((image) => (
            <div
              key={image.id}
              className="transition-transform duration-300 hover:scale-110"
            >
              <Image
                width={100}
                height={100}
                src={image.src}
                alt={image.alt}
                priority={false}
                className="object-contain w-28 h-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-12" />

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
        <div className="flex justify-center gap-x-8 mb-10">
          {social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" />
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Copyright & Credits */}
        <div className="text-center space-y-2 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-400">
            {`© ${new Date().getFullYear()} GSM A/C & General Contractor INC.`}
          </p>
          <p className="text-xs text-gray-500">All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4">
            <p className="text-xs text-gray-500">
              Developed by{" "}
              <span className="text-gray-400 font-semibold">RC WEB</span>
            </p>
            <span className="text-gray-700">•</span>
            <Link
              href="/admin-dashboard"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              <LockClosedIcon className="h-3 w-3" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
