import { Instrument_Sans, Azeret_Mono } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const iSans = Instrument_Sans({
  variable: "--font-neue",
  subsets: ["latin"],
});

const azeret = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
});

export const metadata = {
  title: "INCOMUM®",
  description: "Studio Incomum",
  themeColor: "#111111",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        id="noise"
        className={`${iSans.variable} ${azeret.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col ">{children}</body>
      </html>
    </ViewTransitions>
  );
}
