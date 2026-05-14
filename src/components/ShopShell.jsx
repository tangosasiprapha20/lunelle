import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  LogOut,
  Gem,
  BookOpen,
  Mail,
  ClipboardList,
} from "lucide-react";

const nav = [
  { to: "/home", label: "หน้าแรก", icon: Home },
  { to: "/about", label: "เกี่ยวกับ", icon: BookOpen },
  { to: "/contact", label: "ติดต่อ", icon: Mail },
  { to: "/orders", label: "ออเดอร์", icon: ClipboardList },
];

const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function NavLink({ to, label, icon: Icon, active }) {
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-[#c9b49a]/90 transition-all md:h-12 md:w-12 ${
        active
          ? "border-[#5c3d2e] bg-[#5c3d2e] text-[#faf4ea] shadow-[3px_3px_0_0_rgba(92,61,46,0.25)]"
          : "border-transparent bg-[#faf4ea]/90 text-[#5c4d3f] shadow-sm hover:border-[#b89b7a] hover:bg-[#fffdf8] hover:text-[#3c2a22]"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </Link>
  );
}

function HeaderNavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`rounded-2xl px-3.5 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[#5c3d2e] text-[#faf4ea] shadow-[2px_2px_0_0_rgba(139,99,70,0.35)]"
          : "text-[#5c4d3f] hover:bg-[#faf4ea] hover:text-[#3c2a22]"
      }`}
    >
      {label}
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
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#e5d8c6] via-[#ebe0d2] to-[#e9dfd0] font-sans text-left text-[#3c2a22] antialiased">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.5] mix-blend-multiply"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(124 94 69 / 0.14) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.045]"
        aria-hidden
        style={{ backgroundImage: grainSvg }}
      />
      <div
        className="pointer-events-none fixed -left-28 top-16 h-80 w-80 rounded-full bg-[#c9a882]/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-20 bottom-24 h-72 w-72 rounded-full bg-[#a67c52]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed left-1/2 top-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#dccfb8]/35 blur-3xl"
        aria-hidden
      />

      <header className="sticky top-0 z-50 border-b-2 border-[#c9b49a]/80 bg-[#faf4ea]/92 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-6">
            <Link
              to="/home"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-2xl border-2 border-dashed border-[#a67c52]/55 bg-[#fffdf8] px-3 py-2 pr-4 shadow-[3px_3px_0_0_rgba(92,61,46,0.12)] transition hover:border-[#8b6346]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#efe0cf] text-[#5c3d2e] transition group-hover:rotate-[-4deg] group-hover:scale-105">
                <Gem className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="font-craft truncate text-lg font-semibold tracking-wide text-[#3c2a22] md:text-xl">
                Lunelle
              </span>
            </Link>

            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex"
              aria-label="เมนูหลัก"
            >
              {nav.map((item) => (
                <HeaderNavLink
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  active={pathname === item.to}
                />
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/cart"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#c9b49a] bg-[#fffdf8] text-[#3c2a22] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8b6346] hover:shadow-[3px_3px_0_0_rgba(139,99,70,0.2)]"
              aria-label="ตะกร้า"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-lg bg-[#5c3d2e] px-1 font-craft text-[11px] font-bold text-[#faf4ea]">
                  {count > 9 ? "9+" : count}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#c9b49a] bg-[#efe4d4]/80 text-[#5c4d3f] transition hover:bg-[#fffdf8] hover:text-[#3c2a22]"
              title="ออกจากระบบ"
              aria-label="ออกจากระบบ"
            >
              <LogOut className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <nav
        className="pointer-events-none fixed bottom-8 left-6 z-40 hidden md:block"
        aria-label="เมนูลัด"
      >
        <div className="pointer-events-auto flex flex-col gap-2 rounded-3xl border-2 border-[#c9b49a] bg-[#faf4ea]/95 p-2 shadow-[4px_6px_0_0_rgba(92,61,46,0.12)] backdrop-blur-sm">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              {...item}
              active={pathname === item.to}
            />
          ))}
        </div>
      </nav>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-[#c9b49a]/90 bg-[#faf4ea]/96 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_32px_rgba(60,42,34,0.08)] backdrop-blur-md md:hidden"
        aria-label="เมนูหลัก"
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-0.5 px-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              {...item}
              active={pathname === item.to}
            />
          ))}
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-6 md:px-8 md:pb-12 md:pl-20">
        {children}
      </div>
    </div>
  );
}
