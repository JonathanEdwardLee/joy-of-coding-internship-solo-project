"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  CompletedCountProvider,
  useCompletedCount,
} from "@/app/context/CompletedCountContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <CompletedCountProvider>
      <InnerLayout>{children}</InnerLayout>
    </CompletedCountProvider>
  );
}

function InnerLayout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const { completedCount } = useCompletedCount();
  const [isRoboto, setIsRoboto] = useState(false);
  const router = useRouter();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleFont = () => {
    setIsRoboto(!isRoboto);
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

  useEffect(() => {
    if (isRoboto) {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      document.body.style.fontFamily = "'Roboto', sans-serif";
    } else {
      document.body.style.fontFamily = "";
    }
  }, [isRoboto]);

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
                  className="px-1 py-1 bg-purple-700 text-white text-xl p-2 rounded-md hover:bg-purple-500"
                >
                  {darkMode ? "Pastel Mode" : "Dark Mode"}
                </button>
                <button
                  onClick={toggleFont}
                  className="px-1 py-1 bg-purple-700 text-white text-xl p-2 rounded-md hover:bg-purple-500"
                >
                  {isRoboto ? "Color Font" : "Normal Font"}
                </button>
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="px-1 py-1 bg-purple-700 text-white text-xl p-2 rounded-md hover:bg-purple-500"
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
              {isAuthenticated && (
                <div className="text-3xl font-bold mb-2">
                  Tasks completed by {username}: {completedCount}
                </div>
              )}
              <div className="text-xl">
                © 2024 Simple Task Manager. All rights reserved.
              </div>
            </div>
          </footer>
        </Theme>
      </body>
    </html>
  );
}
