import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { ForumProvider } from "@/context/ForumContext";
import { AIAssistantProvider } from "@/context/AIAssistantContext";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

export const metadata: Metadata = {
  title: "Alkadami Keto - Tu Asistente Inteligente de Nutrición Keto",
  description: "Servicio freemium de nutrición keto con IA inteligente. Chat gratis, recetas personalizadas y nutricionistas certificados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <CartProvider>
          <ForumProvider>
            <AIAssistantProvider>
              {children}
              <FloatingAIAssistant />
            </AIAssistantProvider>
          </ForumProvider>
        </CartProvider>
      </body>
    </html>
  );
}
