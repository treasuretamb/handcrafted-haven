"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: isSeller ? "seller" : "buyer" }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    router.push("/sign-in?registered=true");
  }

  return (
    <div className="min-h-screen bg-[var(--light)] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--primary)] text-2xl font-bold mx-auto mb-4">
            HH
          </div>
          <h1 className="text-3xl font-bold text-[var(--dark)]">Create Account</h1>
          <p className="text-[var(--muted)] mt-1">Join the Handcrafted Haven community</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[var(--dark)] mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />
          </div>

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
            <label htmlFor="password" className="block text-sm font-semibold text-[var(--dark)] mb-1">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-semibold text-[var(--dark)] mb-1">Confirm Password</label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />
          </div>

          <div className="bg-[var(--light)] rounded-xl p-4">
            <p className="text-sm font-semibold text-[var(--dark)] mb-3">I want to...</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsSeller(false)}
                className={`py-3 px-4 rounded-lg text-sm font-medium border-2 transition ${
                  !isSeller
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-gray-200 text-[var(--muted)] hover:border-[var(--primary)]"
                }`}
              >
                🛍 Shop & Buy
              </button>
              <button
                onClick={() => setIsSeller(true)}
                className={`py-3 px-4 rounded-lg text-sm font-medium border-2 transition ${
                  isSeller
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--dark)]"
                    : "border-gray-200 text-[var(--muted)] hover:border-[var(--accent)]"
                }`}
              >
                🎨 Sell My Crafts
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[var(--primary)] hover:bg-[var(--dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition text-sm"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <p className="text-center text-sm text-[var(--muted)] mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[var(--primary)] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}