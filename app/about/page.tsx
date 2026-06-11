import Link from "next/link";
import { Handshake, Leaf, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--light)]">

      {/* Hero */}
      <div className="bg-[var(--primary)] text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">About Handcrafted Haven</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          A marketplace built to connect passionate artisans with people who appreciate the beauty of handmade goods.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Mission */}
        <section className="bg-white rounded-2xl shadow p-10">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">Our Mission</h2>
          <p className="text-[var(--dark)] leading-relaxed text-lg">
            Handcrafted Haven was founded on a simple belief: that handmade goods carry a soul that mass-produced items never can. We exist to give skilled artisans a platform to share their craft with the world, and to give shoppers access to truly unique, meaningful pieces.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-8 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Handshake />, title: "Community First", desc: "We believe in fostering genuine connections between makers and buyers, building a community that values craft and creativity." },
              { icon: <Leaf />, title: "Sustainability", desc: "We encourage artisans to use eco-friendly, ethically sourced materials and sustainable practices in their work." },
              { icon: <Sparkles />, title: "Authenticity", desc: "Every item on our platform is genuinely handcrafted. No mass production, no shortcuts — just real skill and dedication." },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-xl shadow p-6 text-center">
                <p className="text-5xl mb-4">{value.icon}</p>
                <h3 className="font-bold text-xl text-[var(--primary)] mb-2">{value.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="bg-white rounded-2xl shadow p-10">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">Our Story</h2>
          <p className="text-[var(--dark)] leading-relaxed text-lg mb-4">
            Handcrafted Haven started as a course project at BYU-Idaho, born from a desire to build something meaningful. What began as a web application assignment grew into a fully functional marketplace connecting artisans with customers who value quality over quantity.
          </p>
          <p className="text-[var(--dark)] leading-relaxed text-lg">
            Built with Next.js, TypeScript, and a PostgreSQL database, the platform supports real seller accounts, live product listings, customer reviews, and a full shopping cart — all designed with accessibility and responsive design in mind.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">Ready to Explore?</h2>
          <p className="text-[var(--muted)] mb-8 text-lg">Browse our collection of handcrafted goods or create a seller account to list your own.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="bg-[var(--primary)] hover:bg-[var(--dark)] text-white font-semibold px-8 py-3 rounded-lg transition">
              Browse the Shop
            </Link>
            <Link href="/sign-up" className="border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-semibold px-8 py-3 rounded-lg transition">
              Become a Seller
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}