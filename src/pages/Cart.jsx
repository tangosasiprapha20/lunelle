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
          className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          เลือกสินค้าต่อ
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            ตะกร้าขนม
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            ตรวจรายการก่อนไปชำระเงิน
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-zinc-300 bg-white/80 px-6 py-16 text-center shadow-inner">
            <p className="text-4xl">🧺</p>
            <p className="mt-4 text-zinc-600">ยังไม่มีขนมในตะกร้า</p>
            <Link
              to="/home"
              className="mt-6 inline-flex rounded-full border-2 border-zinc-900 bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-zinc-900"
            >
              ไปหยิบของกัน
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex gap-4 rounded-[1.75rem] border-2 border-zinc-200 bg-white p-4 shadow-md"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-2 ring-zinc-100"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-zinc-900">{item.name}</h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      ฿{item.price}{" "}
                      <span className="text-zinc-400">
                        × {item.quantity ?? 1}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart?.(item.id)}
                      className="mt-3 inline-flex rounded-full border-2 border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-bold text-zinc-700 transition hover:bg-white"
                    >
                      เอาออก
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-[2rem] border-2 border-zinc-900 bg-zinc-900 p-6 text-white shadow-xl">
              <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
                <span className="text-sm font-semibold text-zinc-400">
                  ยอดรวม
                </span>
                <span className="text-3xl font-black tabular-nums">
                  ฿{totalPrice}
                </span>
              </div>
              <Link to="/checkout" className="mt-5 block">
                <span className="flex w-full items-center justify-center rounded-full border-2 border-white bg-white py-3.5 text-sm font-black text-zinc-900 transition hover:bg-amber-50">
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
