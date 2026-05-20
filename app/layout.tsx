import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Handcrafted Haven",
  description: "Beautiful handmade products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">

        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-8 py-5 bg-[var(--primary)] text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-xl font-bold text-[var(--primary)]">
              HH
            </div>
            <Link href="/" className="text-3xl font-bold tracking-tight">
              Handcrafted Haven
            </Link>
          </div>

          <div className="flex gap-8 text-lg">
            <Link href="/" className="hover:text-[var(--accent)] transition">Home</Link>
            <Link href="/shop" className="hover:text-[var(--accent)] transition">Shop</Link>
            <Link href="/about" className="hover:text-[var(--accent)] transition">About</Link>
          </div>

          <div className="flex gap-4">
            <Link
              href="/sign-in"
              className="px-5 py-2 border border-white rounded hover:bg-white hover:text-[var(--primary)] transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-5 py-2 bg-[var(--accent)] text-[var(--primary)] font-medium rounded hover:bg-yellow-400 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <footer className="bg-[var(--dark)] text-white py-8 text-center">
          <p>Call us at (123) 456-7890</p>
          <p>© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
        </footer>

      </body>
    </html>
  );
}