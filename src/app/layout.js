import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Image from "next/image";
import Navigation from "@/components/Navigation";
import Marquee from "react-fast-marquee";
// import Logo from "@/assets/logo.jpg";
import SearchButton from "@/components/SearchButton";
// import SupportButton from "@/components/SupportButton";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BetX365 Master Admin List",
  description: "betX365 Master Admin List",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
          id="tawkto-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6866cd6bf389bf19111c2906/default';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased lg:mx-[74px] mx-3 bg-[#1F2029]`}
      >
        <div className="min-h-screen text-white mb-12">
          <SearchButton />
          <div className="flex flex-col items-center justify-center lg:p-20 px-4">
            <p className="text-[25px] font-extrabold">Official Agent List</p>
            <p className="text-yellow-500 text-center font-extrabold my-2">100% Secure & Reliable Online Betting Website</p>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            {/* search and button routing section */}
            <Navigation />
            <Marquee className="lg:py-3 py-2 bg-gray-800 shadow-md rounded-lg text-yellow-400">
              <span>
                এজেন্ট লিস্টের বাইরে লেনদেন করে ধরা খেলে batxwin.bet দায়ী নয়..
              </span>
            </Marquee>
          </div>
          {children}
        </div>
        {/* <SupportButton /> */}
      </body>
    </html>
  );
}
