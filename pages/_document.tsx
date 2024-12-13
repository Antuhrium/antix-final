import type { Metadata } from "next";
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from "next/script";
import React from 'react';

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
    images: "https://token.antix.in/og.png",
    site: "@antix_in",
  },
};


export default class MyDocument extends Document {
  render() {
    return <Html lang="en">
      <Head>
        <meta property="og:image" content="https://token.antix.in/og.png"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://token.antix.in" />
        <link rel="canonical" href="https://token.antix.in" />


        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Z3X71B2ZGH" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-Z3X71B2ZGH');
            `,
          }}
        />
      </Head>
      <body>
        
        <Script strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
                })(window,document,'script','dataLayer','GTM-WRVZ3KR3');
              `,
          }}
        />

        <Main/>
        <NextScript/>
      </body>
    </Html>
  }
}
