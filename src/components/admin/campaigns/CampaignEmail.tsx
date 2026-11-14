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
import { CampaignEmailProps } from "@/lib/interfaces";

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

              /* Header base styles */
              .email-header {
                width: 100% !important;
                max-width: 600px !important;
                margin: 0 auto !important;
                text-align: center !important;
                display: table !important;
              }

              .header-content {
                display: table-cell !important;
                vertical-align: middle !important;
                text-align: center !important;
                padding: 30px 20px !important;
              }

              .logo-container {
                display: inline-block !important;
                vertical-align: middle !important;
                margin: 0 15px 0 0 !important;
              }

              .mobile-logo {
                display: block !important;
                width: 150px !important;
                max-width: 150px !important;
                height: auto !important;
                margin: 0 auto !important;
              }

              .company-name-container {
                display: inline-block !important;
                vertical-align: middle !important;
                text-align: left !important;
                margin: 0 !important;
              }

              .company-text-line1,
              .company-text-line2 {
                margin: 0 !important;
                padding: 0 !important;
                line-height: 1.2 !important;
                display: block !important;
              }

              .company-text-line1 {
                color: #dc2626 !important;
                font-size: 28px !important;
                font-weight: 800 !important;
                margin-bottom: 4px !important;
              }

              .company-text-line2 {
                color: #2563eb !important;
                font-size: 26px !important;
                font-weight: 800 !important;
              }

              .header-tagline {
                position: absolute !important;
                bottom: 10px !important;
                left: 0 !important;
                right: 0 !important;
                text-align: center !important;
                width: 100% !important;
                margin: 0 !important;
              }

              /* Desktop styles (default - already set above) */

              /* Tablet styles - 768px and below */
              @media only screen and (max-width: 768px) {
                .header-content {
                  padding: 25px 15px !important;
                }

                .mobile-logo {
                  width: 120px !important;
                  max-width: 120px !important;
                }

                .logo-container {
                  margin: 0 12px 0 0 !important;
                }

                .company-text-line1 {
                  font-size: 24px !important;
                }

                .company-text-line2 {
                  font-size: 22px !important;
                }
              }

              /* Mobile styles - 600px and below */
              @media only screen and (max-width: 600px) {
                .mobile-padding {
                  padding-left: 20px !important;
                  padding-right: 20px !important;
                }

                .header-content {
                  padding: 20px 15px 45px !important;
                }

                .logo-container {
                  display: block !important;
                  margin: 0 auto 15px auto !important;
                }

                .mobile-logo {
                  width: 100px !important;
                  max-width: 100px !important;
                  margin: 0 auto !important;
                }

                .company-name-container {
                  display: block !important;
                  text-align: center !important;
                  margin: 0 auto !important;
                }

                .company-text-line1 {
                  font-size: 22px !important;
                  text-align: center !important;
                  margin-bottom: 4px !important;
                }

                .company-text-line2 {
                  font-size: 20px !important;
                  text-align: center !important;
                }

                .header-tagline {
                  bottom: 8px !important;
                  font-size: 11px !important;
                }
              }

              /* Small mobile styles - 480px and below */
              @media only screen and (max-width: 480px) {
                .header-content {
                  padding: 18px 10px 40px !important;
                }

                .mobile-logo {
                  width: 90px !important;
                  max-width: 90px !important;
                }

                .company-text-line1 {
                  font-size: 20px !important;
                }

                .company-text-line2 {
                  font-size: 18px !important;
                }

                .logo-container {
                  margin-bottom: 12px !important;
                }
              }

              /* Extra small mobile - 380px and below */
              @media only screen and (max-width: 380px) {
                .header-content {
                  padding: 15px 8px 38px !important;
                }

                .mobile-logo {
                  width: 80px !important;
                  max-width: 80px !important;
                }

                .company-text-line1 {
                  font-size: 18px !important;
                }

                .company-text-line2 {
                  font-size: 16px !important;
                }

                .logo-container {
                  margin-bottom: 10px !important;
                }

                .header-tagline {
                  font-size: 10px !important;
                }
              }
            `}
          </style>
        </Head>
        <Preview>{subject}</Preview>
        <Body style={{ backgroundColor: "#ffffff", padding: "16px 0" }}>
          <Container
            style={{
              backgroundColor: "#ffffff",
              margin: "0 auto",
              padding: "0",
              maxWidth: "600px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* HEADER — logo with company name */}
            <Section
              style={{
                background: "linear-gradient(to bottom right, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)",
                minHeight: "180px",
                position: "relative",
                width: "100%",
              }}
            >
              <table
                className="email-header"
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                border={0}
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                <tr>
                  <td className="header-content">
                    <div className="logo-container">
                      <Img
                        className="mobile-logo"
                        src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo.avif"
                        width="150"
                        alt="GSMACTX Logo"
                        style={{
                          display: "block",
                          width: "150px",
                          maxWidth: "150px",
                          height: "auto",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                    <div className="company-name-container">
                      <Text
                        className="company-text-line1"
                        style={{
                          color: "#dc2626",
                          fontSize: "28px",
                          fontWeight: "800",
                          margin: "0 0 4px 0",
                          lineHeight: "1.2",
                          textAlign: "left",
                        }}
                      >
                        A/C & General
                      </Text>
                      <Text
                        className="company-text-line2"
                        style={{
                          color: "#2563eb",
                          fontSize: "26px",
                          fontWeight: "800",
                          margin: "0",
                          lineHeight: "1.2",
                          textAlign: "left",
                        }}
                      >
                        Contractor INC
                      </Text>
                    </div>
                  </td>
                </tr>
              </table>

              <Text
                className="header-tagline"
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                  fontWeight: "600",
                  margin: "0",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  opacity: "0.9",
                  position: "absolute",
                  bottom: "10px",
                  left: "0",
                  right: "0",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Your Trusted HVAC Partner
              </Text>
            </Section>

            {/* Accent bar */}
            <Section style={{ padding: "0", margin: "0" }}>
              <div style={{ height: "5px", background: "#f59e0b" }}></div>
            </Section>

            {/* Title Section */}
            <Section
              className="mobile-padding"
              style={{
                padding: "32px 40px",
                backgroundColor: "#ffffff",
                textAlign: "center",
              }}
            >
              <Heading
                style={{
                  color: "#1e3a8a",
                  fontSize: "30px",
                  fontWeight: "800",
                  margin: "0 0 12px",
                  lineHeight: "1.2",
                  textAlign: "center",
                }}
              >
                {title}
              </Heading>
              <div
                style={{
                  width: "70px",
                  height: "3px",
                  background: "#f59e0b",
                  margin: "0 auto",
                  borderRadius: "3px",
                }}
              ></div>
            </Section>

            {/* Content Section */}
            <Section
              className="mobile-padding"
              style={{
                padding: "0 40px 32px",
                backgroundColor: "#ffffff",
              }}
            >
              {imageUrl && (
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Img
                    src={imageUrl}
                    alt="Campaign Image"
                    style={{
                      width: "100%",
                      maxWidth: "460px",
                      height: "208px",
                      borderRadius: "8px",
                      display: "block",
                      margin: "0 auto",
                      objectFit: "cover",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              )}

              <Container
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  padding: "20px 24px",
                  margin: "0",
                  maxWidth: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#334155",
                    fontSize: "15px",
                    lineHeight: "1.75",
                    margin: "0",
                    whiteSpace: "pre-wrap",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {content}
                </Text>
              </Container>
            </Section>

            {/* CTA Buttons Section */}
            <Section
              className="mobile-padding"
              style={{
                padding: "32px 40px",
                textAlign: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <Text
                style={{
                  color: "#1e3a8a",
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: "0 0 20px",
                  textAlign: "center",
                }}
              >
                Ready to Get Started?
              </Text>
              <Link
                href="tel:+12812354684"
                style={{
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                  color: "#ffffff",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  display: "inline-block",
                  margin: "0 8px 12px",
                  boxShadow: "0 4px 14px rgba(245, 158, 11, 0.3)",
                }}
              >
                📞 +1 (281) 235-4684
              </Link>
              <Link
                href="https://www.gsmactx.com"
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                  color: "#ffffff",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  display: "inline-block",
                  margin: "0 8px 12px",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                }}
              >
                🌐 Visit Our Website
              </Link>
            </Section>

            {/* Feature Highlights */}
            <Section
              style={{
                padding: "32px 32px",
                backgroundColor: "#f9fafb",
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
                        marginBottom: "4px",
                        color: "#fbbf24",
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
                        marginBottom: "4px",
                        color: "#fbbf24",
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
                        marginBottom: "4px",
                        color: "#fbbf24",
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

            {/* Footer Section */}
            <Section
              className="mobile-padding"
              style={{
                padding: "32px 32px",
                textAlign: "center",
                backgroundColor: "#1e3a8a",
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  margin: "0 0 4px",
                  fontWeight: "700",
                }}
              >
                GSMACTX
              </Text>
              <Text
                style={{
                  color: "#bfdbfe",
                  fontSize: "13px",
                  margin: "0 0 20px",
                  fontWeight: "500",
                }}
              >
                Your Trusted HVAC Partner in Texas
              </Text>

              <div style={{ marginBottom: "24px" }}>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: "12px",
                    margin: "4px 0",
                    fontWeight: "600",
                  }}
                >
                  📍 Cypress, TX
                </Text>
                <Link
                  href="tel:+12812354684"
                  style={{
                    color: "#fbbf24",
                    fontSize: "14px",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "block",
                    margin: "4px 0",
                  }}
                >
                  ☎️ +1 (281) 235-4684
                </Link>
                <Link
                  href="https://www.gsmactx.com"
                  style={{
                    color: "#93c5fd",
                    fontSize: "12px",
                    textDecoration: "none",
                    display: "block",
                    margin: "4px 0",
                  }}
                >
                  🌐 www.gsmactx.com
                </Link>
              </div>

              <Hr
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  margin: "16px 0",
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
                    color: "#bfdbfe",
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
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
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
