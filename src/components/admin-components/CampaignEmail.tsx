import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import { CampaignEmailProps } from "@/libs/interfaces";

const CampaignEmail = ({
  subject,
  title,
  content,
  imageUrl,
  unsubscribeUrl,
}: CampaignEmailProps) => {
  return (
    <Html>
      <Tailwind>
        <Head>
          <style>
            {`
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              }

              .cta-button {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white !important;
                padding: 14px 32px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                display: inline-block;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              }

              .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                color: white !important;
              }

              .secondary-button {
                background: white;
                color: #667eea !important;
                border: 2px solid #667eea;
                padding: 12px 30px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                display: inline-block;
                transition: all 0.3s ease;
              }

              .secondary-button:hover {
                background: #667eea;
                color: white !important;
              }

              @media (max-width: 600px) {
                .stack-column-mobile {
                  display: block !important;
                  width: 100% !important;
                  padding: 0 !important;
                  max-width: 100% !important;
                }
                .header-logo {
                  text-align: center !important;
                  margin-bottom: 20px !important;
                }
                .header-title {
                  text-align: center !important;
                }
                .content-image {
                  margin-bottom: 20px !important;
                }
                .cta-button, .secondary-button {
                  display: block !important;
                  width: 90% !important;
                  margin: 10px auto !important;
                  text-align: center;
                }
              }
            `}
          </style>
        </Head>
        <Preview>{subject}</Preview>
        <Body style={{ backgroundColor: "#f3f4f6" }}>
          <Container style={{
            backgroundColor: "white",
            margin: "40px auto",
            padding: "0",
            borderRadius: "16px",
            maxWidth: "600px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            {/* Header with gradient background */}
            <Section style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "50px 32px",
              textAlign: "center"
            }}>
              <Img
                src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
                width="240"
                alt="GSMACTX Logo"
                style={{ margin: "0 auto", display: "block" }}
              />
            </Section>

            {/* Title Section */}
            <Section style={{ padding: "48px 32px 24px" }}>
              <Heading style={{
                color: "#1f2937",
                fontSize: "32px",
                fontWeight: "700",
                margin: "0 0 20px",
                lineHeight: "1.2",
                textAlign: "center",
                letterSpacing: "-0.5px"
              }}>
                {title}
              </Heading>
            </Section>

            {/* Content Section */}
            <Section style={{ padding: "0 32px 40px" }}>
              {imageUrl && (
                <Img
                  src={imageUrl}
                  alt="Campaign Image"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    marginBottom: "32px",
                    display: "block",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                />
              )}
              <Text style={{
                color: "#374151",
                fontSize: "17px",
                lineHeight: "1.7",
                margin: "0",
                whiteSpace: "pre-wrap",
                textAlign: "left"
              }}>
                {content}
              </Text>
            </Section>

            {/* CTA Buttons Section */}
            <Section style={{ padding: "32px 32px 48px", textAlign: "center" }}>
              <Link
                className="cta-button"
                href="tel:+12812354684"
                style={{
                  backgroundColor: "#667eea",
                  color: "white",
                  padding: "16px 40px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  display: "inline-block",
                  margin: "0 8px 12px"
                }}
              >
                📞 Call Now
              </Link>
              <Link
                className="secondary-button"
                href="https://gsmactx.com"
                style={{
                  backgroundColor: "white",
                  color: "#667eea",
                  border: "2px solid #667eea",
                  padding: "14px 38px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  display: "inline-block",
                  margin: "0 8px 12px"
                }}
              >
                🌐 Visit Website
              </Link>
            </Section>

            <Hr style={{ borderColor: "#e5e7eb", margin: "0" }} />

            {/* Footer Section */}
            <Section style={{
              padding: "40px 32px",
              textAlign: "center",
              backgroundColor: "#f9fafb"
            }}>
              <Text style={{
                color: "#6b7280",
                fontSize: "15px",
                margin: "0 0 16px",
                lineHeight: "1.6",
                fontWeight: "500"
              }}>
                📍 Cypress, TX | ☎️ (281) 235-4684 | 🌐 gsmactx.com
              </Text>
              <Text style={{
                color: "#9ca3af",
                fontSize: "13px",
                margin: "0 0 12px"
              }}>
                <Link
                  href={unsubscribeUrl}
                  style={{
                    color: "#6b7280",
                    textDecoration: "underline"
                  }}
                >
                  Unsubscribe from emails
                </Link>
              </Text>
              <Text style={{
                color: "#9ca3af",
                fontSize: "12px",
                margin: "0"
              }}>
                © {new Date().getFullYear()} GSMACTX, Inc. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CampaignEmail;
