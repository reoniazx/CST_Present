import type { Metadata } from "next";
import { Inter, Outfit, Caveat, Rowdies } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-inter",
    display: "block",
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-outfit",
    display: "block",
});

const caveat = Caveat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-caveat",
    display: "block",
});

const rowdies = Rowdies({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    variable: "--font-rowdies",
    display: "block",
});

export const metadata: Metadata = {
    title: "Computer Science International | MSU",
    description: "Computer Science International Program at Mahasarakham University - Learn cutting-edge technology with a world-class curriculum",
    keywords: ["Computer Science", "MSU", "International Program", "CS", "Thailand"],
    authors: [{ name: "CST MSU" }],
    openGraph: {
        title: "Computer Science International | MSU",
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
            <body
                className={`${inter.variable} ${outfit.variable} ${caveat.variable} ${rowdies.variable}`}
                suppressHydrationWarning
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
