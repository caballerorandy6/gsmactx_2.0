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
  //subject,
  title,
  content,
  imageUrl,
}: CampaignEmailPreviewProps) => {
  return (
    <div className="bg-[#f3f4f6] p-4 sm:p-8">
      <div className="max-w-[600px] mx-auto bg-white shadow-lg overflow-hidden">
        {/* Modern Hero Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            padding: "25px 40px 20px",
            textAlign: "center",
          }}
          className="px-5 sm:px-10"
        >
          <Image
            src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
            width={420}
            height={140}
            alt="GSMACTX Logo"
            className="mx-auto mb-5 w-[330px] sm:w-[420px]"
          />
          <p className="text-white text-sm font-semibold uppercase tracking-widest opacity-95 m-0">
            Your Trusted HVAC Partner
          </p>
        </div>

        {/* Orange accent bar */}
        <div style={{ height: "6px", background: "#f59e0b" }}></div>

        {/* Title Section with modern style */}
        <div className="px-6 sm:px-10 py-10 bg-white">
          <h1
            className="text-[#1e3a8a] text-[26px] sm:text-4xl font-extrabold text-center mb-3"
            style={{ lineHeight: "1.2", letterSpacing: "-0.03em" }}
          >
            {title}
          </h1>
          <div className="w-[60px] h-1 bg-[#f59e0b] mx-auto rounded-sm"></div>
        </div>

        {/* Content Section with Card */}
        <div className="px-[30px] pb-[30px] bg-white">
          {imageUrl && (
            <div className="bg-[#f9fafb] rounded-2xl p-5 mb-7">
              <Image
                src={imageUrl}
                alt="Campaign Image"
                width={300}
                height={150}
                className="w-full max-w-full rounded-xl shadow-md"
              />
            </div>
          )}
          <div className="bg-[#f8fafc] border-l-4 border-[#3b82f6] rounded-lg p-6 sm:px-7">
            <p
              className="text-gray-700 text-base whitespace-pre-wrap m-0"
              style={{ lineHeight: "1.8" }}
            >
              {content}
            </p>
          </div>
        </div>

        {/* CTA Buttons Section */}
        <div className="px-[30px] py-9 text-center bg-white">
          <p className="text-[#1e3a8a] text-lg font-bold mb-6">
            Ready to Get Started?
          </p>
          <Link
            href="tel:+12812354684"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
              boxShadow: "0 6px 24px rgba(245, 158, 11, 0.35)",
            }}
            className="inline-block text-white px-10 py-[18px] rounded-xl font-bold text-base mx-[6px] mb-4 hover:shadow-2xl transition-all w-full sm:w-auto max-w-[280px] sm:max-w-none"
          >
            📞 Call Now: (281) 235-4684
          </Link>
          <Link
            href="https://gsmactx.com"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              boxShadow: "0 6px 24px rgba(59, 130, 246, 0.3)",
            }}
            className="inline-block text-white px-10 py-[18px] rounded-xl font-bold text-base mx-[6px] mb-4 hover:shadow-2xl transition-all w-full sm:w-auto max-w-[280px] sm:max-w-none"
          >
            🌐 Visit Our Website
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="px-10 py-[30px] bg-[#f8fafc]">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-[10px]">
              <div className="text-[28px] mb-2">⚡</div>
              <p className="text-[13px] font-semibold text-[#1e3a8a] mb-1 m-0">
                Fast Service
              </p>
              <p className="text-[11px] text-gray-600 m-0">Same Day</p>
            </div>
            <div className="p-[10px]">
              <div className="text-[28px] mb-2">✓</div>
              <p className="text-[13px] font-semibold text-[#1e3a8a] mb-1 m-0">
                Licensed
              </p>
              <p className="text-[11px] text-gray-600 m-0">& Insured</p>
            </div>
            <div className="p-[10px]">
              <div className="text-[28px] mb-2">⭐</div>
              <p className="text-[13px] font-semibold text-[#1e3a8a] mb-1 m-0">
                5-Star Rated
              </p>
              <p className="text-[11px] text-gray-600 m-0">By Customers</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 m-0" />

        {/* Rich Footer Section */}
        <div className="px-10 py-10 text-center bg-[#1e3a8a]">
          <p className="text-white text-base font-bold mb-2 m-0">GSMACTX</p>
          <p className="text-[#93c5fd] text-[13px] font-medium mb-6 m-0">
            Your Trusted HVAC Partner in Texas
          </p>

          <div className="mb-6">
            <div className="py-2">
              <p className="text-white text-xs font-semibold m-0">
                📍 Cypress, TX
              </p>
            </div>
            <div className="py-2">
              <a
                href="tel:+12812354684"
                className="text-[#f59e0b] text-sm font-bold no-underline"
              >
                ☎️ (281) 235-4684
              </a>
            </div>
            <div className="py-2">
              <a
                href="https://gsmactx.com"
                className="text-[#93c5fd] text-xs no-underline"
              >
                🌐 www.gsmactx.com
              </a>
            </div>
          </div>

          <hr className="border-white/10 my-5" />

          <p className="text-[#93c5fd] text-[11px] mb-2 m-0">
            <a href="#" className="text-[#93c5fd] underline">
              Unsubscribe from emails
            </a>
          </p>
          <p className="text-[#6b7fd1] text-[10px] m-0">
            © {new Date().getFullYear()} GSMACTX, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignEmailPreview;
