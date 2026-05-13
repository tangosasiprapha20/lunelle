import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

const contacts = [
  {
    label: "Instagram",
    icon: "📸",
    value: "@softlane.th",
    href: "https://www.instagram.com/3rdtango?igsh=d3I2eDRjNGNoeG93&utm_source=qr",
  },
  {
    label: "Line",
    icon: "💬",
    value: "@softlane",
    href: "https://line.me/ti/p/ZcosbJ4QOQ",
  },
  {
    label: "โทรศัพท์",
    icon: "📞",
    value: "097-958-9118",
    href: "tel:0979589118",
  },
];

export default function Contact({
  cart = [],
  setIsLoggedIn = () => {},
}) {
  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-zinc-300 bg-white p-8 shadow-md md:p-10">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-100/90 blur-2xl" aria-hidden />
          <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600">
            <Mail className="h-4 w-4 text-zinc-500" aria-hidden />
            Contact
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            ช่องทางการติดต่อ
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 md:text-base">
            สอบถามเมนูขนม สต็อก และการจัดส่งได้ทุกช่องทางด้านล่าง
            ทางร้านตอบกลับตามลำดับคิวข้อความ
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className={`group flex flex-col rounded-[1.75rem] border-2 border-zinc-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl ${
                idx === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-bold text-zinc-500">{item.label}</p>
              </div>
              <div className="mt-4 grow rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 px-4 py-3">
                <p className="text-lg font-bold text-zinc-900 group-hover:text-zinc-700">
                  {item.value}
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                แตะเพื่อเปิดช่องทาง
              </p>
            </a>
          ))}
        </div>

        <div className="rounded-[1.75rem] border-2 border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-zinc-600">ไปต่อที่ไหนดี?</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/home"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-zinc-900"
            >
              กลับหน้าแรก
            </Link>
            <Link
              to="/cart"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-bold text-zinc-800 transition hover:bg-white"
            >
              ไปตะกร้า
            </Link>
            <Link
              to="/about"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-zinc-800 transition hover:bg-zinc-50"
            >
              เกี่ยวกับเรา
            </Link>
          </div>
        </div>
      </div>
    </ShopShell>
  );
}
