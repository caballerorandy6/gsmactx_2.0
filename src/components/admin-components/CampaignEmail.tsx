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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
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
        <Body style={{ backgroundColor: "#f3f4f6", padding: "0" }}>
          <Container
            style={{
              backgroundColor: "#ffffff",
              margin: "0 auto",
              padding: "0",
              maxWidth: "600px",
            }}
          >
            {/* Modern Hero Header */}
            <Section
              className="mobile-header-padding"
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                padding: "50px 40px 40px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <Img
                className="mobile-logo"
                src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
                width="280"
                alt="GSMACTX Logo"
                style={{ margin: "0 auto 20px", display: "block" }}
              />
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "600",
                  margin: "0",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  opacity: "0.95",
                }}
              >
                Your Trusted HVAC Partner
              </Text>
            </Section>

            {/* Orange accent bar */}
            <Section style={{ padding: "0", margin: "0" }}>
              <div style={{ height: "6px", background: "#f59e0b" }}></div>
            </Section>

            {/* Title Section with Card Style */}
            <Section
              className="mobile-padding"
              style={{ padding: "40px 40px 24px", backgroundColor: "#ffffff" }}
            >
              <Heading
                className="mobile-title"
                style={{
                  color: "#1e3a8a",
                  fontSize: "36px",
                  fontWeight: "800",
                  margin: "0 0 12px",
                  lineHeight: "1.2",
                  textAlign: "center",
                  letterSpacing: "-0.03em",
                }}
              >
                {title}
              </Heading>
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  background: "#f59e0b",
                  margin: "0 auto",
                  borderRadius: "2px",
                }}
              ></div>
            </Section>

            {/* Content Section with Card */}
            <Section
              className="mobile-padding"
              style={{ padding: "0 30px 30px", backgroundColor: "#ffffff" }}
            >
              {imageUrl && (
                <div
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "16px",
                    padding: "20px",
                    marginBottom: "28px",
                  }}
                >
                  <Img
                    className="mobile-image"
                    src={imageUrl}
                    alt="Campaign Image"
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      borderRadius: "12px",
                      display: "block",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    }}
                  />
                </div>
              )}
              <Container
                style={{
                  backgroundColor: "#f8fafc",
                  borderLeft: "4px solid #3b82f6",
                  borderRadius: "8px",
                  padding: "24px 28px",
                  margin: "0 auto",
                  maxWidth: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#374151",
                    fontSize: "16px",
                    lineHeight: "1.8",
                    margin: "0",
                    whiteSpace: "pre-wrap",
                    textAlign: "left",
                  }}
                >
                  {content}
                </Text>
              </Container>
            </Section>

            {/* CTA Buttons Section with Modern Cards */}
            <Section
              className="mobile-padding"
              style={{
                padding: "36px 30px 40px",
                textAlign: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <Text
                style={{
                  color: "#1e3a8a",
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: "0 0 24px",
                  textAlign: "center",
                }}
              >
                Ready to Get Started?
              </Text>
              <Link
                className="mobile-button"
                href="tel:+12812354684"
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                  color: "#ffffff",
                  padding: "18px 40px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "16px",
                  display: "inline-block",
                  margin: "0 6px 16px",
                  boxShadow: "0 6px 24px rgba(245, 158, 11, 0.35)",
                  border: "none",
                }}
              >
                📞 Call Now: (281) 235-4684
              </Link>
              <Link
                className="mobile-button"
                href="https://gsmactx.com"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  color: "#ffffff",
                  border: "none",
                  padding: "18px 40px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "16px",
                  display: "inline-block",
                  margin: "0 6px 16px",
                  boxShadow: "0 6px 24px rgba(59, 130, 246, 0.3)",
                }}
              >
                🌐 Visit Our Website
              </Link>
            </Section>

            {/* Feature Highlights */}
            <Section
              style={{
                padding: "30px 40px",
                backgroundColor: "#f8fafc",
              }}
            >
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{ textAlign: "center" }}
              >
                <tr>
                  <td style={{ padding: "10px", verticalAlign: "top" }}>
                    <div
                      style={{
                        fontSize: "28px",
                        marginBottom: "8px",
                      }}
                    >
                      ⚡
                    </div>
                    <Text
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#1e3a8a",
                        margin: "0 0 4px",
                      }}
                    >
                      Fast Service
                    </Text>
                    <Text
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        margin: "0",
                      }}
                    >
                      Same Day
                    </Text>
                  </td>
                  <td style={{ padding: "10px", verticalAlign: "top" }}>
                    <div
                      style={{
                        fontSize: "28px",
                        marginBottom: "8px",
                      }}
                    >
                      ✓
                    </div>
                    <Text
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#1e3a8a",
                        margin: "0 0 4px",
                      }}
                    >
                      Licensed
                    </Text>
                    <Text
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        margin: "0",
                      }}
                    >
                      & Insured
                    </Text>
                  </td>
                  <td style={{ padding: "10px", verticalAlign: "top" }}>
                    <div
                      style={{
                        fontSize: "28px",
                        marginBottom: "8px",
                      }}
                    >
                      ⭐
                    </div>
                    <Text
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#1e3a8a",
                        margin: "0 0 4px",
                      }}
                    >
                      5-Star Rated
                    </Text>
                    <Text
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        margin: "0",
                      }}
                    >
                      By Customers
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            <Hr style={{ borderColor: "#e5e7eb", margin: "0" }} />

            {/* Rich Footer Section */}
            <Section
              className="mobile-padding"
              style={{
                padding: "40px 40px 30px",
                textAlign: "center",
                backgroundColor: "#1e3a8a",
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: "16px",
                  margin: "0 0 8px",
                  lineHeight: "1.5",
                  fontWeight: "700",
                }}
              >
                GSMACTX
              </Text>
              <Text
                style={{
                  color: "#93c5fd",
                  fontSize: "13px",
                  margin: "0 0 24px",
                  lineHeight: "1.5",
                  fontWeight: "500",
                }}
              >
                Your Trusted HVAC Partner in Texas
              </Text>

              {/* Contact Info Grid */}
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{ marginBottom: "24px" }}
              >
                <tr>
                  <td style={{ textAlign: "center", padding: "8px 0" }}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: "12px",
                        margin: "0",
                        fontWeight: "600",
                      }}
                    >
                      📍 Cypress, TX
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "8px 0" }}>
                    <Link
                      href="tel:+12812354684"
                      style={{
                        color: "#f59e0b",
                        fontSize: "14px",
                        fontWeight: "700",
                        textDecoration: "none",
                      }}
                    >
                      ☎️ (281) 235-4684
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "8px 0" }}>
                    <Link
                      href="https://gsmactx.com"
                      style={{
                        color: "#93c5fd",
                        fontSize: "12px",
                        textDecoration: "none",
                      }}
                    >
                      🌐 www.gsmactx.com
                    </Link>
                  </td>
                </tr>
              </table>

              <Hr
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  margin: "20px 0",
                }}
              />

              <Text
                style={{
                  color: "#93c5fd",
                  fontSize: "11px",
                  margin: "0 0 8px",
                }}
              >
                <Link
                  href={unsubscribeUrl}
                  style={{
                    color: "#93c5fd",
                    textDecoration: "underline",
                  }}
                >
                  Unsubscribe from emails
                </Link>
              </Text>
              <Text
                style={{
                  color: "#6b7fd1",
                  fontSize: "10px",
                  margin: "0",
                }}
              >
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
