import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";

import imgDonut from "./assets/โดนัทซอฟ.jpg";
import imgMatchaIce from "./assets/ไอศกรีมมัทจะ.jpg";
import imgIceCone from "./assets/ไอศกรีมโคน.jpg";
import imgButterCookie from "./assets/คุกกี้เนยสด.jpg";
import imgIcingCookie from "./assets/คุกกี้ไอซ์ซิ่ง.jpg";
import imgJelly from "./assets/เจลลี่.jpg";
import imgTruffle from "./assets/ช็อกโกแลตทรัฟ.jpg";
import imgMarshmallow from "./assets/มาร์ชเมล.jpg";
import imgPopcorn from "./assets/ป๊อปคอนคาราเมล.jpg";
import imgMiniSnackBox from "./assets/กล่องขนมมะตุด.jpg";
import imgGiftBox from "./assets/กล่องของขวัญ.jpg";
import imgPudding from "./assets/พุดดิ้วมะพร้าว.jpg";

/** ส่งออเดอร์ไป Discord */
async function sendOrderToDiscord({
  cart,
  name,
  phone,
  address,
  slipFile,
  orderId,
}) {
  const url = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

  if (!url) {
    console.log("WEBHOOK =", import.meta.env.VITE_DISCORD_WEBHOOK_URL);
    return;
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    console.log("cart ว่าง");
    return;
  }

  const items = cart
    .map((p) => {
      const qty = p.quantity || 1;
      return `• ${p.name} x${qty} = ฿${p.price * qty}`;
    })
    .join("\n");

  const total = cart.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );

  const payload = {
    embeds: [
      {
        title: `🍬 ออเดอร์ #${orderId}`,
        color: 0x111111,

        fields: [
          {
            name: "👤 ลูกค้า",
            value: name || "-",
            inline: true,
          },
          {
            name: "📞 เบอร์",
            value: phone || "-",
            inline: true,
          },
          {
            name: "📍 ที่อยู่",
            value: address || "-",
          },
          {
            name: "🍭 รายการขนม",
            value: items || "-",
          },
          {
            name: "💰 ราคารวม",
            value: `฿${total}`,
            inline: true,
          },
        ],

        footer: {
          text: "Softlane Order System",
        },

        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const hasSlip = slipFile instanceof File;

    const res = hasSlip
      ? await fetch(url, {
          method: "POST",
          body: (() => {
            const fd = new FormData();

            fd.append(
              "payload_json",
              JSON.stringify(payload)
            );

            fd.append(
              "files[0]",
              slipFile,
              slipFile.name || "slip.jpg"
            );

            return fd;
          })(),
        })
      : await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

    console.log("Discord status:", res.status);
  } catch (err) {
    console.log("Discord error:", err);
  }
}

/** ส่งแจ้งเตือนยกเลิกออเดอร์ไป Discord */
async function sendOrderCancellationToDiscord(order) {
  const url = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
  if (!url || !order) return;

  const itemsText = (order.items || [])
    .map((item) => {
      const qty = item.quantity || 1;
      return `• ${item.name} x${qty} = ฿${item.price * qty}`;
    })
    .join("\n");

  const payload = {
    embeds: [
      {
        title: `❌ ยกเลิกออเดอร์ #${order.orderId}`,
        color: 0xdc2626,
        fields: [
          { name: "👤 ลูกค้า", value: order.name || "-", inline: true },
          { name: "📞 เบอร์", value: order.phone || "-", inline: true },
          { name: "📍 ที่อยู่", value: order.address || "-" },
          { name: "📦 รายการขนม", value: itemsText || "-" },
          { name: "💰 ยอดเดิม", value: `฿${order.total || 0}`, inline: true },
          {
            name: "🕒 เวลาที่ยกเลิก",
            value: order.canceledAt
              ? new Date(order.canceledAt).toLocaleString("th-TH")
              : new Date().toLocaleString("th-TH"),
            inline: true,
          },
        ],
        footer: { text: "Softlane Order System" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("Discord cancel status:", res.status);
  } catch (err) {
    console.log("Discord cancel error:", err);
  }
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const raw =
        localStorage.getItem("softlane.orderHistory") ??
        localStorage.getItem("mellow.orderHistory");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // ✅ เลขออเดอร์
  const [orderId, setOrderId] = useState(() => {
    try {
      const raw =
        localStorage.getItem("softlane.orderId") ??
        localStorage.getItem("mellow.orderId");
      const n = raw ? Number(raw) : 1001;
      return Number.isFinite(n) ? n : 1001;
    } catch {
      return 1001;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("softlane.orderHistory", JSON.stringify(orderHistory));
    } catch {
      // ignore write failures
    }
  }, [orderHistory]);

  useEffect(() => {
    try {
      localStorage.setItem("softlane.orderId", String(orderId));
    } catch {
      // ignore write failures
    }
  }, [orderId]);

  const products = [
    { id: 1, name: "โดนัทซอฟ", price: 89, image: imgDonut },
    { id: 2, name: "ไอศกรีมมัทฉะ", price: 95, image: imgMatchaIce },
    { id: 3, name: "ไอศกรีมโคน", price: 75, image: imgIceCone },
    { id: 4, name: "คุกกี้เนยสด", price: 55, image: imgButterCookie },
    { id: 5, name: "คุกกี้ไอซ์ซิ่ง", price: 62, image: imgIcingCookie },
    { id: 6, name: "เจลลี่ผลไม้", price: 45, image: imgJelly },
    { id: 7, name: "ช็อกโกแลตทรัฟ", price: 85, image: imgTruffle },
    { id: 8, name: "มาร์ชแมลโลว์", price: 59, image: imgMarshmallow },
    { id: 9, name: "ป๊อปคอร์นคาราเมล", price: 72, image: imgPopcorn },
    { id: 10, name: "กล่องขนมมินิ", price: 129, image: imgMiniSnackBox },
  ];

  /** ขนมที่กำลังจะเข้าเร็วๆ นี้ (แสดงหน้าแรกเท่านั้น ยังไม่ใส่ตะกร้า) */
  const comingSoon = [
    {
      id: "soon-1",
      name: "ชุดขนมปิกนิกหวานละมุน",
      teaser: "คุกกี้ มาการอง และนมร้อน",
      eta: "ปลายเดือนนี้",
      image:
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "soon-2",
      name: "กล่องของขวัญวันเกิด",
      teaser: "ลูกอม + การ์ดน่ารัก",
      eta: "เร็วๆ นี้",
      image: imgGiftBox,
    },
    {
      id: "soon-3",
      name: "พุดดิ้งมะพร้าวอ่อน",
      teaser: "หวานน้อย เนียนนุ่ม",
      eta: "สัปดาห์หน้า",
      image: imgPudding,
    },
  ];

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (!existing) {
        return [...prev, { ...product, quantity: 1 }];
      }

      return prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              quantity: (p.quantity || 1) + 1,
            }
          : p
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  // ✅ ส่งออเดอร์ + เพิ่มเลขออเดอร์
  const clearCart = async (orderData) => {
    const payload =
      orderData && Array.isArray(orderData.cart)
        ? {
            cart: [...orderData.cart],
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            slipFile: orderData.slipFile ?? null,
            orderId,
          }
        : {
            cart: [...cart],
            name: "-",
            phone: "-",
            address: "-",
            slipFile: null,
            orderId,
          };

    await sendOrderToDiscord(payload);

    const purchasedItems = [...payload.cart];
    const total = purchasedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    setOrderHistory((prev) => [
      {
        orderId: payload.orderId,
        name: payload.name,
        phone: payload.phone,
        address: payload.address,
        items: purchasedItems,
        total,
        createdAt: new Date().toISOString(),
        status: "paid",
        canceledAt: null,
      },
      ...prev,
    ]);

    // ✅ เพิ่มเลขออเดอร์อัตโนมัติ
    setOrderId((prev) => prev + 1);

    setCart([]);
  };

  const cancelOrder = async (targetOrderId) => {
    let canceledOrder = null;
    setOrderHistory((prev) =>
      prev.map((order) =>
        order.orderId === targetOrderId && order.status !== "canceled"
          ? (() => {
              canceledOrder = {
                ...order,
                status: "canceled",
                canceledAt: new Date().toISOString(),
              };
              return canceledOrder;
            })()
          : order
      )
    );
    if (canceledOrder) {
      await sendOrderCancellationToDiscord(canceledOrder);
    }
  };

  const deleteOrderFromHistory = (targetOrderId) => {
    setOrderHistory((prev) =>
      prev.filter((order) => order.orderId !== targetOrderId)
    );
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home
                products={products}
                comingSoon={comingSoon}
                addToCart={addToCart}
                cart={cart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/orders"
          element={
            isLoggedIn ? (
              <OrderHistory
                orderHistory={orderHistory}
                onCancelOrder={cancelOrder}
                onDeleteOrder={deleteOrderFromHistory}
                cart={cart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/cart"
          element={
            isLoggedIn ? (
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/checkout"
          element={
            isLoggedIn ? (
              <Checkout
                cart={cart}
                clearCart={clearCart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/contact"
          element={
            isLoggedIn ? (
              <Contact
                cart={cart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/about"
          element={
            isLoggedIn ? (
              <About
                cart={cart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}