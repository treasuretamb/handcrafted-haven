"use client";
import { useState } from "react";
import Link from "next/link";

const PRODUCTS = [
  { id: 1, name: "Snowman Figurine", price: 29.99, category: "Decor", seller: "FrostyCreations", sellerId: "1", image: "/snowman-figurine.webp", rating: 4.5, reviews: 12 },
  { id: 2, name: "Handturned Wooden Vase", price: 39.99, category: "Home", seller: "WoodWhisperer", sellerId: "2", image: "/wooden-vase.webp", rating: 5.0, reviews: 8 },
  { id: 3, name: "Greek Bronze Bracelet", price: 49.99, category: "Jewelry", seller: "AncientCraft", sellerId: "3", image: "/greek-bracelet.webp", rating: 4.8, reviews: 20 },
  { id: 4, name: "Ceramic Mug", price: 24.99, category: "Kitchen", seller: "ClayStudio", sellerId: "4", image: "/snowman-figurine.webp", rating: 4.2, reviews: 15 },
  { id: 5, name: "Woven Wall Hanging", price: 59.99, category: "Decor", seller: "FiberArts", sellerId: "5", image: "/wooden-vase.webp", rating: 4.7, reviews: 6 },
  { id: 6, name: "Silver Ring", price: 34.99, category: "Jewelry", seller: "MetalMuse", sellerId: "6", image: "/greek-bracelet.webp", rating: 4.4, reviews: 18 },
];

const CATEGORIES = ["All", "Decor", "Home", "Jewelry", "Kitchen"];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-[var(--accent)] text-sm">
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = PRODUCTS
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) => p.price <= maxPrice)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[var(--light)]">
      <div className="bg-[var(--primary)] text-white py-14 px-6 text-center">
        <h1 className="text-5xl font-bold mb-3">Shop Our Collection</h1>
        <p className="text-white/80 text-lg">Handcrafted with love by talented artisans</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        <aside className="md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow p-6 sticky top-6">
            <h2 className="text-xl font-bold text-[var(--primary)] mb-6">Filters</h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-[var(--dark)] mb-2">Search</label>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-[var(--dark)] mb-2">Category</label>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition ${
                      selectedCategory === cat
                        ? "bg-[var(--primary)] text-white font-medium"
                        : "text-[var(--dark)] hover:bg-[var(--light)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="price-range" className="block text-sm font-semibold text-[var(--dark)] mb-2">
                  Max Price: <span className="text-[var(--accent)] font-bold">${maxPrice}</span>
                </label>
                <input
                  id="price-range"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$10</span><span>$100</span>
              </div>
            </div>

            <div>
              <label htmlFor="sort-by" className="block text-sm font-semibold text-[var(--dark)] mb-2">Sort By</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products by"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <p className="text-sm text-[var(--muted)] mb-6">{filtered.length} item{filtered.length !== 1 ? "s" : ""} found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[var(--muted)]">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-xl">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Link key={product.id} href={`/shop/${product.id}`} className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[var(--accent)] text-[var(--dark)] text-xs font-semibold px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-[var(--dark)] mb-1">{product.name}</h3>
                    <Link
                      href={`/sellers/${product.sellerId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition"
                    >
                      by {product.seller}
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[var(--primary)] font-bold text-lg">${product.price.toFixed(2)}</span>
                      <span className="text-xs bg-[var(--light)] text-[var(--primary)] px-3 py-1 rounded-full font-medium">View Item →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}