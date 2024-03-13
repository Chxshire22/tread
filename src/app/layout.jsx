import { UserProvider } from "@auth0/nextjs-auth0/client";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
//Components import
import BootstrapClient from "@/components/BootstrapClient";
import GetCurrentUser from "@/components/GetCurrentUser";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Treads",
  description: "~~~",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <UserProvider>
          <GetCurrentUser>
            <main>{children}</main>
          </GetCurrentUser>
        </UserProvider>
        {/* DO NOT REMOVE: THIS IS SO THAT BOOSTRAP JS WORKS */}
        <BootstrapClient />
      </body>
    </html>
  );
}
