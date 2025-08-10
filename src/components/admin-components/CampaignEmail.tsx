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

// ... (tus props se quedan igual)

const CampaignEmail = ({
  subject,
  title,
  content,
  imageUrl,
  recipientEmail,
}: CampaignEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>{subject}</Preview>
        <Body style={main}>
          <Container style={container}>
            {/* ... (resto del cuerpo del email se queda igual) ... */}
            <Section style={headerSection}>
              <Column style={logoColumn}>
                <Img
                  src="https://rqp1nide3wltznco.public.blob.vercel-storage.com/logo2.avif"
                  width="150"
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
                <Column style={imageColumn}>
                  <Img
                    style={image}
                    src={imageUrl}
                    alt="Imagen de la Campaña"
                  />
                </Column>
              )}
              <Column style={textColumn}>
                <Text style={text}>{content}</Text>
                <Section style={buttonContainer}>
                  <Button style={button} href="tel:+12812354684">
                    Call Us Now
                  </Button>
                </Section>
              </Column>
            </Section>

            <Hr style={hr} />

            <Section style={footer}>
              <Text>
                <Link
                  style={unsubscribeLink}
                  href={`https://gsmactx.com/unsubscribe?email=${encodeURIComponent(recipientEmail)}`}
                >
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

// --- Estilos ---
const main = {
  backgroundColor: "transparent",
  fontFamily: "'Inter', sans-serif",
};
const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "20px",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  maxWidth: "700px",
};
const headerSection = { width: "100%" };
const logoColumn = { width: "120px", verticalAlign: "middle" };
const headerTextColumn = { paddingLeft: "20px", verticalAlign: "middle" };
const heading = {
  color: "#0a0f1a",
  fontSize: "24px",
  fontWeight: "bold",
  margin: 0,
};
const contentSection = { padding: "10px 0" };
const imageColumn = {
  width: "50%",
  paddingRight: "10px",
  verticalAlign: "top",
};
const textColumn = { paddingLeft: "10px", verticalAlign: "top" };
const image = { borderRadius: "8px", width: "100%" };
const text = {
  color: "#0a0f1a",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 15px 0",
};
const buttonContainer = { padding: "0" };
const button = {
  backgroundColor: "#007bff",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "bold",
  textDecoration: "none",
  padding: "12px 25px",
};
const hr = { borderColor: "#e6ebf1", margin: "20px 0" };
const footer = { textAlign: "center" as const, paddingTop: "10px" };
const footerText = { color: "#0a0f1a", fontSize: "12px", margin: "4px 0" };

// ✅ 3. NUEVO ESTILO PARA EL ENLACE
const unsubscribeLink = {
  color: "#007bff",
  textDecoration: "underline",
  fontSize: "12px",
};

export default CampaignEmail;
