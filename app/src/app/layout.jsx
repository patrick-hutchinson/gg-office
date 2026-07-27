import "../global.css"; // or './index.css'

import { StateProvider } from "../context/StateContext";
import { DataProvider } from "../context/DataContext";
import { AnimationProvider } from "../context/AnimationContext";
import { RefProvider } from "../context/RefContext";
import {buildSanityImageUrl, fallbackSite, getSite, resolveSite} from "@/lib/sanity/site";

import { ThemeProvider } from "next-themes";

export const dynamic = "force-dynamic";

async function getResolvedSite() {
  try {
    return await getSite();
  } catch {
    return fallbackSite;
  }
}

export async function generateMetadata() {
  const site = await getResolvedSite();
  const faviconBaseUrl = site?.favicon?.asset?.url;
  const sanityIcons = faviconBaseUrl
    ? [
        {url: buildSanityImageUrl(faviconBaseUrl, 16), sizes: "16x16", type: "image/png"},
        {url: buildSanityImageUrl(faviconBaseUrl, 32), sizes: "32x32", type: "image/png"},
        {url: buildSanityImageUrl(faviconBaseUrl, 192), sizes: "192x192", type: "image/png"},
        {url: buildSanityImageUrl(faviconBaseUrl, 512), sizes: "512x512", type: "image/png"},
      ]
    : null;

  return {
    title: site.title,
    description: site.description,
    applicationName: site.title,
    creator: site.owner,
    icons: {
      icon: sanityIcons || [{url: "/assets/icons/favicon.svg"}],
      apple: faviconBaseUrl
        ? [{url: buildSanityImageUrl(faviconBaseUrl, 180), sizes: "180x180", type: "image/png"}]
        : undefined,
      shortcut: faviconBaseUrl ? buildSanityImageUrl(faviconBaseUrl, 32) : "/assets/icons/favicon.svg",
    },
    openGraph: {
      title: site.title,
      description: site.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
  };
}

export default async function RootLayout({ children }) {
  const site = resolveSite(await getResolvedSite());
  const lightForeground = site.themeColorsLight.fontColorLight;
  const lightBackground = site.themeColorsLight.backgroundColorLight;
  const darkForeground = site.themeColorsDark.fontColorDark;
  const darkBackground = site.themeColorsDark.backgroundColorDark;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{
        "--foreground-light": lightForeground,
        "--background-light": lightBackground,
        "--foreground-dark": darkForeground,
        "--background-dark": darkBackground,
      }}
    >
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={lightBackground} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={darkBackground} />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://image.mux.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://image.mux.com" />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme={site.defaultTheme}
          enableSystem={site.defaultTheme === "system"}
          disableTransitionOnChange
        >
          <RefProvider>
            <AnimationProvider>
              <DataProvider initialSite={site}>
                <StateProvider>
                  {children}
                  <div id="fullscreen-root"></div>
                </StateProvider>
              </DataProvider>
            </AnimationProvider>
          </RefProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
