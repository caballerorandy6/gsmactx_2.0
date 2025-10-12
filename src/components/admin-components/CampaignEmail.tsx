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
                  padding-left: 24px !important;
                  padding-right: 24px !important;
                }
                .mobile-logo {
                  width: 280px !important;
                }
                .mobile-header {
                  height: 180px !important;
                }
              }
            `}
          </style>
        </Head>
        <Preview>{subject}</Preview>
        <Body style={{ backgroundColor: "#f5f7fa", padding: "16px 0" }}>
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
            {/* HEADER — reduced height, logo same size */}
            <Section
              className="mobile-header"
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
                height: "180px",
                position: "relative",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -25%)",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Img
                  className="mobile-logo"
                  src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
                  width="728"
                  alt="GSMACTX Logo"
                  style={{
                    margin: "0 auto",
                    display: "block",
                    maxHeight: "243px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              <Text
                style={{
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: "600",
                  margin: "0",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  opacity: "0.9",
                  position: "absolute",
                  bottom: "8px",
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
                  borderLeft: "4px solid #3b82f6",
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
                  background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
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
                  background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
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
