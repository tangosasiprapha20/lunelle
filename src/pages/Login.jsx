import { Sparkles, Candy } from "lucide-react";

export default function Login({ setIsLoggedIn = () => {} }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-100 px-5 py-12 text-left">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(212 212 216) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-pink-100/50 blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-md rounded-[2rem] border-2 border-dashed border-zinc-300 bg-white p-8 text-center shadow-xl shadow-zinc-900/10 md:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Candy className="h-9 w-9" strokeWidth={2} />
        </div>

        <p className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden />
          Softlane
        </p>

        <h1 className="mt-4 text-2xl font-bold text-zinc-900 md:text-3xl">
          ร้านขนมหวานน่ารัก
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-600">
          ไม่ต้องกรอกอีเมล — กดปุ่มด้านล่างแล้วเลือกขนมในตะกร้าได้เลย
        </p>

        <button
          type="button"
          onClick={() => setIsLoggedIn(true)}
          className="mt-8 w-full rounded-full border-2 border-zinc-900 bg-zinc-900 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-zinc-900"
        >
          เข้าเลือกขนมเลย
        </button>
      </div>
    </div>
  );
}
