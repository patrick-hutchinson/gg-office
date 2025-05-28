import ClientLayout from "./ClientLayout.jsx";
import "./global.css"; // or './index.css'

export const metadata = {
  title: "GG-OFFICE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
