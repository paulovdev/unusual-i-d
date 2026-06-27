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
  themeColor: "#FFFFFF",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${iSans.variable} ${azeret.variable} h-full antialiased noise`}
      >
        <head>
          <meta name="theme-color" content="#FFFFFF" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#FFFFFF"
          />
        </head>
        <body className="min-h-full flex flex-col ">{children}</body>
      </html>
    </ViewTransitions>
  );
}
