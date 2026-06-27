import { Geist, Geist_Mono, Big_Shoulders, Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});



export const metadata = {
  title: "DonorNet",
  description: "A blood donation platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${bigShoulders.variable} ${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <ScrollToTop />
        <main>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#14171C",
                color: "#E8E6E3",
                border: "1px solid #1D2127",
                borderRadius: "4px",
                fontSize: "13px",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: "500",
                padding: "12px 16px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              },
              success: {
                iconTheme: { primary: "#008000", secondary: "#14171C" },
              },
              error: {
                iconTheme: { primary: "#E63946", secondary: "#14171C" },
              },
            }}
          />
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
