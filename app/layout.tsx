
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FAN QUIZ — ติ่งระดับไหน?",
  description:
    "แบบทดสอบวัดระดับความเป็นติ่ง 20 ข้อ คุณคือแฟนคลับระดับไหน?",
  openGraph: {
    title: "FAN QUIZ — ติ่งระดับไหน?",
    description: "มาพิสูจน์ระดับความติ่งของคุณกัน!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

