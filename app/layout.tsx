import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tabula Notlar",
  description: "Tabula Notlar, daha organik bir deneyim sunma amacıyla oluşturulmuş bir not alma uygulamasıdır.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={montserrat.className}>
        <ThemeProvider attribute="class">
          <Header />
          <div className="h-full min-h-[calc(100dvh-48px)] w-full">{children}</div>
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
