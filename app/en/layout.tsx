import type { Metadata } from "next";
import LocaleLayout from "@/components/locale-layout";
import { getRootMetadata } from "@/lib/i18n/metadata";
import "../globals.css";

export const metadata: Metadata = getRootMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayout lang="en">{children}</LocaleLayout>;
}
