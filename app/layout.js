import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import { SidebarRight } from "@/components/sidebar-right";

export const metadata = {
  title: "Social Media App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased dark">
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
