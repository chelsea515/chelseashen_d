import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const imageUrl = host ? `${protocol}://${host}/og.png` : undefined;

  return {
    title: "沈川 Chelsea | 数字化转型与数据产品咨询顾问",
    description: "沈川 Chelsea 的职业履历：数字化转型规划、数据产品交付与数据驱动的用户运营。",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "沈川 Chelsea | 数字化转型与数据产品咨询顾问",
      description: "6+ 年数据与数字化转型经验。",
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1734, height: 907 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: "沈川 Chelsea | 数字化转型与数据产品咨询顾问",
      description: "6+ 年数据与数字化转型经验。",
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
