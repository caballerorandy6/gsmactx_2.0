import { navigation } from "@/libs/data";

export type SectionName = (typeof navigation)[number]["name"];

export type ServiceDetailsProps = {
  id: string;
  title: string;
  imageSrc: string;
  array: {
    name: string;
    description: string;
  }[];
};

export type Campaign = {
  id: string;
  title: string;
  subject: string;
  content: string;
  createdAt: Date;
  sent: boolean;
  sentAt: Date | null;
  createdBy: string;
  admin: Admin;
};

export type Admin = {
  id: string;
  email: string;
  password: string;
  name: string;
  campaigns: Campaign[];
};

export type SafeAdmin = Omit<Admin, "password">;

export type ActionResult = {
  error?: string;
};
