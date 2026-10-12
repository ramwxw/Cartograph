import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import ThemeController from "./theme-controller";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cartograph",
  description: "Dependency map for public repositories",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else {
                    document.documentElement.removeAttribute('data-theme');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Suspense fallback={<div className="h-8" />}>
            <nav className="flex items-center justify-end gap-3 px-6 py-4">
              <ThemeController />
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton />
              </Show>
              <Show when="signed-in">
                <OrganizationSwitcher />
                <UserButton />
              </Show>
            </nav>
          </Suspense>
          <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-8">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
