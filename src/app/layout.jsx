import "../global.css"; // or './index.css'

export const metadata = {
  title: "GG-OFFICE",
  description: "GG–OFFICE IS AN INDEPENDENT GRAPHIC AND MOTION AGENCY BASED IN SICILY.",
  icons: {
    icon: "/icons/favicon.svg",
  },
};

import { StateProvider } from "../context/StateContext";
import { DataProvider } from "../context/DataContext";
import { AnimationProvider } from "../context/AnimationContext";
import { RefProvider } from "../context/RefContext";

import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem={false}>
          <RefProvider>
            <AnimationProvider>
              <DataProvider>
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
