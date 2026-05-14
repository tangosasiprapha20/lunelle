import { useMemo, useState } from "react";
import { Sparkles, Gem } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

const CATEGORY_LABELS = {
  all: "ทั้งหมด",
  necklace: "สร้อย",
  beads: "ลูกปัด",
  ring: "แหวน",
};

export default function Home({
  products = [],
  comingSoon = [],
  addToCart = () => {},
  cart = [],
  setIsLoggedIn = () => {},
}) {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <main className="space-y-10 md:space-y-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <section className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
            <div
              className="relative overflow-hidden rounded-[1.75rem_2.25rem_2rem_1.85rem] border-2 border-dashed border-[#a67c52]/65 bg-[#fffdf8] p-7 shadow-[6px_6px_0_0_rgba(92,61,46,0.12)] md:p-8"
              style={{
                backgroundImage:
                  "linear-gradient(165deg, rgba(255,253,248,0.97) 0%, rgba(250,244,234,0.98) 55%, rgba(239,228,212,0.35) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-2 top-6 h-14 w-24 rotate-[8deg] rounded-sm bg-[#dccfb8]/85 shadow-sm ring-1 ring-[#c9b49a]/60"
                aria-hidden
              />
              <div
                className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#c9a882]/30 blur-2xl"
                aria-hidden
              />
              <p className="inline-flex items-center gap-2 rounded-full border border-[#c9b49a]/80 bg-[#efe4d4]/90 px-3 py-1.5 font-craft text-xs font-semibold tracking-wide text-[#5c3d2e]">
                <Gem
                  className="h-3.5 w-3.5 text-[#8b6346]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                handmade with care
              </p>
              <h1 className="font-craft mt-5 text-3xl font-bold leading-[1.2] tracking-wide text-[#3c2a22] md:text-[2.35rem]">
                เครื่องประดับทำมือ
                <span className="mt-2 block font-craft text-[1.35rem] font-semibold italic text-[#6b4f3c] md:text-2xl">
                  ลูกปัด · สร้อย · แหวน
                </span>
              </h1>
              <p className="mt-2 text-center font-craft text-sm text-[#8b6346]">
                ✿ · ✿ · ✿
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#5c4d3f] md:text-base">
                คัดลูกปัดและเชือกเอง ร้อยและมัดทีละชิ้น — งานไม่ซ้ำเป๊ะทุกเม็ด
                เลือกหมวดแล้วหยิบใส่ตะกร้าได้เลยค่ะ
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rotate-[-1deg] rounded-2xl border-2 border-[#c9b49a] bg-[#efe4d4] px-3 py-1.5 font-craft text-xs font-semibold text-[#5c3d2e] shadow-sm">
                  โทนน้ำตาลอบอุ่น
                </span>
                <span className="rotate-[1deg] rounded-2xl border-2 border-[#a67c52]/70 bg-[#dccfb8]/80 px-3 py-1.5 font-craft text-xs font-semibold text-[#3c2a22] shadow-sm">
                  งานจำกัดต่อแบบ
                </span>
              </div>
            </div>

            <div className="rounded-[1.6rem_2rem_1.8rem_2rem] border-2 border-[#c9b49a] bg-[#faf4ea] p-5 shadow-[4px_4px_0_0_rgba(166,124,82,0.2)]">
              <p className="font-craft text-sm font-bold tracking-wide text-[#6b4f3c]">
                เลือกหมวด
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {Object.entries(CATEGORY_LABELS).map(([key, label], i) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
                      category === key
                        ? "border-[#5c3d2e] bg-[#5c3d2e] text-[#faf4ea] shadow-[3px_3px_0_0_rgba(60,42,34,0.25)]"
                        : `border-[#dccfb8] bg-[#fffdf8] text-[#3c2a22] shadow-sm hover:border-[#a67c52] hover:bg-[#fffdf8] ${i % 2 === 1 ? "translate-x-0.5" : ""}`
                    }`}
                  >
                    <span className={category === key ? "" : "font-craft"}>
                      {label}
                    </span>
                    {category === key ? (
                      <span className="font-craft text-xs text-[#dccfb8]">
                        เลือกอยู่
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#5c3d2e] bg-[#4a3228] p-6 text-[#faf4ea] shadow-[5px_5px_0_0_rgba(201,180,154,0.5)]">
              <p className="font-craft text-sm font-semibold tracking-wide text-[#dccfb8]">
                แพ็กด้วยมือ
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#efe4d4]">
                ห่อกระดาษคราฟท์ก่อนส่ง — อยากปรับความยาวสร้อยหรือสอบถามไซส์
                ทักมาที่หน้าติดต่อได้เลยนะคะ
              </p>
            </div>
          </section>

          <div className="space-y-10 lg:col-span-8">
            {Array.isArray(comingSoon) && comingSoon.length > 0 && (
              <section aria-labelledby="coming-soon-heading">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2
                      id="coming-soon-heading"
                      className="font-craft text-xl font-bold text-[#3c2a22] md:text-2xl"
                    >
                      กำลังทำอยู่ค่ะ
                    </h2>
                    <p className="mt-1 max-w-xl text-sm text-[#5c4d3f]">
                      คอลเลกชันใหม่ที่กำลังประกอบ — แตะการ์ดอ่านรายละเอียด
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-[#c9b49a] bg-[#efe4d4] px-3 py-1.5 font-craft text-xs font-semibold text-[#5c3d2e]">
                    <Sparkles
                      className="h-3.5 w-3.5 text-[#8b6346]"
                      strokeWidth={1.75}
                    />
                    soon
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {comingSoon.map((item, idx) => (
                    <article
                      key={item.id}
                      className={`overflow-hidden rounded-[1.65rem_2rem_1.85rem_2rem] border-2 border-[#c9b49a] bg-[#fffdf8] shadow-[5px_6px_0_0_rgba(139,99,70,0.15)] ring-1 ring-[#dccfb8]/60 ${
                        idx % 2 === 1 ? "sm:translate-y-2" : ""
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <img
                          src={item.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3c2a22]/60 via-transparent to-transparent" />
                        <span className="font-craft absolute left-3 top-3 rounded-xl border border-[#faf4ea]/90 bg-[#faf4ea]/95 px-3 py-1 text-xs font-bold text-[#3c2a22] shadow-sm">
                          {item.eta}
                        </span>
                      </div>
                      <div className="space-y-1 p-4">
                        <h3 className="font-craft text-lg font-bold text-[#3c2a22]">
                          {item.name}
                        </h3>
                        {item.teaser ? (
                          <p className="text-sm text-[#5c4d3f]">{item.teaser}</p>
                        ) : null}
                        <p className="pt-2 text-[11px] font-semibold uppercase tracking-wider text-[#a67c52]">
                          ยังไม่พร้อมสั่งออนไลน์
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section aria-labelledby="shop-heading">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#5c3d2e] bg-[#efe4d4] font-craft text-lg text-[#5c3d2e] shadow-[3px_3px_0_0_rgba(92,61,46,0.2)]">
                    ✿
                  </span>
                  <div>
                    <h2
                      id="shop-heading"
                      className="font-craft text-xl font-bold text-[#3c2a22] md:text-2xl"
                    >
                      {category === "all"
                        ? "ชิ้นพร้อมส่ง"
                        : CATEGORY_LABELS[category]}
                    </h2>
                    <p className="text-sm text-[#5c4d3f]">
                      {filtered.length} ชิ้น · ทำมือทีละชิ้น
                    </p>
                  </div>
                </div>
              </div>

              {filtered.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {filtered.map((product, i) => (
                    <article
                      key={product.id}
                      className={`flex flex-col overflow-hidden rounded-[1.7rem_2.1rem_1.9rem_1.75rem] border-2 border-[#c9b49a] bg-[#fffdf8] shadow-[5px_6px_0_0_rgba(92,61,46,0.1)] transition hover:-translate-y-0.5 hover:border-[#a67c52] hover:shadow-[6px_7px_0_0_rgba(139,99,70,0.18)] ${
                        i % 2 === 1 ? "sm:rotate-[0.4deg]" : "sm:-rotate-[0.3deg]"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="aspect-[4/5] w-full object-cover"
                        />
                        <span className="font-craft absolute bottom-3 left-3 rounded-xl border border-[#c9b49a]/80 bg-[#faf4ea]/95 px-2.5 py-1 text-[11px] font-bold text-[#5c3d2e] shadow-sm">
                          {CATEGORY_LABELS[product.category] ?? "แฮนด์เมด"}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col space-y-3 p-4">
                        <h3 className="font-craft text-base font-bold leading-snug text-[#3c2a22]">
                          {product.name}
                        </h3>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                          <span className="text-lg font-bold tabular-nums text-[#5c3d2e]">
                            ฿{product.price}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            className="font-craft rounded-2xl border-2 border-[#5c3d2e] bg-[#5c3d2e] px-4 py-2 text-xs font-bold tracking-wide text-[#faf4ea] shadow-[2px_2px_0_0_rgba(201,180,154,0.6)] transition hover:bg-[#fffdf8] hover:text-[#3c2a22]"
                          >
                            หยิบใส่ตะกร้า
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border-2 border-dashed border-[#c9b49a] bg-[#faf4ea]/90 py-12 text-center text-sm text-[#6b4f3c]">
                  ไม่มีสินค้าในหมวดนี้ค่ะ
                </p>
              )}
            </section>
          </div>
        </div>
      </main>
    </ShopShell>
  );
}
