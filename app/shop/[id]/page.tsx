"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const PRODUCTS: Record<string, {
  name: string; price: number; category: string; image: string;
  seller: string; sellerId: string; description: string; rating: number;
  reviews: { author: string; rating: number; comment: string; date: string }[];
}> = {
  "1": {
    name: "Snowman Figurine", price: 29.99, category: "Decor", image: "/snowman-figurine.webp",
    seller: "FrostyCreations", sellerId: "1",
    description: "This delightful hand-sculpted snowman figurine brings the magic of winter indoors. Each piece is individually thrown on a pottery wheel, bisque fired, hand-painted with food-safe glazes, and glaze fired to a beautiful finish. No two are exactly alike.",
    rating: 4.5,
    reviews: [
      { author: "Emily R.", rating: 5, comment: "Absolutely adorable! Perfect gift for the holidays. The detail work is incredible.", date: "December 2024" },
      { author: "James T.", rating: 4, comment: "Beautiful piece. Arrived well-packaged. Slightly smaller than I expected but still love it.", date: "November 2024" },
    ],
  },
  "2": {
    name: "Handturned Wooden Vase", price: 39.99, category: "Home", image: "/wooden-vase.webp",
    seller: "WoodWhisperer", sellerId: "2",
    description: "Turned from a single piece of sustainably harvested Pacific madrone, this vase showcases the natural beauty of wood grain with a food-safe mineral oil finish. Use it for dried flowers, as a pencil holder, or simply as a sculptural object.",
    rating: 5.0,
    reviews: [
      { author: "Priya M.", rating: 5, comment: "Stunning craftsmanship. The wood grain is absolutely beautiful. A true work of art.", date: "January 2025" },
      { author: "David L.", rating: 5, comment: "Exceeded expectations. Super smooth finish, perfect proportions. Very happy!", date: "February 2025" },
    ],
  },
  "3": {
    name: "Greek Bronze Bracelet", price: 49.99, category: "Jewelry", image: "/greek-bracelet.webp",
    seller: "AncientCraft", sellerId: "3",
    description: "Inspired by jewelry found in ancient Greek tombs, this bracelet is hand-cast in solid bronze using the lost-wax method — the same technique used by artisans 2,500 years ago. The meander (Greek key) pattern wraps around the cuff and is polished to a warm golden finish.",
    rating: 4.8,
    reviews: [
      { author: "Sophia K.", rating: 5, comment: "Gorgeous piece! The history behind it makes it even more special. Gets compliments every time I wear it.", date: "March 2025" },
      { author: "Tom W.", rating: 4, comment: "Beautiful bracelet. Fits a bit snug but I was able to gently bend it open.", date: "April 2025" },
    ],
  },
};

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-sm", md: "text-xl", lg: "text-2xl" };
  return (
    <span className={`text-[var(--accent)] ${sizes[size]}`}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS[params.id];
  const { addToCart } = useCart();
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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

  function handleAddToCart() {
    addToCart({
      id: Number(params.id),
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newAuthor || !newReview) return;
    setSubmitted(true);
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
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs bg-[var(--light)] text-[var(--primary)] px-3 py-1 rounded-full font-semibold">{product.category}</span>
                <h1 className="text-3xl font-bold text-[var(--dark)] mt-3 mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={product.rating} />
                  <span className="text-sm text-[var(--muted)]">{product.rating.toFixed(1)} ({product.reviews.length} reviews)</span>
                </div>
                <p className="text-[var(--muted)] leading-relaxed mb-6">{product.description}</p>
                <Link href={`/sellers/${product.sellerId}`} className="text-sm font-medium text-[var(--primary)] hover:underline">
                  🎨 Sold by {product.seller}
                </Link>
              </div>
              <div className="mt-8">
                <p className="text-4xl font-bold text-[var(--primary)] mb-4">${product.price.toFixed(2)}</p>
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
          <div className="space-y-6">
            {product.reviews.map((review, i) => (
              <div key={i} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[var(--dark)]">{review.author}</span>
                  <span className="text-xs text-[var(--muted)]">{review.date}</span>
                </div>
                <StarRating rating={review.rating} size="sm" />
                <p className="text-[var(--dark)] mt-2 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">Leave a Review</h2>
          {submitted ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-lg font-semibold text-[var(--dark)]">Thank you for your review!</p>
              <p className="text-[var(--muted)] text-sm mt-1">Your feedback helps other shoppers.</p>
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