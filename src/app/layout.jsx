import "../global.css"; // or './index.css'

export const metadata = {
  title: "GG-OFFICE",
};

import { GlobalStateProvider } from "../context/GlobalStateContext";
import { GlobalDataProvider } from "../context/GlobalDataContext";
import { AnimationProvider } from "../context/AnimationContext";
import { RefProvider } from "../context/RefContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RefProvider>
          <AnimationProvider>
            <GlobalDataProvider>
              <GlobalStateProvider>{children}</GlobalStateProvider>
            </GlobalDataProvider>
          </AnimationProvider>
        </RefProvider>
      </body>
    </html>
  );
}
