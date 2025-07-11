import ClientLayout from "./ClientLayout.jsx";
import "./global.css"; // or './index.css'

export const metadata = {
  title: "GG-OFFICE",
};

import { GlobalStateProvider } from "../assets/context/GlobalStateContext";
import { GlobalDataProvider } from "../assets/context/GlobalDataContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalDataProvider>
          <GlobalStateProvider>
            <ClientLayout>{children}</ClientLayout>
          </GlobalStateProvider>
        </GlobalDataProvider>
      </body>
    </html>
  );
}
