import { UserProvider } from "@auth0/nextjs-auth0/client";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
//Components import
import BootstrapClient from "@/components/BootstrapClient";
import GetCurrentUser from "@/components/GetCurrentUser";

export const metadata = {
  title: "Treads",
  description: "~~~",
};

// NOTE: 
// DO NOT PUT NAVBAR HERE, MANY COMPONENTS SUCH AS - CREATE THREAD, CREATE THREAD CONTENT, CHATROOM, HAVE A BACK BUTTON. 
// IF YOU GO ON INSTA, THERE IS NO NAVBAR ON THE CHATROOM PAGE OR POST CREATION, ONLY A BACK BUTTON
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
