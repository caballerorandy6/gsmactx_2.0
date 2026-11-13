import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  href?: string;
}

const ServiceCard = ({
  title,
  description,
  imageUrl,
  link,
  href = "/services",
}: ServiceCardProps) => {
  return (
    <article className="group flex p-px h-full">
      <div className="flex flex-col overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 transition-all duration-300 hover:ring-white/30 hover:shadow-lg hover:shadow-primary-500/10">
        {/* Image container with responsive height */}
        <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
          <Image
            width={500}
            height={300}
            alt={`${title} - Professional HVAC service in Cypress and Houston, TX`}
            src={imageUrl}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
        </div>
        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-pretty text-white">
            {title}
          </h3>
          <p className="mt-2 sm:mt-3 text-sm/6 text-gray-300 flex-1">{description}</p>
          <Link
            href={href}
            className="mt-3 inline-flex items-center text-xs sm:text-sm font-semibold text-primary-400 hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded transition-colors"
          >
            <span>{link}</span>
            <span className="sr-only"> about {title}</span>
            <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
