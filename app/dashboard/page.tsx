"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  created_at: string;
};

const CATEGORIES = ["Decor", "Home", "Jewelry", "Kitchen", "Clothing", "Art", "Other"];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Decor");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
      return;
    }
    if (status !== "authenticated") return;

    const role = (session.user as { role?: string }).role;
    if (role !== "seller") {
      router.push("/");
      return;
    }

    const userId = (session?.user as { id?: string })?.id;

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const mine = (data.products || []).filter(
          (p: Product & { seller_id: number }) => String(p.seller_id) === String(userId)
        );
        setProducts(mine);
        setLoading(false);
      });
  }, [status, session]);

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !price || !category) {
      setError("Name, price and category are required.");
      return;
    }
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price: parseFloat(price), category, image }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Failed to add product.");
      return;
    }

    setSuccess("Product added successfully!");
    setName(""); setDescription(""); setPrice(""); setCategory("Decor"); setImage("");
    setShowForm(false);
    setTimeout(() => setSuccess(""), 3000);

    const userId = (session?.user as { id?: string })?.id;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const mine = (data.products || []).filter(
          (p: Product & { seller_id: number }) => String(p.seller_id) === String(userId)
        );
        setProducts(mine);
      });
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--muted)] text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--light)] py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[var(--dark)]">Seller Dashboard</h1>
            <p className="text-[var(--muted)] mt-1">Welcome back, {session?.user?.name}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[var(--primary)] hover:bg-[var(--dark)] text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            {showForm ? "Cancel" : "+ Add New Product"}
          </button>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6 text-sm">
            {success}
          </div>
        )}

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow p-8 mb-10">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">Add New Product</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="product-name" className="block text-sm font-semibold text-[var(--dark)] mb-1">Product Name *</label>
                <input
                  id="product-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Hand-painted Vase"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="product-price" className="block text-sm font-semibold text-[var(--dark)] mb-1">Price ($) *</label>
                <input
                  id="product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="29.99"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label htmlFor="product-category" className="block text-sm font-semibold text-[var(--dark)] mb-1">Category *</label>
                <select
                  id="product-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="product-image" className="block text-sm font-semibold text-[var(--dark)] mb-1">Image URL</label>
                <input
                  id="product-image"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/my-product.webp (optional)"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="product-description" className="block text-sm font-semibold text-[var(--dark)] mb-1">Description</label>
                <textarea
                  id="product-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your handcrafted item..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                />
              </div>
            </div>
            <button
              onClick={handleAddProduct}
              disabled={submitting}
              className="mt-6 bg-[var(--primary)] hover:bg-[var(--dark)] disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-lg transition"
            >
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        )}

        {/* Products List */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">
            Your Listings ({products.length})
          </h2>
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow">
              <p className="text-5xl mb-4">🎨</p>
              <p className="text-xl font-semibold text-[var(--dark)] mb-2">No products yet</p>
              <p className="text-[var(--muted)]">Click &quot;Add New Product&quot; to list your first item.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow overflow-hidden">
                  <img
                    src={product.image || "/snowman-figurine.webp"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <span className="text-xs bg-[var(--light)] text-[var(--primary)] px-2 py-1 rounded-full font-semibold">{product.category}</span>
                    <h3 className="font-semibold text-lg text-[var(--dark)] mt-2">{product.name}</h3>
                    <p className="text-[var(--primary)] font-bold mt-1">${Number(product.price).toFixed(2)}</p>
                    <Link
                      href={`/shop/${product.id}`}
                      className="mt-3 inline-block text-sm text-[var(--primary)] hover:underline"
                    >
                      View in Shop →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}