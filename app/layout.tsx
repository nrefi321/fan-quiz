<<<<<<< HEAD
import type { Metadata, Viewport } from "next";
=======

import type { Metadata } from "next";
>>>>>>> b33a77d684d3edeaa2535eb7ce3be5ee011ec324
import "./globals.css";

export const metadata: Metadata = {
  title: "FAN QUIZ — ติ่งระดับไหน?",
<<<<<<< HEAD
  description: "แบบทดสอบวัดระดับความเป็นติ่ง 20 ข้อ คุณคือแฟนคลับระดับไหน?",
=======
  description:
    "แบบทดสอบวัดระดับความเป็นติ่ง 20 ข้อ คุณคือแฟนคลับระดับไหน?",
>>>>>>> b33a77d684d3edeaa2535eb7ce3be5ee011ec324
  openGraph: {
    title: "FAN QUIZ — ติ่งระดับไหน?",
    description: "มาพิสูจน์ระดับความติ่งของคุณกัน!",
    type: "website",
  },
};

<<<<<<< HEAD
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
=======
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
>>>>>>> b33a77d684d3edeaa2535eb7ce3be5ee011ec324
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
<<<<<<< HEAD
=======

>>>>>>> b33a77d684d3edeaa2535eb7ce3be5ee011ec324
