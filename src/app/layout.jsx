import "../global.css"; // or './index.css'

export const metadata = {
  title: "GG-OFFICE",
};

import { StateProvider } from "../context/StateContext";
import { DataProvider } from "../context/DataContext";
import { AnimationProvider } from "../context/AnimationContext";
import { RefProvider } from "../context/RefContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
