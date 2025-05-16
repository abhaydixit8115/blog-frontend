import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "HealthExpress", template: "%s - HealthExpress" },
  description:
    "HealthExpress - Your go-to source for expert health tips, wellness advice, and the latest medical insights. Stay informed, live healthier!",
  twitter: {
    card: "summary_large_image",
  },
  // metadataBase: new URL("https://healthexpres.com"),
  openGraph: {
    images: [
      {
        url:
          "https://d39fb8qj0fdpwj.cloudfront.net/health-express-og-image_thumbnail.jpg" +
          "?format=webp&quality=75",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
