import ClientLayout from "./ClientLayout.jsx";
import "./global.css"; // or './index.css'

export const metadata = {
  title: "GG-OFFICE",
};

import { GlobalStateProvider } from "../assets/context/GlobalStateContext";
import { GlobalDataProvider } from "../assets/context/GlobalDataContext";
import { AnimationProvider } from "../assets/context/AnimationContext";
import { RefProvider } from "../assets/context/RefContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RefProvider>
          <AnimationProvider>
            <GlobalDataProvider>
              <GlobalStateProvider>
                <ClientLayout>{children}</ClientLayout>
              </GlobalStateProvider>
            </GlobalDataProvider>
          </AnimationProvider>
        </RefProvider>
      </body>
    </html>
  );
}
