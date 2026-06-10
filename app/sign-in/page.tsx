"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--light)] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            HH
          </div>
          <h1 className="text-3xl font-bold text-[var(--dark)]">Welcome Back</h1>
          <p className="text-[var(--muted)] mt-1">Sign in to your Handcrafted Haven account</p>
        </div>

        {registered && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6 text-sm">
            Account created! Please sign in.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[var(--dark)] mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-semibold text-[var(--dark)]">Password</label>
              <Link href="#" className="text-xs text-[var(--primary)] hover:underline">Forgot password?</Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[var(--primary)] hover:bg-[var(--dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition text-sm"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <p className="text-center text-sm text-[var(--muted)] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-[var(--primary)] font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}