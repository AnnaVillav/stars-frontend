
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CarritoProvider } from "@/context/CarritoContext";

export const metadata = {
  title: "STARS | Instrumentos musicales",
  description: "Tienda de instrumentos musicales STARS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-[#f7f7f5] text-zinc-900">
        <CarritoProvider>
          <Header />

          <div className="flex-1">
            {children}
          </div>

          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
