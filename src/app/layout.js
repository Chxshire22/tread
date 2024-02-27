import { UserProvider } from "@auth0/nextjs-auth0/client";

//Components
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Treads",
  description: "~~~",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <main>
            {children}
            <Navbar />
          </main>
        </UserProvider>
        {/* <footer>IF ANY</footer> */}
      </body>
    </html>
  );
}
