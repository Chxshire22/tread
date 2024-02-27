import 'normalize.css';
import'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Navbar from "@/components/Navbar/Navbar";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
  title: "Treads",
  description: "~~~",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
        {/* <footer>IF ANY</footer> */}
          <Navbar />
<BootstrapClient />
      </body>
    </html>
  );
}
