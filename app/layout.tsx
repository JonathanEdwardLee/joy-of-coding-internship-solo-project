"use client";

import "./globals.css";
import { ReactNode, useState, useEffect } from "react";
import { Theme } from "@radix-ui/themes";
import Head from "next/head";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAuthPopup(true);
    localStorage.removeItem("username");
    router.push("/");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
    document.body.setAttribute("data-theme", darkMode ? "dark" : "pastel");
  }, [darkMode]);

  return (
    <html lang="en">
      <Head>
        <title>Simple Task Manager</title>
        <meta
          name="description"
          content="A simple task management application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Theme accentColor="purple" grayColor="sand" radius="full">
          <header className="bg-purple-900 text-white p-4">
            <div className="container flex justify-between items-center">
              <h1 className="text-5xl font-bold">Simple Task Manager</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-purple-700 text-white p-2 rounded-md hover:bg-purple-500"
                >
                  {darkMode ? "Pastel Mode" : "Dark Mode"}
                </button>
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-purple-700 text-white p-2  rounded-md hover:bg-purple-500"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </header>
          <main className="container">{children}</main>
          <footer className="bg-purple-900 text-white text-2xl p-4 mt-4">
            <div className="container text-center">
              © 2024 Simple Task Manager. All rights reserved.
            </div>
          </footer>
        </Theme>
      </body>
    </html>
  );
}
