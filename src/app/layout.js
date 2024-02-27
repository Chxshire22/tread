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
        <main>
          {children}
          <Navbar />
        </main>
        {/* <footer>IF ANY</footer> */}
      </body>
    </html>
  );
}
