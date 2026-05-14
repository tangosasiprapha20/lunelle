import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

const steps = [
  {
    n: 1,
    title: "เลือกชิ้นที่ชอบ",
    body: "ที่หน้าแรกแบ่งหมวดสร้อย ลูกปัด และแหวน — กดหยิบใส่ตะกร้าได้เฉพาะสินค้าที่พร้อมส่ง",
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
    body: "ดูรายการได้ที่เมนูออเดอร์ สามารถลบออกจากประวัติได้เมื่อไม่ต้องการเก็บแล้ว หรือสอบถามคอลเลกชันใหม่ที่หน้าติดต่อ",
  },
];

export default function About({
  cart = [],
  setIsLoggedIn = () => {},
}) {
  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto max-w-2xl space-y-10">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-[#c9b49a] bg-[#fffdf8] p-8 shadow-[6px_8px_0_0_rgba(92,61,46,0.1)] md:p-10">
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-[#dccfb8]/90 blur-2xl" aria-hidden />
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#a67c52]/55 bg-[#efe4d4] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5c4d3f]">
            <BookOpen className="h-4 w-4" aria-hidden />
            About
          </span>
          <h1 className="font-craft mt-4 text-3xl font-bold tracking-wide text-[#3c2a22] md:text-4xl">
            เกี่ยวกับเรา
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#5c4d3f] md:text-base">
            <span className="font-bold text-[#3c2a22]">Lunelle</span>{" "}
            คือร้านเครื่องประดับแฮนด์เมดที่เน้นสร้อย ลูกปัด และแหวนทำมือ
            คัดวัสดุโทนน้ำตาลอุ่นและเอิร์ธโทน ประกอบทีละชิ้นด้วยความใส่ใจ
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#5c4d3f] md:text-base">
            เราอยากให้ทุกวันมีของสวยเล็กๆ ที่ใส่ได้จริงในโทนที่อบอุ่นและเป็นกันเอง
            หากสนใจคอลเลกชันกำลังจะมา แจ้งทางช่องทางติดต่อได้
            เราจะแจ้งเมื่อของเข้าหรือช่วยจองล่วงหน้า
          </p>
        </div>

        <div>
          <h2 className="font-craft text-xl font-bold text-[#3c2a22] md:text-2xl">
            วิธีใช้งานเว็บ
          </h2>
          <p className="mt-2 text-sm text-[#5c4d3f] md:text-base">
            เส้นไทม์ไลน์สั้นๆ — อ่านทีละขั้นแล้วไปต่อได้เลย
          </p>

          <ol className="relative mt-8 space-y-0 pl-0">
            <div
              className="absolute left-[1.125rem] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-[#c9b49a] md:left-5"
              aria-hidden
            />
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                <span
                  className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border-2 border-[#5c3d2e] bg-[#5c3d2e] text-sm font-black text-[#faf4ea] shadow-md md:h-11 md:w-11 md:text-base"
                  aria-hidden
                >
                  {s.n}
                </span>
                <div className="min-w-0 flex-1 rounded-[1.5rem] border-2 border-[#c9b49a] bg-[#fffdf8] p-5 shadow-sm">
                  <h3 className="font-craft font-bold text-[#3c2a22]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4d3f] md:text-base">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.75rem] border-2 border-dashed border-[#a67c52]/55 bg-[#efe4d4]/90 p-6">
          <p className="text-sm font-bold text-[#5c4d3f]">ลิงก์ด่วน</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/home"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-[#5c3d2e] bg-[#5c3d2e] px-5 py-2.5 text-sm font-bold text-[#faf4ea] shadow-[3px_3px_0_0_rgba(201,180,154,0.45)] transition hover:bg-[#fffdf8] hover:text-[#3c2a22]"
            >
              กลับหน้าแรก
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-2xl border-2 border-[#c9b49a] bg-[#fffdf8] px-5 py-2.5 text-sm font-bold text-[#3c2a22] shadow-sm transition hover:border-[#a67c52]"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </ShopShell>
  );
}
