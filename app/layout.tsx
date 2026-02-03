import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
    title: "Computer Science International | KMUTT",
    description: "Computer Science International Program at King Mongkut's University of Technology Thonburi - Learn cutting-edge technology with a world-class curriculum",
    keywords: ["Computer Science", "KMUTT", "International Program", "CS", "Thailand"],
    authors: [{ name: "CST KMUTT" }],
    openGraph: {
        title: "Computer Science International | KMUTT",
        description: "Computer Science International Program - Ready to develop your skills for the digital future",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
