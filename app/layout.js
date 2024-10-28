import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import { SidebarRight } from "@/components/sidebar-right";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "400", "700", "900"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased `}>
        <SidebarProvider>
          <AppSidebar />
          <MobileNav />
          <main className="min-h-screen flex flex-col items-center justify-center mx-auto">
            {children}
          </main>
          <SidebarRight />
        </SidebarProvider>
      </body>
    </html>
  );
}
