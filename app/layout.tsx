import "./globals.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Task Manager</title>
        <meta
          name="description"
          content="A simple task management application"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 text-gray-800">
        <header className="bg-blue-600 text-white p-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold">Task Manager</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto p-4">{children}</main>
        <footer className="bg-blue-600 text-white p-4 mt-4">
          <div className="max-w-3xl mx-auto text-center">
            © 2024 Task Manager. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
