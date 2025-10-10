import Image from "next/image";

interface CampaignEmailPreviewProps {
  subject: string;
  title: string;
  content: string;
  imageUrl?: string;
  recipientEmail: string;
  unsubscribeUrl: string;
}

const CampaignEmailPreview = ({
  subject,
  title,
  content,
  imageUrl,
}: CampaignEmailPreviewProps) => {
  return (
    <div className="bg-[#f9fafb] p-4 sm:p-8">
      <div className="max-w-[600px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header with professional gradient */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
            padding: "45px 40px",
            textAlign: "center",
          }}
        >
          <Image
            src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
            width={280}
            height={93}
            alt="GSMACTX Logo"
            className="mx-auto"
          />
        </div>

        {/* Subject Line Preview */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 sm:px-8 py-3 border-b border-gray-200">
          <p className="text-xs text-gray-600 mb-1 font-medium">Subject:</p>
          <p className="text-sm font-semibold text-gray-800">{subject}</p>
        </div>

        {/* Title Section */}
        <div className="px-6 sm:px-10 py-10 sm:py-11">
          <h1
            className="text-gray-900 text-3xl sm:text-[34px] font-bold text-center"
            style={{ lineHeight: "1.25", letterSpacing: "-0.02em" }}
          >
            {title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="px-6 sm:px-10 pb-9">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Campaign Image"
              width={400}
              height={200}
              className="w-full max-w-[400px] mx-auto rounded-xl mb-7 shadow-sm border border-gray-200"
            />
          )}
          <div className="max-w-[520px] mx-auto px-5">
            <p
              className="text-gray-600 text-base whitespace-pre-wrap"
              style={{ lineHeight: "1.75" }}
            >
              {content}
            </p>
          </div>
        </div>

        {/* CTA Buttons Section */}
        <div className="px-6 sm:px-10 py-10 sm:py-11 text-center">
          <a
            href="tel:+12812354684"
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
            }}
            className="inline-block text-white px-8 sm:px-9 py-3.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-[15px] mr-0 sm:mr-2 mb-3.5 shadow-md hover:shadow-lg transition-all"
          >
            📞 Call Now: (281) 235-4684
          </a>
          <a
            href="https://gsmactx.com"
            className="inline-block bg-white text-blue-700 border-2 border-blue-700 px-8 sm:px-9 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-[15px] mb-3.5 hover:bg-blue-50 transition-colors shadow-sm"
          >
            🌐 Visit Our Website
          </a>
        </div>

        <hr className="border-gray-200" />

        {/* Footer Section */}
        <div className="px-6 sm:px-10 py-9 bg-gray-50 text-center">
          <p className="text-gray-600 text-sm mb-4 font-medium">
            GSMACTX - Your Trusted HVAC Partner
          </p>
          <p className="text-gray-600 text-[13px] mb-3.5">
            📍 Cypress, TX | ☎️ (281) 235-4684 | 🌐 gsmactx.com
          </p>
          <p className="text-gray-400 text-xs mb-2.5">
            <a href="#" className="text-gray-600 underline">
              Unsubscribe
            </a>
          </p>
          <p className="text-gray-400 text-[11px]">
            © {new Date().getFullYear()} GSMACTX, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignEmailPreview;
