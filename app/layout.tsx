"use client";

import "./globals.css";
import { ReactNode, useState, useEffect } from "react";
import { Theme } from "@radix-ui/themes";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
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
            <div className="container flex-between">
              <h1 className="text-5xl font-bold">Simple Task Manager</h1>
              <button
                onClick={toggleTheme}
                className="bg-purple-700 text-white p-2 rounded-md"
              >
                {darkMode ? "Pastel Mode" : "Dark Mode"}
              </button>
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
