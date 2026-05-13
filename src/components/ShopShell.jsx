import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, LogOut, Sparkles } from "lucide-react";

/** เมนูลอย/แถบล่าง: ลบออเดอร์ เกี่ยวกับ ติดต่อ ตะกร้า (ซ้ำกับแถบบน) — เหลือเฉพาะหน้าแรก; ถ้าเหลือ 1 ปุ่มจะไม่แสดงแถบเมนู */
const nav = [{ to: "/home", label: "หน้าแรก", icon: Home }];

function NavLink({ to, label, icon: Icon, active }) {
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-all md:h-12 md:w-12 ${
        active
          ? "border-zinc-900 bg-zinc-900 text-white shadow-md"
          : "border-transparent bg-zinc-100 text-zinc-600 hover:border-zinc-200 hover:bg-white hover:text-zinc-900"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </Link>
  );
}

export default function ShopShell({
  children,
  cart = [],
  setIsLoggedIn = () => {},
}) {
  const { pathname } = useLocation();
  const count = Array.isArray(cart) ? cart.length : 0;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-100 text-left text-zinc-900">
      {/* soft pattern + blobs — same zinc family */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.55]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(212 212 216) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="pointer-events-none fixed -left-24 top-20 h-72 w-72 rounded-full bg-zinc-200/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-16 bottom-32 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white/40 blur-3xl"
        aria-hidden
      />

      {/* top brand strip — compact, cute pills */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <Link
            to="/home"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-dashed border-zinc-300 bg-white px-3 py-1.5 pr-4 shadow-sm transition hover:border-zinc-400"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition group-hover:scale-105">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
            </span>
            <span className="text-sm font-semibold tracking-tight text-zinc-900 md:text-base">
              Softlane
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-zinc-200 bg-white text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              aria-label="ตะกร้า"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={2} />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">
                  {count > 9 ? "9+" : count}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-zinc-200 bg-zinc-50 text-zinc-600 transition hover:bg-white hover:text-zinc-900"
              title="ออกจากระบบ"
              aria-label="ออกจากระบบ"
            >
              <LogOut className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* desktop: floating dock — แสดงเมื่อมีหลายปุ่ม */}
      {nav.length > 1 ? (
        <nav
          className="pointer-events-none fixed bottom-8 left-6 z-40 hidden md:block"
          aria-label="เมนูหลัก"
        >
          <div className="pointer-events-auto flex flex-col gap-2 rounded-full border-2 border-zinc-200/90 bg-white/95 p-2 shadow-xl shadow-zinc-900/10 backdrop-blur-sm">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                {...item}
                active={pathname === item.to}
              />
            ))}
          </div>
        </nav>
      ) : null}

      {/* mobile: bottom nav — แสดงเมื่อมีหลายปุ่ม (ไม่โชว์แถบว่างเมื่อเหลือหน้าแรกอย่างเดียว) */}
      {nav.length > 1 ? (
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200/80 bg-white/95 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_40px_rgba(24,24,27,0.08)] backdrop-blur-md md:hidden"
          aria-label="เมนูหลัก"
        >
          <div className="mx-auto flex max-w-lg items-center justify-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                {...item}
                active={pathname === item.to}
              />
            ))}
          </div>
        </nav>
      ) : null}

      <div
        className={`relative z-10 mx-auto max-w-6xl px-4 pt-6 md:px-8 ${
          nav.length > 1 ? "pb-28 md:pb-12 md:pl-20" : "pb-12"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
