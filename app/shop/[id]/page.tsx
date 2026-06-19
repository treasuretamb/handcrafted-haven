"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

type Review = {
  id: number;
  author: string;
  rating: number;
  comment: string;
  created_at: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  seller_name: string;
  seller_id: number;
};

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-sm", md: "text-xl", lg: "text-2xl" };
  return (
    <span className={`text-[var(--accent)] ${sizes[size]}`}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => setProductId(id));
  }, [params]);

  useEffect(() => {
    if (!productId) return;
    fetch(`/api/products/${productId}`)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--muted)] text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-3xl font-bold text-[var(--dark)] mb-2">Product Not Found</h1>
        <Link href="/shop" className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--dark)] transition">
          Back to Shop
        </Link>
      </div>
    );
  }

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  function handleAddToCart() {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      seller: product.seller_name,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newAuthor || !newReview) return;

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product!.id,
        author: newAuthor,
        rating: newRating,
        comment: newReview,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setReviews((prev) => [data.review, ...prev]);
      setSubmitted(true);
      setNewAuthor("");
      setNewReview("");
      setNewRating(5);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--light)] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <nav className="text-sm text-[var(--muted)] mb-8">
          <Link href="/" className="hover:text-[var(--primary)]">Home</Link>{" / "}
          <Link href="/shop" className="hover:text-[var(--primary)]">Shop</Link>{" / "}
          <span className="text-[var(--dark)]">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
          <div className="grid md:grid-cols-2">
            <div className="overflow-hidden h-80 md:h-auto">
              <img src={product.image || "/snowman-figurine.webp"} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs bg-[var(--light)] text-[var(--primary)] px-3 py-1 rounded-full font-semibold">{product.category}</span>
                <h1 className="text-3xl font-bold text-[var(--dark)] mt-3 mb-2">{product.name}</h1>
                {avgRating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={avgRating} />
                    <span className="text-sm text-[var(--muted)]">{avgRating.toFixed(1)} ({reviews.length} reviews)</span>
                  </div>
                )}
                <p className="text-[var(--muted)] leading-relaxed mb-6">{product.description}</p>
                <p className="text-sm font-medium text-[var(--primary)]">
                  🎨 Sold by {product.seller_name}
                </p>
              </div>
              <div className="mt-8">
                <p className="text-4xl font-bold text-[var(--primary)] mb-4">${Number(product.price).toFixed(2)}</p>
                <button
                  onClick={handleAddToCart}
                  className={`w-full font-semibold py-4 rounded-xl transition text-lg ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-[var(--primary)] hover:bg-[var(--dark)] text-white"
                  }`}
                >
                  {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-[var(--muted)]">No reviews yet. Be the first!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[var(--dark)]">{review.author}</span>
                    <span className="text-xs text-[var(--muted)]">
                      {new Date(review.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                  <p className="text-[var(--dark)] mt-2 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">Leave a Review</h2>
          {submitted ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-lg font-semibold text-[var(--dark)]">Thank you for your review!</p>
              <button onClick={() => setSubmitted(false)} className="mt-3 text-sm text-[var(--primary)] hover:underline">
                Leave another review
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label htmlFor="reviewer-name" className="block text-sm font-semibold text-[var(--dark)] mb-1">Your Name</label>
                <input
                  id="reviewer-name"
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Jane D."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--dark)] mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`text-3xl transition ${star <= newRating ? "text-[var(--accent)]" : "text-gray-300"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="review-text" className="block text-sm font-semibold text-[var(--dark)] mb-1">Your Review</label>
                <textarea
                  id="review-text"
                  rows={4}
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                />
              </div>
              <button
                onClick={handleReviewSubmit}
                disabled={!newAuthor || !newReview}
                className="bg-[var(--primary)] hover:bg-[var(--dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                Submit Review
              </button>
            </div>
          )}
        </section>

        <div className="text-center mt-8">
          <Link href="/shop" className="inline-block border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}