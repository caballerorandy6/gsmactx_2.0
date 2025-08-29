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
  Column,
  Row,
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
              .cta-button:hover {
                color: #007bff !important;
                text-decoration: underline !important;
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
                .cta-button {
                  display: block !important;
                  width: 100% !important;
                  margin: 10px auto !important;
                }
              }
            `}
          </style>
        </Head>
        <Preview>{subject}</Preview>
        <Body className="bg-gray-100">
          <Container className="bg-white mx-auto my-10 p-8 border border-gray-200 rounded-lg max-w-2xl">
            {/* Header Section */}
            <Section className="w-full">
              <Row>
                <Column className="header-logo w-40 align-middle">
                  <Img
                    src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
                    width="200"
                    alt="GSMACTX Logo"
                    className="max-w-full h-auto"
                  />
                </Column>
                <Column className="header-title pl-5 align-middle">
                  <Heading className="text-gray-900 text-2xl font-semibold m-0">
                    {title}
                  </Heading>
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 my-7" />

            {/* Content Section */}
            <Section className="py-2">
              <Row>
                {imageUrl && (
                  <Column className="stack-column-mobile content-image w-1/2 pr-4">
                    <Img
                      className="rounded-lg w-full"
                      src={imageUrl}
                      alt="Imagen de la Campaña"
                    />
                  </Column>
                )}
                <Column
                  className={`stack-column-mobile ${imageUrl ? "w-1/2 pl-4" : "w-full"}`}
                >
                  <Text className="text-gray-700 text-base leading-relaxed">
                    {content}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* CTA Buttons Section */}
            <Section className="pt-5 text-center">
              <div style={{ textAlign: "center", paddingTop: "20px" }}>
                <Link
                  className="cta-button"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#333333",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    padding: "10px 20px",
                    display: "inline-block",
                    marginRight: "10px",
                    transition: "color 0.3s ease",
                    cursor: "pointer",
                  }}
                  href="tel:+12812354684"
                >
                  Call Now
                </Link>
                <Link
                  className="cta-button"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#333333",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    padding: "10px 20px",
                    display: "inline-block",
                    marginLeft: "10px",
                    transition: "color 0.3s ease",
                    cursor: "pointer",
                  }}
                  href="https://gsmactx.com"
                >
                  Visit Our Website
                </Link>
              </div>
            </Section>

            <Hr className="border-gray-200 my-7" />

            {/* Footer Section */}
            <Section className="text-center pt-5">
              <Text className="m-0 mb-2">
                <Link
                  className="text-gray-500 underline text-xs"
                  href={unsubscribeUrl}
                >
                  Unsubscribe
                </Link>
              </Text>
              <Text className="text-gray-500 text-xs m-1">
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
