
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "STARS | Instrumentos musicales",
  description: "Tienda de instrumentos musicales STARS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-zinc-950 text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
