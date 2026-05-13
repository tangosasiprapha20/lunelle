import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

const steps = [
  {
    n: 1,
    title: "เลือกขนม",
    body: "ที่หน้าแรกมีทั้งขนมพร้อมส่งและโซน «กำลังจะมาเร็วๆ นี้» — กดหยิบใส่ตะกร้าเฉพาะขนมที่พร้อมขายเท่านั้น",
  },
  {
    n: 2,
    title: "ตรวจตะกร้า",
    body: "ตรวจรายการและยอดรวม ลบชิ้นที่ไม่เอาได้ หากอยากเพิ่มจำนวนกลับไปหน้าแรกแล้วกดหยิบอีกครั้ง",
  },
  {
    n: 3,
    title: "กรอกที่อยู่และชำระเงิน",
    body: "กรอกชื่อ เบอร์โทร และที่อยู่จัดส่ง จากนั้นเปิด QR พร้อมเพย์ โอนแล้วแจ้งสลิปทาง Line หรือ Instagram ตามที่ระบุในหน้าชำระเงิน",
  },
  {
    n: 4,
    title: "ดูประวัติออเดอร์",
    body: "ดูรายการได้ที่เมนูออเดอร์ สามารถลบออกจากประวัติได้เมื่อไม่ต้องการเก็บแล้ว หรือสอบถามเมนูใหม่ที่หน้าติดต่อ",
  },
];

export default function About({
  cart = [],
  setIsLoggedIn = () => {},
}) {
  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto max-w-2xl space-y-10">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-zinc-200 bg-white p-8 shadow-lg md:p-10">
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-zinc-100 blur-2xl" aria-hidden />
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-zinc-300 bg-zinc-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600">
            <BookOpen className="h-4 w-4" aria-hidden />
            About
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            เกี่ยวกับเรา
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base">
            <span className="font-bold text-zinc-900">Softlane</span>{" "}
            คือร้านขนมหวานน่ารักที่คัดเมนูให้หอมหวานละมุน
            ทั้งขนมกรอบ นุ่ม และของหวานเย็น — สั่งออนไลน์ได้สะดวก
            แพ็คสวย พร้อมส่งถึงบ้าน
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base">
            เราอยากให้ทุกวันมีความหวานเล็กๆ แบบไม่ต้องคิดเยอะ
            ถ้าสนใจเมนูในโซน «เร็วๆ นี้» เป็นพิเศษ แจ้งทางช่องทางติดต่อได้
            เราจะแจ้งเมื่อของเข้าหรือช่วยจองล่วงหน้า
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
            วิธีใช้งานเว็บ
          </h2>
          <p className="mt-2 text-sm text-zinc-600 md:text-base">
            เส้นไทม์ไลน์สั้นๆ — อ่านทีละขั้นแล้วไปต่อได้เลย
          </p>

          <ol className="relative mt-8 space-y-0 pl-0">
            <div
              className="absolute left-[1.125rem] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-zinc-300 md:left-5"
              aria-hidden
            />
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                <span
                  className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border-2 border-zinc-900 bg-zinc-900 text-sm font-black text-white shadow-md md:h-11 md:w-11 md:text-base"
                  aria-hidden
                >
                  {s.n}
                </span>
                <div className="min-w-0 flex-1 rounded-[1.5rem] border-2 border-zinc-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-zinc-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.75rem] border-2 border-dashed border-zinc-300 bg-zinc-50/80 p-6">
          <p className="text-sm font-bold text-zinc-600">ลิงก์ด่วน</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/home"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-zinc-900"
            >
              กลับหน้าแรก
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-white bg-white px-5 py-2.5 text-sm font-bold text-zinc-800 shadow-sm transition hover:border-zinc-200"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </ShopShell>
  );
}
