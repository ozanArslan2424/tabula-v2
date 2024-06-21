import { ThemeProvider } from "@/context/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tabula Notlar",
    description:
        "Tabula Notlar, daha organik bir deneyim sunma amacıyla oluşturulmuş bir not alma uygulamasıdır.",
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
                    <div className="full-screen">{children}</div>
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
