import Link from "next/link";

const SELLERS: Record<string, {
  name: string; tagline: string; story: string;
  location: string; joined: string; avatar: string;
  products: { id: number; name: string; price: number; image: string; category: string }[];
}> = {
  "1": {
    name: "FrostyCreations",
    tagline: "Bringing winter magic into your home",
    story: "Hi! I'm Sarah, a ceramic artist based in Vermont. I've been sculpting seasonal figurines for over 10 years, drawing inspiration from snowy New England winters. Each piece is hand-painted and kiln-fired in my small studio.",
    location: "Burlington, VT", joined: "January 2023", avatar: "🎨",
    products: [
      { id: 1, name: "Snowman Figurine", price: 29.99, image: "/snowman-figurine.webp", category: "Decor" },
      { id: 4, name: "Ceramic Mug", price: 24.99, image: "/snowman-figurine.webp", category: "Kitchen" },
    ],
  },
  "2": {
    name: "WoodWhisperer",
    tagline: "Turning raw wood into timeless beauty",
    story: "I'm Marcus, a woodturner from Oregon who discovered my passion in my grandfather's workshop. Every vase, bowl, and sculpture I make tells a story of the tree it came from. I use only sustainably harvested and reclaimed wood.",
    location: "Portland, OR", joined: "March 2022", avatar: "🪵",
    products: [
      { id: 2, name: "Handturned Wooden Vase", price: 39.99, image: "/wooden-vase.webp", category: "Home" },
      { id: 5, name: "Woven Wall Hanging", price: 59.99, image: "/wooden-vase.webp", category: "Decor" },
    ],
  },
  "3": {
    name: "AncientCraft",
    tagline: "Jewelry inspired by ancient civilizations",
    story: "My name is Elena, and I studied archaeology before turning my love of history into wearable art. Each piece is inspired by ancient Greek, Roman, and Egyptian designs, hand-cast in bronze and silver using traditional lost-wax casting.",
    location: "Athens, Greece", joined: "June 2021", avatar: "⚱️",
    products: [
      { id: 3, name: "Greek Bronze Bracelet", price: 49.99, image: "/greek-bracelet.webp", category: "Jewelry" },
      { id: 6, name: "Silver Ring", price: 34.99, image: "/greek-bracelet.webp", category: "Jewelry" },
    ],
  },
};

export default function SellerProfilePage({ params }: { params: { id: string } }) {
  const seller = SELLERS[params.id];

  if (!seller) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-3xl font-bold text-[var(--dark)] mb-2">Seller Not Found</h1>
        <Link href="/shop" className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--dark)] transition">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--light)]">
      <div className="bg-[var(--primary)] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center text-5xl shrink-0">
            {seller.avatar}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold mb-1">{seller.name}</h1>
            <p className="text-white/80 text-lg italic mb-3">&ldquo;{seller.tagline}&rdquo;</p>
            <div className="flex flex-wrap gap-4 text-sm text-white/70 justify-center sm:justify-start">
              <span>📍 {seller.location}</span>
              <span>📅 Joined {seller.joined}</span>
              <span>🛍 {seller.products.length} products</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <section className="bg-white rounded-xl shadow p-8 mb-10">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">About This Artisan</h2>
          <p className="text-[var(--dark)] leading-relaxed">{seller.story}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">{seller.name}&apos;s Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {seller.products.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`} className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">
                <div className="overflow-hidden h-52">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--dark)]">{product.name}</h3>
                    <span className="text-xs text-[var(--muted)]">{product.category}</span>
                  </div>
                  <span className="text-[var(--primary)] font-bold text-lg">${product.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center mt-10">
          <Link href="/shop" className="inline-block border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}