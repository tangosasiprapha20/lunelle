import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

const contacts = [
  {
    label: "Instagram",
    icon: "📸",
    value: "@lunelle.handmade",
    href: "https://www.instagram.com/3rdtango?igsh=d3I2eDRjNGNoeG93&utm_source=qr",
  },
  {
    label: "Line",
    icon: "💬",
    value: "แชทกับร้าน",
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
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-[#a67c52]/55 bg-[#fffdf8] p-8 shadow-md md:p-10">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#dccfb8]/90 blur-2xl" aria-hidden />
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c9b49a]/80 bg-[#efe4d4] px-3 py-1.5 font-craft text-xs font-semibold tracking-wide text-[#5c3d2e]">
            <Mail className="h-4 w-4 text-[#6b4f3c]" strokeWidth={1.75} aria-hidden />
            Contact
          </span>
          <h1 className="font-craft mt-4 text-3xl font-bold tracking-wide text-[#3c2a22] md:text-4xl">
            ช่องทางการติดต่อ
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c4d3f] md:text-base">
            สอบถามสต็อก การปรับไซส์สร้อย หรือการจัดส่งได้ทุกช่องทางด้านล่าง
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
              className={`group flex flex-col rounded-[1.75rem] border-2 border-[#c9b49a] bg-[#fffdf8] p-6 shadow-md transition hover:-translate-y-1 hover:border-[#a67c52] hover:shadow-xl ${
                idx === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-bold text-[#6b4f3c]">{item.label}</p>
              </div>
              <div className="mt-4 grow rounded-2xl border-2 border-dashed border-[#c9b49a] bg-[#efe4d4] px-4 py-3">
                <p className="text-lg font-bold text-[#3c2a22] group-hover:text-[#5c3d2e]">
                  {item.value}
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#a67c52]">
                แตะเพื่อเปิดช่องทาง
              </p>
            </a>
          ))}
        </div>

        <div className="rounded-[1.75rem] border-2 border-[#c9b49a] bg-[#fffdf8] p-6 shadow-sm">
          <p className="text-sm font-bold text-[#5c4d3f]">ไปต่อที่ไหนดี?</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/home"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-2xl border-2 border-[#5c3d2e] bg-[#5c3d2e] px-5 py-2.5 text-sm font-bold text-[#faf4ea] shadow-[3px_3px_0_0_rgba(201,180,154,0.45)] transition hover:bg-[#fffdf8] hover:text-[#3c2a22]"
            >
              กลับหน้าแรก
            </Link>
            <Link
              to="/cart"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-[#c9b49a] bg-[#efe4d4] px-5 py-2.5 text-sm font-bold text-[#3c2a22] transition hover:bg-white"
            >
              ไปตะกร้า
            </Link>
            <Link
              to="/about"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-[#c9b49a] bg-[#fffdf8] px-5 py-2.5 text-sm font-bold text-[#3c2a22] transition hover:bg-[#efe4d4]"
            >
              เกี่ยวกับเรา
            </Link>
          </div>
        </div>
      </div>
    </ShopShell>
  );
}
