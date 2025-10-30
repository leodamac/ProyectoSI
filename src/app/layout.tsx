import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { ForumProvider } from "@/context/ForumContext";
import { AIAssistantProvider } from "@/context/AIAssistantContext";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";
import OfflineIndicator from "@/components/OfflineIndicator";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Alkadami Keto - Tu Asistente Inteligente de Nutrición Keto",
  description: "Servicio freemium de nutrición keto con IA inteligente. Chat gratis, recetas personalizadas y nutricionistas certificados.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Alkadami Keto",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon-192.svg" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <ForumProvider>
            <AIAssistantProvider>
              <ServiceWorkerRegistration />
              <OfflineIndicator />
              {children}
              <FloatingAIAssistant />
            </AIAssistantProvider>
          </ForumProvider>
        </CartProvider>
      </body>
    </html>
  );
}
