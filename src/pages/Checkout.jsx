import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import PromptPayQR from "promptpay-qr";
import ShopShell from "../components/ShopShell.jsx";

const DEFAULT_PROMPTPAY = "0979589118";

export default function Checkout({
  cart = [],
  clearCart,
  setIsLoggedIn = () => {},
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = useMemo(() => (Array.isArray(cart) ? cart : []), [cart]);

  const total = useMemo(
    () => items.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0),
    [items]
  );

  const promptPayPayload = useMemo(() => {
    if (total <= 0) return "";
    try {
      return PromptPayQR(DEFAULT_PROMPTPAY, {
        amount: total,
      });
    } catch (e) {
      console.log(e);
      return "";
    }
  }, [total]);

  const fieldClass =
    "mb-3 w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50/80 p-3.5 text-base text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white";

  const isCustomerInfoValid =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    address.trim().length > 0;

  const openPayment = () => {
    if (!isCustomerInfoValid) {
      setToast({ type: "error", message: "กรุณากรอกข้อมูลให้ครบ" });
      return;
    }
    if (!items.length) {
      setToast({ type: "error", message: "ตะกร้าว่าง" });
      return;
    }
    setShowQR(true);
  };

  const handleConfirmOrder = async () => {
    if (!isCustomerInfoValid) {
      setToast({ type: "error", message: "กรุณากรอกข้อมูลให้ครบ" });
      return;
    }
    if (!items.length) {
      setToast({ type: "error", message: "ตะกร้าว่าง" });
      return;
    }

    try {
      setIsSubmitting(true);
      await clearCart({
        cart: items,
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });

      setShowQR(false);
      setName("");
      setPhone("");
      setAddress("");

      setToast({
        type: "success",
        message:
          "ชำระเงินสำเร็จแล้ว สามารถกดปุ่มดูประวัติการสั่งซื้อเพื่อตรวจสอบรายการได้",
      });
      window.setTimeout(() => setToast(null), 4500);
    } catch {
      setToast({
        type: "error",
        message: "เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto grid max-w-3xl gap-8 lg:grid-cols-5 lg:items-start">
        <div className="lg:col-span-3">
          <div className="rounded-[2rem] border-2 border-dashed border-zinc-300 bg-white p-6 shadow-md md:p-8">
            <p className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-900">
              Checkout
            </p>
            <h1 className="mt-3 text-2xl font-bold text-zinc-900 md:text-3xl">
              ชำระเงิน
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              กรอกข้อมูลจัดส่ง แล้วเปิด QR พร้อมเพย์
            </p>

            <div className="mt-6 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                ชื่อ
              </label>
              <input
                className={fieldClass}
                placeholder="ชื่อผู้รับ"
                value={name}
                type="text"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-1 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                เบอร์โทร
              </label>
              <input
                className={fieldClass}
                placeholder="เบอร์ติดต่อ"
                value={phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mt-1 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                ที่อยู่
              </label>
              <textarea
                placeholder="ที่อยู่จัดส่ง"
                value={address}
                rows={4}
                className={`${fieldClass} min-h-[120px] resize-y`}
                autoComplete="street-address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {!showQR ? (
              <button
                type="button"
                onClick={openPayment}
                disabled={!isCustomerInfoValid || !items.length}
                className={`mt-6 w-full rounded-full border-2 py-3.5 text-sm font-black uppercase tracking-wide transition ${
                  isCustomerInfoValid && items.length
                    ? "border-zinc-900 bg-zinc-900 text-white hover:bg-white hover:text-zinc-900"
                    : "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400"
                }`}
              >
                ชำระเงิน (PromptPay)
              </button>
            ) : (
              <div className="mt-6 space-y-5">
                <div className="rounded-[1.5rem] border-2 border-zinc-200 bg-zinc-50 p-5 text-center">
                  <h2 className="text-lg font-bold text-zinc-900">
                    สแกนเพื่อโอน
                  </h2>

                  {promptPayPayload ? (
                    <div className="mt-4 flex justify-center rounded-2xl bg-white p-4 ring-2 ring-zinc-100">
                      <QRCodeSVG value={promptPayPayload} size={200} />
                    </div>
                  ) : (
                    <p className="mt-4 text-sm font-medium text-red-600">
                      สร้าง QR ไม่ได้
                    </p>
                  )}

                  <p className="mt-4 text-sm font-bold text-zinc-600">
                    ยอด{" "}
                    <span className="text-lg text-zinc-900">฿{total}</span>
                  </p>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  type="button"
                  disabled={isSubmitting}
                  className={`w-full rounded-full border-2 py-3.5 text-sm font-black transition ${
                    isSubmitting
                      ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400"
                      : "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-500"
                  }`}
                >
                  {isSubmitting ? "กำลังส่งออเดอร์..." : "ยืนยันออเดอร์"}
                </button>

                <Link
                  to="/orders"
                  className="flex w-full items-center justify-center rounded-full border-2 border-zinc-200 bg-white py-3 text-sm font-bold text-zinc-800 transition hover:bg-zinc-50"
                >
                  ดูประวัติการสั่งซื้อ
                </Link>

                <p className="text-center text-xs font-medium text-zinc-500">
                  โอนแล้วแจ้งสลิปใน Line / Instagram
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="sticky top-24 space-y-4 rounded-[1.75rem] border-2 border-zinc-900 bg-zinc-900 p-5 text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              สรุปขนมในตะกร้า
            </p>
            {items.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-400">ตะกร้าว่าง</p>
            ) : (
              <ul className="max-h-64 space-y-2 overflow-y-auto text-sm">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between gap-2 border-b border-white/10 pb-2 last:border-0"
                  >
                    <span className="truncate font-medium text-zinc-200">
                      {item.name}{" "}
                      <span className="text-zinc-500">
                        ×{item.quantity || 1}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-baseline justify-between border-t border-white/15 pt-4">
              <span className="text-sm font-semibold text-zinc-400">รวม</span>
              <span className="text-2xl font-black tabular-nums">฿{total}</span>
            </div>
            <Link
              to="/cart"
              className="block rounded-full border-2 border-white/30 py-2.5 text-center text-xs font-bold text-white transition hover:bg-white/10"
            >
              แก้ไขตะกร้า / เพิ่มขนม
            </Link>
          </div>
        </aside>
      </div>

      {toast && (
        <div className="fixed inset-x-0 bottom-24 z-[60] px-4 md:bottom-8">
          <div
            className={`mx-auto flex w-full max-w-md items-start justify-between gap-3 rounded-2xl border-2 p-4 shadow-xl ${
              toast.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-red-200 bg-red-50 text-red-900"
            }`}
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-medium leading-relaxed">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="shrink-0 rounded-full px-2 py-1 text-sm font-bold opacity-80 hover:opacity-100"
            >
              ปิด
            </button>
          </div>
          {toast.type === "success" && (
            <div className="mx-auto mt-2 w-full max-w-md">
              <Link
                to="/orders"
                onClick={() => setToast(null)}
                className="block w-full rounded-full border-2 border-zinc-900 bg-zinc-900 py-2.5 text-center text-sm font-bold text-white transition hover:bg-white hover:text-zinc-900"
              >
                ดูประวัติการสั่งซื้อ
              </Link>
            </div>
          )}
        </div>
      )}
    </ShopShell>
  );
}
