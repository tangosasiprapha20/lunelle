import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

export default function Cart({
  cart,
  removeFromCart,
  setIsLoggedIn = () => {},
}) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto max-w-xl space-y-8">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#c9b49a] bg-[#fffdf8] px-4 py-2 text-sm font-bold text-[#5c4d3f] shadow-sm transition hover:border-[#a67c52] hover:text-[#3c2a22]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          เลือกสินค้าต่อ
        </Link>

        <div>
          <h1 className="font-craft text-3xl font-bold tracking-wide text-[#3c2a22]">
            ตะกร้าของคุณ
          </h1>
          <p className="mt-2 text-sm text-[#5c4d3f]">
            ตรวจรายการก่อนไปชำระเงิน
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-[#c9b49a] bg-[#faf4ea]/90 px-6 py-16 text-center shadow-inner">
            <p className="font-craft text-4xl text-[#8b6346]">✿</p>
            <p className="mt-4 text-[#5c4d3f]">ยังไม่มีสินค้าในตะกร้า</p>
            <Link
              to="/home"
              className="font-craft mt-6 inline-flex rounded-2xl border-2 border-[#5c3d2e] bg-[#5c3d2e] px-6 py-2.5 text-sm font-bold text-[#faf4ea] shadow-[3px_3px_0_0_rgba(201,180,154,0.5)] transition hover:bg-[#fffdf8] hover:text-[#3c2a22]"
            >
              ไปเลือกชิ้นที่ชอบ
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex gap-4 rounded-2xl border-2 border-[#c9b49a] bg-[#fffdf8] p-4 shadow-[4px_4px_0_0_rgba(92,61,46,0.08)]"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-2 ring-[#dccfb8]"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-craft font-bold text-[#3c2a22]">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#6b4f3c]">
                      ฿{item.price}{" "}
                      <span className="text-[#a67c52]">
                        × {item.quantity ?? 1}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart?.(item.id)}
                      className="mt-3 inline-flex rounded-2xl border-2 border-[#dccfb8] bg-[#efe4d4] px-4 py-1.5 text-xs font-bold text-[#5c3d2e] transition hover:bg-[#fffdf8]"
                    >
                      เอาออก
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-[2rem] border-2 border-[#5c3d2e] bg-[#4a3228] p-6 text-[#faf4ea] shadow-[6px_6px_0_0_rgba(201,180,154,0.45)]">
              <div className="flex items-baseline justify-between border-b border-[#faf4ea]/15 pb-4">
                <span className="text-sm font-semibold text-[#dccfb8]">
                  ยอดรวม
                </span>
                <span className="text-3xl font-bold tabular-nums">
                  ฿{totalPrice}
                </span>
              </div>
              <Link to="/checkout" className="mt-5 block">
                <span className="font-craft flex w-full items-center justify-center rounded-2xl border-2 border-[#faf4ea] bg-[#faf4ea] py-3.5 text-sm font-bold text-[#3c2a22] transition hover:bg-[#efe4d4]">
                  ไปชำระเงิน
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </ShopShell>
  );
}
