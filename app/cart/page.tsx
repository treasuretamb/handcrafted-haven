"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--light)] flex flex-col items-center justify-center text-center px-6">
        <p className="text-7xl mb-6">🛒</p>
        <h1 className="text-3xl font-bold text-[var(--dark)] mb-3">Your cart is empty</h1>
        <p className="text-[var(--muted)] mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className="bg-[var(--primary)] hover:bg-[var(--dark)] text-white font-semibold px-8 py-3 rounded-lg transition">
          Browse the Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--light)] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--dark)] mb-8">Your Cart</h1>

        <div className="flex flex-col gap-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row items-center gap-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-lg text-[var(--dark)]">{item.name}</h3>
                <p className="text-sm text-[var(--muted)]">by {item.seller}</p>
                <p className="text-[var(--primary)] font-bold mt-1">${item.price.toFixed(2)} each</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-bold hover:bg-[var(--primary)] hover:text-white transition flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-bold hover:bg-[var(--primary)] hover:text-white transition flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <p className="font-bold text-lg text-[var(--dark)] w-20 text-center">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="text-red-400 hover:text-red-600 transition text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 max-w-sm ml-auto">
          <h2 className="text-xl font-bold text-[var(--dark)] mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm text-[var(--muted)] mb-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)] mb-4">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-[var(--dark)] border-t pt-4 mb-6">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-[var(--primary)] hover:bg-[var(--dark)] text-white font-semibold py-3 rounded-lg transition">
            Proceed to Checkout
          </button>
          <button
            onClick={clearCart}
            className="w-full mt-3 text-sm text-red-400 hover:text-red-600 transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-6">
          <Link href="/shop" className="inline-block border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}