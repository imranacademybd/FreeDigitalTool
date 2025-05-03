import {
  Geist,
  Geist_Mono,
  Libre_Franklin,
  Roboto,
  Playfair_Display,
  Playfair_Display_SC,
  Montserrat,
  Inter
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const playfairDisplaySC = Playfair_Display_SC({
  variable: "--font-playfair-display-sc",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata = {
  metadataBase: new URL("https://freedigitaltool.com"),
  applicationName: "FreeDigitalTool",
  authors: [{ name: "FreeDigitalTool" }],
  creator: "FreeDigitalTool",
  keywords: [
    "Free Digital Tools",
    "Online Calculators",
    "Converters",
    "Text Editors",
    "Instant Access",
    "No Signup",
    "No Download",
  ],
  openGraph: {
    title: "FreeDigitalTool - 100% Free Online Digital Tools",
    description:
      "FreeDigitalTool offers 100% free online tools calculators, converters, text editors & more. No signup, no download, just instant access anytime, anywhere!",
    url: "https://freedigitaltool.com",
    siteName: "FreeDigitalTool",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FreeDigitalTool - 100% Free Online Digital Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeDigitalTool - 100% Free Online Digital Tools",
    description:
      "FreeDigitalTool offers 100% free online tools calculators, converters, text editors & more. No signup, no download, just instant access anytime, anywhere!",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  // themeColor: "#ffffff",
  // colorScheme: "light dark",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  verification: {
    google: "google-site-verification=your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: [
      {
        name: "other-verification",
        value: "your-other-verification-code",
      },
    ],
  },
  alternates: {
    canonical: "https://freedigitaltool.com",
    languages: {
      "en-US": "https://freedigitaltool.com",
      "es-ES": "https://freedigitaltool.com/es",
    },
  },
  appleWebApp: {
    title: "FreeDigitalTool - 100% Free Online Digital Tools",
    statusBarStyle: "default",
  },
  title: {
    default: "FreeDigitalTool - 100% Free Online Digital Tools",
    template: "%s - FreeDigitalTool",
    card: "summary_large_image",
  },
  description:
    "FreeDigitalTool offers 100% free online tools calculators, converters, text editors & more. No signup, no download, just instant access anytime, anywhere!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-roboto ${geistSans.variable} ${geistMono.variable} ${libreFranklin.variable} ${roboto.variable} ${playfairDisplay.variable} ${playfairDisplaySC.variable} ${montserrat.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
