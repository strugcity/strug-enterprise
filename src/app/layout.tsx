import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strug City — AI-Powered Engineering",
  description:
    "A virtual engineering team building the future with AI-powered tools and platforms. Based in Minnesota, building for the world.",
  keywords: ["AI", "engineering", "software", "Minnesota", "Strug City"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
