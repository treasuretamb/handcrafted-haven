"use client";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { useSession, signOut, SessionProvider } from "next-auth/react";

function Navbar() {
  const { totalItems } = useCart();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[var(--primary)] text-white shadow-md relative">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-xl font-bold text-[var(--primary)]">
            HH
          </div>
          <span className="text-2xl font-bold tracking-tight">Handcrafted Haven</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 text-lg">
          <Link href="/" className="hover:text-[var(--accent)] transition">Home</Link>
          <Link href="/shop" className="hover:text-[var(--accent)] transition">Shop</Link>
          <Link href="/about" className="hover:text-[var(--accent)] transition">About</Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:text-[var(--accent)] transition" aria-label="Shopping cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--dark)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {session ? (
            <>
              <span className="text-sm text-white/80">Hi, {session.user?.name?.split(" ")[0]}</span>
              {(session.user as { role?: string }).role === "seller" && (
                <Link href="/dashboard" className="px-5 py-2 bg-[var(--accent)] text-[var(--primary)] font-medium rounded hover:bg-yellow-400 transition text-sm">
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="px-5 py-2 border border-white rounded hover:bg-white hover:text-[var(--primary)] transition text-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="px-5 py-2 border border-white rounded hover:bg-white hover:text-[var(--primary)] transition">
                Sign In
              </Link>
              <Link href="/sign-up" className="px-5 py-2 bg-[var(--accent)] text-[var(--primary)] font-medium rounded hover:bg-yellow-400 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative p-2" aria-label="Shopping cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--dark)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--primary)] border-t border-white/20 px-6 pb-4 flex flex-col gap-4 text-lg">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-[var(--accent)] transition py-1">Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-[var(--accent)] transition py-1">Shop</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-[var(--accent)] transition py-1">About</Link>
          <hr className="border-white/20" />
          <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="hover:text-[var(--accent)] transition py-1">Sign In</Link>
          <Link href="/sign-up" onClick={() => setMenuOpen(false)} className="hover:text-[var(--accent)] transition py-1">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer className="bg-[var(--dark)] text-white py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="font-bold text-lg mb-3 text-[var(--accent)]">Handcrafted Haven</h3>
                <p className="text-white/70">A marketplace for unique handmade goods, connecting artisans with people who appreciate quality craftsmanship.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3 text-[var(--accent)]">Quick Links</h3>
                <div className="flex flex-col gap-2 text-white/70">
                  <Link href="/" className="hover:text-white transition">Home</Link>
                  <Link href="/shop" className="hover:text-white transition">Shop</Link>
                  <Link href="/about" className="hover:text-white transition">About</Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3 text-[var(--accent)]">Contact Us</h3>
                <div className="text-white/70 flex flex-col gap-2">
                  <p>(123) 456-7890</p>
                  <p>hello@handcraftedhaven.com</p>
                  <p>123 Artisan Lane, Craftsville</p>
                </div>
              </div>
            </div>
            <p className="text-center text-white/40 text-xs mt-8">© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
          </footer>
        </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}