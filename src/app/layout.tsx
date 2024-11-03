import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";
import MetaMaskClientProvider from "@/components/MetaMaskClientProvider/MetaMaskClientProvider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://token.antix.in"),
  title: "Antix: Tokensale",
  description: "Antix: Tokensale platform for ICO and investment",
  keywords: ["antix", "tokensale", "ico", "platform", "investment"],
  openGraph: {
    title: "Antix: Tokensale",
    description: "Antix: Tokensale",
  },
  icons: {
    icon: [
      { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antix: Tokensale",
    description: "Antix: Tokensale",
    images: "https://token.antix.in/og-1.png",
    site: "@antix_in",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          property="og:image"
          content="https://token.antix.in/og.png"
        />
        <meta
          property="og:image"
          content="https://token.antix.in/og-1.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://token.antix.in" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="canonical" href="https://token.antix.in" />
        <Script
          id="hotjar-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                            (function(h,o,t,j,a,r){
                                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                                h._hjSettings={hjid:5192619,hjsv:6};
                                a=o.getElementsByTagName('head')[0];
                                r=o.createElement('script');r.async=1;
                                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                                a.appendChild(r);
                            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                        `,
          }}
        />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                            ym(98807103, "init", {
                                clickmap:true,
                                trackLinks:true,
                                accurateTrackBounce:true
                            });
                        `,
          }}
        />
      </head>
      <body className={`${poppins.className}`}>
        <MetaMaskClientProvider>{children}</MetaMaskClientProvider>
      </body>
    </html>
  );
}
