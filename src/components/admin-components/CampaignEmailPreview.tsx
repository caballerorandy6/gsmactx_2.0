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
    <div className="bg-gray-100 p-8">
      <div className="max-w-[600px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with gradient background */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "50px 32px",
            textAlign: "center",
          }}
        >
          <Image
            src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
            width={240}
            height={80}
            alt="GSMACTX Logo"
            className="mx-auto"
          />
        </div>

        {/* Subject Line Preview */}
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Subject:</p>
          <p className="text-sm font-semibold text-gray-800">{subject}</p>
        </div>

        {/* Title Section */}
        <div className="px-8 py-12">
          <h1
            className="text-gray-900 text-4xl font-bold text-center"
            style={{ lineHeight: "1.2", letterSpacing: "-0.5px" }}
          >
            {title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="px-8 pb-10">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Campaign Image"
              width={600}
              height={300}
              className="w-full rounded-2xl mb-8 shadow-md"
            />
          )}
          <p
            className="text-gray-700 text-lg whitespace-pre-wrap"
            style={{ lineHeight: "1.7" }}
          >
            {content}
          </p>
        </div>

        {/* CTA Buttons Section */}
        <div className="px-8 py-12 text-center">
          <a
            href="tel:+12812354684"
            className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-base mr-3 mb-3 shadow-lg hover:shadow-xl transition-all hover:bg-indigo-700"
          >
            📞 Call Now
          </a>
          <a
            href="https://gsmactx.com"
            className="inline-block bg-white text-indigo-600 border-2 border-indigo-600 px-10 py-4 rounded-xl font-semibold text-base mb-3 hover:bg-indigo-50 transition-colors"
          >
            🌐 Visit Website
          </a>
        </div>

        <hr className="border-gray-200" />

        {/* Footer Section */}
        <div className="px-8 py-10 bg-gray-50 text-center">
          <p className="text-gray-600 text-base mb-4 font-medium">
            📍 Cypress, TX | ☎️ (281) 235-4684 | 🌐 gsmactx.com
          </p>
          <p className="text-gray-400 text-sm mb-3">
            <a href="#" className="text-gray-600 underline">
              Unsubscribe from emails
            </a>
          </p>
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} GSMACTX, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignEmailPreview;
