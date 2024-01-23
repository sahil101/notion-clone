import type { Metadata } from "next";
import "./globals.css";
import db from "../lib/supabase/db";
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import {DM_Sans} from 'next/font/google'
import { twMerge } from "tailwind-merge";
import AppStateProvider from "@/lib/providers/state-provider";
import { SupbaseUserProvider } from "@/lib/providers/supabase-user-provider";
import { Toaster } from "@/components/ui/toaster";
const inter = DM_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge('bg-background')}>
        <ThemeProvider attribute="class" defaultTheme={"dark"} enableSystem>
          <AppStateProvider>
            <SupbaseUserProvider>
              {children}
              <Toaster />
              </SupbaseUserProvider>
            </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
