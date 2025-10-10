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
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            {`
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }

              @media only screen and (max-width: 600px) {
                .mobile-padding {
                  padding-left: 20px !important;
                  padding-right: 20px !important;
                }
                .mobile-text-center {
                  text-align: center !important;
                }
                .mobile-button {
                  display: block !important;
                  width: 100% !important;
                  max-width: 280px !important;
                  margin: 12px auto !important;
                  text-align: center !important;
                  box-sizing: border-box !important;
                }
                .mobile-title {
                  font-size: 26px !important;
                  line-height: 1.3 !important;
                }
                .mobile-image {
                  width: 100% !important;
                  max-width: 320px !important;
                  margin: 0 auto 24px !important;
                  display: block !important;
                }
                .mobile-logo {
                  width: 220px !important;
                }
                .mobile-header-padding {
                  padding: 35px 20px !important;
                }
              }
            `}
          </style>
        </Head>
        <Preview>{subject}</Preview>
        <Body style={{ backgroundColor: "#f9fafb", padding: "20px 0" }}>
          <Container style={{
            backgroundColor: "#ffffff",
            margin: "0 auto",
            padding: "0",
            borderRadius: "12px",
            maxWidth: "600px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            border: "1px solid #e5e7eb"
          }}>
            {/* Header with professional gradient */}
            <Section className="mobile-header-padding" style={{
              background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
              padding: "45px 40px",
              textAlign: "center"
            }}>
              <Img
                className="mobile-logo"
                src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
                width="280"
                alt="GSMACTX Logo"
                style={{ margin: "0 auto", display: "block" }}
              />
            </Section>

            {/* Title Section */}
            <Section className="mobile-padding" style={{ padding: "44px 40px 28px" }}>
              <Heading className="mobile-title" style={{
                color: "#111827",
                fontSize: "34px",
                fontWeight: "700",
                margin: "0 0 16px",
                lineHeight: "1.25",
                textAlign: "center",
                letterSpacing: "-0.02em"
              }}>
                {title}
              </Heading>
            </Section>

            {/* Content Section */}
            <Section className="mobile-padding" style={{ padding: "0 40px 36px" }}>
              {imageUrl && (
                <Img
                  className="mobile-image"
                  src={imageUrl}
                  alt="Campaign Image"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "12px",
                    marginBottom: "28px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb"
                  }}
                />
              )}
              <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "0 20px" }}>
                <Text style={{
                  color: "#4b5563",
                  fontSize: "16px",
                  lineHeight: "1.75",
                  margin: "0",
                  whiteSpace: "pre-wrap",
                  textAlign: "left"
                }}>
                  {content}
                </Text>
              </Container>
            </Section>

            {/* CTA Buttons Section */}
            <Section className="mobile-padding" style={{ padding: "28px 40px 44px", textAlign: "center" }}>
              <Link
                className="mobile-button"
                href="tel:+12812354684"
                style={{
                  background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
                  color: "#ffffff",
                  padding: "16px 36px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  display: "inline-block",
                  margin: "0 6px 14px",
                  boxShadow: "0 4px 12px rgba(30, 64, 175, 0.25)",
                  border: "none"
                }}
              >
                📞 Call Now: (281) 235-4684
              </Link>
              <Link
                className="mobile-button"
                href="https://gsmactx.com"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#1e40af",
                  border: "2px solid #1e40af",
                  padding: "14px 34px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  display: "inline-block",
                  margin: "0 6px 14px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                }}
              >
                🌐 Visit Our Website
              </Link>
            </Section>

            <Hr style={{ borderColor: "#e5e7eb", margin: "0" }} />

            {/* Footer Section */}
            <Section className="mobile-padding" style={{
              padding: "36px 40px",
              textAlign: "center",
              backgroundColor: "#f9fafb"
            }}>
              <Text style={{
                color: "#6b7280",
                fontSize: "14px",
                margin: "0 0 18px",
                lineHeight: "1.6",
                fontWeight: "500"
              }}>
                GSMACTX - Your Trusted HVAC Partner
              </Text>
              <Text style={{
                color: "#6b7280",
                fontSize: "13px",
                margin: "0 0 14px",
                lineHeight: "1.5"
              }}>
                📍 Cypress, TX | ☎️ (281) 235-4684 | 🌐 gsmactx.com
              </Text>
              <Text style={{
                color: "#9ca3af",
                fontSize: "12px",
                margin: "0 0 10px"
              }}>
                <Link
                  href={unsubscribeUrl}
                  style={{
                    color: "#6b7280",
                    textDecoration: "underline"
                  }}
                >
                  Unsubscribe
                </Link>
              </Text>
              <Text style={{
                color: "#9ca3af",
                fontSize: "11px",
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
