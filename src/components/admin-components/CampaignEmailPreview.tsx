import Image from "next/image";
import Link from "next/link";

interface CampaignEmailPreviewProps {
  subject: string;
  title: string;
  content: string;
  imageUrl?: string;
  recipientEmail: string;
  unsubscribeUrl: string;
}

const CampaignEmailPreview = ({
  title,
  content,
  imageUrl,
}: CampaignEmailPreviewProps) => {
  return (
    <div className="bg-[#f5f7fa] p-4 sm:p-8">
      <div className="max-w-[600px] mx-auto bg-white shadow-xl overflow-hidden rounded-xl">
        {/* HEADER — reduced height, logo same size */}
        <div
          className="relative flex flex-col items-center justify-center text-center overflow-visible"
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
            height: "180px", // half height of previous header
          }}
        >
          <div
            className="absolute inset-0 flex justify-center items-center"
            style={{
              top: "40%",
              transform: "translateY(-25%)", // lifts logo upward slightly
            }}
          >
            <Image
              src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
              width={728}
              height={243}
              alt="GSMACTX Logo"
              className="mx-auto w-[546px] sm:w-[728px] object-contain"
              style={{
                maxHeight: "243px",
                height: "auto",
              }}
            />
          </div>

          <p className="text-white text-[12px] font-semibold uppercase tracking-widest opacity-90 absolute bottom-2">
            Your Trusted HVAC Partner
          </p>
        </div>

        {/* Accent bar */}
        <div style={{ height: "5px", background: "#f59e0b" }}></div>

        {/* Title */}
        <div className="px-6 sm:px-10 py-8 bg-white text-center">
          <h1 className="text-[#1e3a8a] text-2xl sm:text-[30px] font-extrabold mb-3 leading-tight">
            {title}
          </h1>
          <div className="w-[70px] h-[3px] bg-[#f59e0b] mx-auto rounded-md"></div>
        </div>

        {/* Content */}
        <div className="bg-white px-6 sm:px-10 pb-8">
          {imageUrl && (
            <div className="flex justify-center mb-6">
              <div className="relative w-full max-w-[460px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={imageUrl}
                  alt="Campaign Image"
                  width={460}
                  height={208} // 20% less than 260px
                  className="object-cover w-full"
                  style={{ height: "208px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          <div className="bg-[#f9fafb] border-l-4 border-[#3b82f6] rounded-md p-5 sm:p-6">
            <p
              className="text-[#334155] text-[15px] leading-7 whitespace-pre-wrap m-0"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {content}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 sm:px-10 py-8 text-center bg-white">
          <p className="text-[#1e3a8a] text-lg font-bold mb-5">
            Ready to Get Started?
          </p>
          <Link
            href="tel:+12812354684"
            className="inline-block text-white text-[15px] font-semibold px-8 py-3 rounded-lg mx-2 mb-3 transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
              boxShadow: "0 4px 14px rgba(245, 158, 11, 0.3)",
            }}
          >
            📞 +1 (281) 235-4684
          </Link>
          <Link
            href="https://www.gsmactx.com"
            className="inline-block text-white text-[15px] font-semibold px-8 py-3 rounded-lg mx-2 mb-3 transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
            }}
          >
            🌐 Visit Our Website
          </Link>
        </div>

        {/* Features */}
        <div className="px-8 py-8 bg-[#f9fafb]">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: "⚡", title: "Fast Service", subtitle: "Same Day" },
              { icon: "✓", title: "Licensed", subtitle: "& Insured" },
              { icon: "⭐", title: "5-Star Rated", subtitle: "By Customers" },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-[28px] mb-1 text-yellow-400">
                  {item.icon}
                </div>
                <p className="text-[#1e3a8a] text-[13px] font-semibold m-0">
                  {item.title}
                </p>
                <p className="text-gray-600 text-[11px] m-0">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1e3a8a] text-center px-8 py-8">
          <p className="text-white text-[15px] font-bold mb-1">GSMACTX</p>
          <p className="text-[#bfdbfe] text-[13px] mb-5">
            Your Trusted HVAC Partner in Texas
          </p>

          <div className="mb-6 space-y-1">
            <p className="text-white text-xs font-semibold">📍 Cypress, TX</p>
            <Link
              href="tel:+12812354684"
              className="text-[#fbbf24] text-sm font-bold no-underline"
            >
              ☎️ +1 (281) 235-4684
            </Link>
            <br />
            <Link
              href="https://www.gsmactx.com"
              className="text-[#93c5fd] text-xs no-underline"
            >
              🌐 www.gsmactx.com
            </Link>
          </div>

          <hr className="border-white/10 my-4" />

          <p className="text-[#93c5fd] text-[11px] mb-2">
            <Link
              href="https://www.gsmactx.com/unsubscribe"
              className="underline text-[#bfdbfe]"
            >
              Unsubscribe from emails
            </Link>
          </p>
          <p className="text-[#6b7fd1] text-[10px] m-0 mx-auto ">
            © {new Date().getFullYear()} GSMACTX, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignEmailPreview;
