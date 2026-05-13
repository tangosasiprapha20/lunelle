import { Sparkles, Heart } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

export default function Home({
  products = [],
  comingSoon = [],
  addToCart = () => {},
  cart = [],
  setIsLoggedIn = () => {},
}) {
  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <main className="space-y-12 md:space-y-16">
        {/* bento hero — โครงใหม่ */}
        <section className="grid gap-4 md:grid-cols-12 md:items-stretch md:gap-5">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-zinc-300 bg-white p-7 shadow-md md:col-span-7 md:p-9">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-100/80 blur-2xl" aria-hidden />
            <p className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              <Heart className="h-3.5 w-3.5 fill-amber-400 text-amber-500" aria-hidden />
              Softlane
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl">
              ขนมหวาน
              <span className="block text-2xl font-semibold text-zinc-600 md:text-3xl">
                น่ารักทุกคำ
              </span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600 md:text-base">
              คัดขนมหวานคุณภาพ พร้อมเมนูใหม่ที่กำลังจะเข้า — เลื่อนดูด้านล่างแล้วหยิบใส่ตะกร้าได้เลย
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rotate-[-2deg] rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm">
                🍬 หวานละมุน
              </span>
              <span className="rotate-[1deg] rounded-2xl border-2 border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 shadow-sm">
                ✨ เมนูใหม่เร็วๆ นี้
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:col-span-5">
            <div className="flex flex-1 rotate-[1deg] flex-col justify-center rounded-[1.75rem] border-2 border-zinc-900 bg-zinc-900 p-6 text-white shadow-lg transition hover:rotate-0 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                วันนี้มีอะไรน่าสนใจ
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug">
                หยิบขนมใส่ตะกร้า — มุมขวาบน หรือเมนูลอยด้านล่าง / ซ้าย
              </p>
              <p className="mt-3 text-sm text-zinc-400">
                โทนสีอบอุ่น เลือกขนมได้ทุกหน้า — ตะกร้าอยู่มุมขวาบนเสมอ
              </p>
            </div>
            <div className="-rotate-[1deg] rounded-[1.75rem] border-2 border-zinc-200 bg-white p-5 shadow-sm transition hover:rotate-0">
              <p className="text-sm font-semibold text-zinc-900">ทิปน่ารัก ๆ</p>
              <p className="mt-1 text-sm text-zinc-600">
                ขนมในโซนเร็วๆ นี้ยังสั่งไม่ได้ — แต่สอบถามหรือจองล่วงหน้าได้จากหน้าติดต่อ
              </p>
            </div>
          </div>
        </section>

        {/* เร็วๆ นี้ — แนวนอน snap */}
        {Array.isArray(comingSoon) && comingSoon.length > 0 && (
          <section aria-labelledby="coming-soon-heading">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  id="coming-soon-heading"
                  className="text-xl font-bold text-zinc-900 md:text-2xl"
                >
                  กำลังจะมาเร็วๆ นี้
                </h2>
                <p className="mt-1 max-w-xl text-sm text-zinc-600">
                  เลื่อนซ้าย-ขวาเพื่อดูไลน์ใหม่ — แตะการ์ดเพื่ออ่านรายละเอียด
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900">
                <Sparkles className="h-3.5 w-3.5" />
                Coming soon
              </span>
            </div>

            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
              {comingSoon.map((item) => (
                <article
                  key={item.id}
                  className="w-[min(88vw,320px)] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border-2 border-white bg-white shadow-lg ring-2 ring-zinc-100"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/80 bg-white/95 px-3 py-1 text-xs font-bold text-zinc-900 shadow-sm">
                      {item.eta}
                    </span>
                  </div>
                  <div className="space-y-1 p-4">
                    <h3 className="font-bold text-zinc-900">{item.name}</h3>
                    {item.teaser ? (
                      <p className="text-sm text-zinc-600">{item.teaser}</p>
                    ) : null}
                    <p className="pt-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      ยังไม่พร้อมสั่งออนไลน์
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* พร้อมจำหน่าย — masonry */}
        <section aria-labelledby="shop-heading">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-lg text-white shadow-md">
              🍭
            </span>
            <div>
              <h2
                id="shop-heading"
                className="text-xl font-bold text-zinc-900 md:text-2xl"
              >
                ขนมพร้อมส่ง
              </h2>
              <p className="text-sm text-zinc-600">
                เลือกชิ้นที่ชอบ แล้วกดหยิบใส่ตะกร้าได้เลย
              </p>
            </div>
          </div>

          {Array.isArray(products) && products.length > 0 ? (
            <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
              {products.map((product, i) => (
                <article
                  key={product.id}
                  className={`break-inside-avoid overflow-hidden rounded-[1.75rem] border-2 border-zinc-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
                    i % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
                  } hover:rotate-0`}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-[3/4] w-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-zinc-700 shadow-sm ring-1 ring-zinc-200">
                      หวานน่ารัก
                    </span>
                  </div>
                  <div className="space-y-3 p-4">
                    <h3 className="text-base font-bold leading-snug text-zinc-900">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-lg font-black tabular-nums text-zinc-900">
                        ฿{product.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="rounded-full border-2 border-zinc-900 bg-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-white hover:text-zinc-900"
                      >
                        หยิบใส่ตะกร้า
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-[1.5rem] border-2 border-dashed border-zinc-300 bg-white/70 py-12 text-center text-sm text-zinc-500">
              ไม่มีสินค้า (products ว่าง)
            </p>
          )}
        </section>
      </main>
    </ShopShell>
  );
}
