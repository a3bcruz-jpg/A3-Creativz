import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A3 Creativz | Development Intelligence",
  description: "AI-powered software development and project progress dashboard.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
