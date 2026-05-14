import { Sparkles, Gem } from "lucide-react";

const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Login({ setIsLoggedIn = () => {} }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#e5d8c6] via-[#ebe0d2] to-[#e9dfd0] px-5 py-12 font-sans text-left antialiased">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.48] mix-blend-multiply"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(124 94 69 / 0.14) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{ backgroundImage: grainSvg }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#c9a882]/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-[#a67c52]/22 blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-md rounded-[1.85rem_2.2rem_2rem_1.9rem] border-2 border-dashed border-[#a67c52]/65 bg-[#fffdf8] p-8 text-center shadow-[8px_8px_0_0_rgba(92,61,46,0.12)] md:p-10">
        <div className="pointer-events-none absolute -right-1 top-8 h-12 w-20 rotate-[10deg] rounded-sm bg-[#dccfb8]/90 ring-1 ring-[#c9b49a]/50" aria-hidden />
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#c9b49a] bg-[#efe4d4] text-[#5c3d2e] shadow-[3px_3px_0_0_rgba(139,99,70,0.25)]">
          <Gem className="h-9 w-9" strokeWidth={1.75} />
        </div>

        <p className="inline-flex items-center gap-1.5 rounded-full border border-[#c9b49a]/80 bg-[#efe4d4]/90 px-3 py-1 font-craft text-xs font-semibold tracking-wide text-[#5c3d2e]">
          <Sparkles className="h-3.5 w-3.5 text-[#8b6346]" strokeWidth={1.75} aria-hidden />
          Lunelle
        </p>

        <h1 className="font-craft mt-5 text-2xl font-bold leading-snug text-[#3c2a22] md:text-3xl">
          เครื่องประดับทำมือ
        </h1>
        <p className="mt-2 font-craft text-sm text-[#8b6346]">✿ handmade ✿</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#5c4d3f]">
          สร้อย ลูกปัด และแหวนที่ร้อยเองทีละเม็ด — เข้ามาเลือกชิ้นที่ชอบใส่ตะกร้าได้เลยค่ะ
        </p>

        <button
          type="button"
          onClick={() => setIsLoggedIn(true)}
          className="font-craft mt-8 w-full rounded-2xl border-2 border-[#5c3d2e] bg-[#5c3d2e] py-4 text-sm font-bold tracking-wide text-[#faf4ea] shadow-[4px_4px_0_0_rgba(201,180,154,0.55)] transition hover:bg-[#fffdf8] hover:text-[#3c2a22]"
        >
          เข้าชมคอลเลกชัน
        </button>
      </div>
    </div>
  );
}
