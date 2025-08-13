import {
  Body,
  Button,
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
      <Head>
        <style>
          {`
            @media (max-width: 600px) {
              .stack-column-mobile {
                display: block !important;
                width: 100% !important;
                padding: 0 !important;
                max-width: 100% !important;
              }
              .button-mobile {
                width: 100% !important;
                max-width: 100% !important;
              }
            }
          `}
        </style>
      </Head>
      <Tailwind>
        <Preview>{subject}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={headerSection}>
              <Column style={logoColumn}>
                <Img
                  src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
                  width="200"
                  alt="GSMACTX Logo"
                />
              </Column>
              <Column style={headerTextColumn}>
                <Heading style={heading}>{title}</Heading>
              </Column>
            </Section>

            <Hr style={hr} />

            <Section style={contentSection}>
              {imageUrl && (
                <Column className="stack-column-mobile" style={imageColumn}>
                  <Img
                    style={image}
                    src={imageUrl}
                    alt="Imagen de la Campaña"
                  />
                </Column>
              )}
              <Column className="stack-column-mobile" style={textColumn}>
                <Text style={text}>{content}</Text>
              </Column>
            </Section>

            <Section
              style={{
                paddingTop: "20px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Column className="stack-column-mobile" style={buttonColumn}>
                <Button
                  className="button-mobile"
                  style={button}
                  href="tel:+12812354684"
                >
                  Call Now
                </Button>
              </Column>
              <Column className="stack-column-mobile" style={buttonColumn}>
                <Link
                  className="button-mobile"
                  style={contactLink}
                  href="https://gsmactx.com"
                >
                  Visit Our Website
                </Link>
              </Column>
            </Section>

            <Hr style={hr} />

            <Section style={footer}>
              <Text>
                <Link style={unsubscribeLink} href={unsubscribeUrl}>
                  Unsubscribe
                </Link>
              </Text>
              <Text style={footerText}>
                © {new Date().getFullYear()} GSMACTX, Inc. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const main = {
  backgroundColor: "#f4f5f7",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "40px",
  border: "1px solid #eaeaea",
  borderRadius: "8px",
  maxWidth: "640px",
};

const headerSection = { width: "100%" };
const logoColumn = { width: "160px", verticalAlign: "middle" };
const headerTextColumn = { paddingLeft: "20px", verticalAlign: "middle" };

const heading = {
  color: "#1d232e",
  fontSize: "26px",
  fontWeight: "600",
  margin: 0,
};

const contentSection = { padding: "10px 0" };
const imageColumn = { width: "50%", paddingRight: "15px" };
const textColumn = { width: "50%", paddingLeft: "15px" };

const image = { borderRadius: "8px", width: "100%" };
const text = { color: "#3c4858", fontSize: "16px", lineHeight: "1.6" };

const buttonColumn = {
  width: "50%",
  padding: "0 8px",
};

const button = {
  backgroundColor: "#007bff",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "bold",
  textDecoration: "none",
  padding: "14px 0",
  width: "100%",
  textAlign: "center" as const,
};

// const buttonSecondary = {
//   ...button,
//   backgroundColor: "#6c757d",
// };

const hr = { borderColor: "#eaeaea", margin: "28px 0" };
const footer = { textAlign: "center" as const, paddingTop: "20px" };
const footerText = { color: "#8898aa", fontSize: "12px", margin: "4px 0" };
const unsubscribeLink = {
  color: "#8898aa",
  textDecoration: "underline",
  fontSize: "12px",
};
const contactLink = {
  color: "#007bff",
  textDecoration: "none",
  fontSize: "12px",
};

export default CampaignEmail;
