import "../global.css"; // or './index.css'

export const metadata = {
  title: "GG-OFFICE",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👽</text></svg>",
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
        <ThemeProvider>
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
