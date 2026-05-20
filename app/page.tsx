import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative h-[550px] flex items-center justify-center px-6 overflow-hidden">
        <Image
          src="/hero-image.png"
          alt="Handcrafted Haven"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Artistry in Every Detail
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-md mx-auto">
            Discover unique handcrafted treasures made with passion and care
          </p>
          <Link
            href="/shop"
            className="inline-block px-10 py-4 bg-[#D4A017] hover:bg-[#C18F00] text-[#2C2118] font-semibold text-lg rounded-lg transition"
          >
            Shop Our Collection
          </Link>
        </div>
      </section>

      {/* TOP PRODUCTS */}
      <section className="px-6 py-20 bg-[#F8F1E3]">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#5C3314]">
          Featured Treasures
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition group">
            <Image
              src="/snowman-figurine.webp"
              alt="Snowman Figurine"
              width={400}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-105 transition"
            />
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-1">Snowman Figurine</h3>
              <p className="text-[#5C3314] font-medium">$29.99</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition group">
            <Image
              src="/wooden-vase.webp"
              alt="Wooden Vase"
              width={400}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-105 transition"
            />
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-1">Handturned Wooden Vase</h3>
              <p className="text-[#5C3314] font-medium">$39.99</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition group">
            <Image
              src="/greek-bracelet.webp"
              alt="Greek Bracelet"
              width={400}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-105 transition"
            />
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-1">Greek Bronze Bracelet</h3>
              <p className="text-[#5C3314] font-medium">$49.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#5C3314]">
          Why Choose Handcrafted Haven
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="font-semibold text-2xl mb-3 text-[#5C3314]">Handcrafted with Love</h3>
            <p className="text-gray-600">Every piece is made by skilled artisans with attention to every detail.</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-2xl mb-3 text-[#5C3314]">Sustainable Materials</h3>
            <p className="text-gray-600">We prioritize eco-friendly and ethically sourced materials.</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-2xl mb-3 text-[#5C3314]">Support Small Makers</h3>
            <p className="text-gray-600">Your purchase directly supports independent creators around the world.</p>
          </div>
        </div>
      </section>

    </div>
  );
}