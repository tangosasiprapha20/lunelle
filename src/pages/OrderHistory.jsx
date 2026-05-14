import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

export default function OrderHistory({
  orderHistory = [],
  onCancelOrder = () => {},
  onDeleteOrder = () => {},
  cart = [],
  setIsLoggedIn = () => {},
}) {
  const handleCancel = async (orderId) => {
    const ok = window.confirm(`ยืนยันยกเลิกออเดอร์ #${orderId} ?`);
    if (!ok) return;
    await onCancelOrder(orderId);
  };

  const handleDelete = (orderId) => {
    const ok = window.confirm(
      `ลบออเดอร์ #${orderId} ออกจากประวัติบนเครื่องนี้? จะไม่สามารถกู้คืนได้`
    );
    if (!ok) return;
    onDeleteOrder(orderId);
  };

  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto max-w-2xl space-y-8">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#c9b49a] bg-[#fffdf8] px-4 py-2 text-sm font-bold text-[#5c4d3f] shadow-sm transition hover:border-[#a67c52] hover:text-[#3c2a22]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          กลับหน้าแรก
        </Link>

        <div>
          <h1 className="font-craft text-3xl font-bold tracking-wide text-[#3c2a22]">
            ประวัติออเดอร์
          </h1>
          <p className="mt-2 text-sm text-[#5c4d3f]">
            บันทึกไว้ในเครื่องของคุณ — ลบรายการที่ไม่ต้องการเก็บได้
          </p>
        </div>

        {orderHistory.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-[#dccfb8] bg-[#fffdf8]/90 px-6 py-16 text-center">
            <p className="text-4xl">📋</p>
            <p className="mt-4 text-[#5c4d3f]">ยังไม่มีประวัติการสั่งซื้อ</p>
            <Link
              to="/home"
              className="font-craft mt-6 inline-flex rounded-2xl border-2 border-[#5c3d2e] bg-[#5c3d2e] px-6 py-2.5 text-sm font-bold text-[#faf4ea] shadow-[3px_3px_0_0_rgba(201,180,154,0.45)] transition hover:bg-[#fffdf8] hover:text-[#3c2a22]"
            >
              ไปเลือกสินค้า
            </Link>
          </div>
        ) : (
          <ul className="space-y-5">
            {orderHistory.map((order) => (
              <li
                key={order.orderId}
                className="overflow-hidden rounded-2xl border-2 border-[#c9b49a] bg-[#fffdf8] shadow-[4px_5px_0_0_rgba(92,61,46,0.08)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dccfb8] bg-[#efe4d4] px-5 py-4">
                  <p className="text-lg font-black text-[#3c2a22]">
                    #{order.orderId}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border-2 px-3 py-0.5 text-xs font-bold ${
                        order.status === "canceled"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-emerald-200 bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {order.status === "canceled"
                        ? "ยกเลิกแล้ว"
                        : "ชำระเงินแล้ว"}
                    </span>
                    <p className="text-xs font-medium text-[#6b4f3c]">
                      {new Date(order.createdAt).toLocaleString("th-TH")}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 px-5 py-4 text-sm text-[#5c4d3f]">
                  <p>
                    <span className="font-bold text-[#6b4f3c]">ลูกค้า</span>{" "}
                    {order.name || "-"}
                  </p>
                  <p>
                    <span className="font-bold text-[#6b4f3c]">เบอร์</span>{" "}
                    {order.phone || "-"}
                  </p>
                  <p>
                    <span className="font-bold text-[#6b4f3c]">ที่อยู่</span>{" "}
                    {order.address || "-"}
                  </p>
                </div>

                <div className="mx-5 mb-4 rounded-2xl border-2 border-dashed border-[#c9b49a] bg-[#efe4d4] p-3">
                  {order.items.map((item, idx) => (
                    <p
                      key={`${order.orderId}-${item.id}-${idx}`}
                      className="text-sm text-[#5c4d3f]"
                    >
                      {item.name} ×{item.quantity || 1} = ฿
                      {item.price * (item.quantity || 1)}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dccfb8] px-5 py-4">
                  <p className="text-base font-black text-[#3c2a22]">
                    รวม ฿{order.total}
                  </p>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {order.status === "canceled" ? (
                      <p className="text-xs font-medium text-red-600">
                        ยกเลิกเมื่อ{" "}
                        {order.canceledAt
                          ? new Date(order.canceledAt).toLocaleString("th-TH")
                          : "-"}
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCancel(order.orderId)}
                        className="rounded-full border-2 border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100"
                      >
                        ยกเลิกออเดอร์
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(order.orderId)}
                      className="rounded-2xl border-2 border-[#c9b49a] bg-[#efe4d4] px-4 py-2 text-xs font-bold text-[#3c2a22] transition hover:bg-[#dccfb8]"
                    >
                      ลบจากประวัติ
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ShopShell>
  );
}
