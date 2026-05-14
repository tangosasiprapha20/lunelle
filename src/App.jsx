import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";

import imgสร้อยคอลูกปัดแก้วโทนน้ำตาล from "./assets/สร้อยคอลูกปัดแก้วโทนน้ำตาล.jpg";
import imgสร้อยโบฮีเมียน from "./assets/สร้อยโบฮีเมียน.jpg";
import imgสร้อยข้อมือลูกปัดหินอ่อนครีม from "./assets/สร้อยข้อมือลูกปัดหินอ่อนครีม.jpg";
import imgชุดลูกปัดแก้วคละโทน from "./assets/ชุดลูกปัดแก้วคละโทน.jpg";
import imgลูกปัดเซรามิกลายดินเผา from "./assets/ลูกปัดเซรามิกลายดินเผา.jpg";
import imgลูกปัดไม้เม็ดทองเหลือง from "./assets/ลูกปัดไม้เม็ดทองเหลือง.jpg";
import imgแหวนเรซินโทนอบอุ่น from "./assets/แหวานลูกปัดเรซินโทนอบอุ่น.jpg";
import imgแหวนลูกปัดหลากสี from "./assets/แหวนลุกปัดหลากสี.jpg";
import imgต่างหูลูกปัด from "./assets/ต่างหูลูกปัดน่ารัก.jpg";
import imgกล่องของขวัญเซตสร้อย from "./assets/กล่องของขวัญเซตสร้อย.jpg";
import imgสร้อยลูกปัดฝังทองเหลือง from "./assets/สร้อยลูกปัดฝังทองเหลือง.jpg";
import imgเวิร์กชอปสร้อยข้อมือ from "./assets/เวิร์กชอปสร้อยข้อมือประกอบ.jpg";
import imgลูกปัดเซรามิก from "./assets/ลูกปัดเซรามิก.jpg";

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
        title: `📦 ออเดอร์ #${orderId}`,
        color: 0x78350f,

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
            name: "✦ รายการสินค้า",
            value: items || "-",
          },
          {
            name: "💰 ราคารวม",
            value: `฿${total}`,
            inline: true,
          },
        ],

        footer: {
          text: "Lunelle Order",
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
          { name: "✦ รายการสินค้า", value: itemsText || "-" },
          { name: "💰 ยอดเดิม", value: `฿${order.total || 0}`, inline: true },
          {
            name: "🕒 เวลาที่ยกเลิก",
            value: order.canceledAt
              ? new Date(order.canceledAt).toLocaleString("th-TH")
              : new Date().toLocaleString("th-TH"),
            inline: true,
          },
        ],
        footer: { text: "Lunelle Order" },
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

function readOrderHistory() {
  try {
    const raw =
      localStorage.getItem("lunelle.orderHistory") ??
      localStorage.getItem("softlane.orderHistory") ??
      localStorage.getItem("mellow.orderHistory");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readOrderId() {
  try {
    const raw =
      localStorage.getItem("lunelle.orderId") ??
      localStorage.getItem("softlane.orderId") ??
      localStorage.getItem("mellow.orderId");
    const n = raw ? Number(raw) : 1001;
    return Number.isFinite(n) ? n : 1001;
  } catch {
    return 1001;
  }
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderHistory, setOrderHistory] = useState(readOrderHistory);

  const [orderId, setOrderId] = useState(readOrderId);

  useEffect(() => {
    try {
      localStorage.setItem("lunelle.orderHistory", JSON.stringify(orderHistory));
    } catch {
      // ignore write failures
    }
  }, [orderHistory]);

  useEffect(() => {
    try {
      localStorage.setItem("lunelle.orderId", String(orderId));
    } catch {
      // ignore write failures
    }
  }, [orderId]);

  const products = [
    {
      id: 1,
      name: "สร้อยคอลูกปัดแก้วโทนน้ำตาล",
      price: 320,
      category: "necklace",
      image: imgสร้อยคอลูกปัดแก้วโทนน้ำตาล,
    },
    {
      id: 2,
      name: "สร้อยยาวโบฮีเมียนมือถัก",
      price: 380,
      category: "necklace",
      image: imgสร้อยโบฮีเมียน,
    },
    {
      id: 3,
      name: "สร้อยข้อมือลูกปัดหินอ่อนครีม",
      price: 260,
      category: "necklace",
      image: imgสร้อยข้อมือลูกปัดหินอ่อนครีม,
    },
    {
      id: 4,
      name: "ชุดลูกปัดแก้วคละโทน (DIY)",
      price: 195,
      category: "beads",
      image: imgชุดลูกปัดแก้วคละโทน,
    },
    {
      id: 5,
      name: "ลูกปัดเซรามิกลายดินเผา",
      price: 145,
      category: "beads",
      image: imgลูกปัดเซรามิกลายดินเผา,
    },
    {
      id: 6,
      name: "ลูกปัดไม้และเม็ดทองเหลือง",
      price: 175,
      category: "beads",
      image: imgลูกปัดไม้เม็ดทองเหลือง,
    },
    {
      id: 7,
      name: "แหวนลูกปัดเรซินโทนอบอุ่น",
      price: 220,
      category: "ring",
      image: imgแหวนเรซินโทนอบอุ่น,
    },
    {
      id: 8,
      name: "แหวนปรับไซส์ลูกปัดหลากสี",
      price: 189,
      category: "ring",
      image: imgแหวนลูกปัดหลากสี,
    },
    {
      id: 9,
      name: "ต่างหูลูกปัดคู่ทำมือ",
      price: 240,
      category: "beads",
      image: imgต่างหูลูกปัด,
    },
    {
      id: 10,
      name: "กล่องของขวัญเซ็ตสร้อย + แหวน",
      price: 520,
      category: "necklace",
      image: imgกล่องของขวัญเซตสร้อย,
    },
  ];

  const comingSoon = [
    {
      id: "soon-1",
      name: "คอลเลกชันลูกปัดฝังทองเหลือง",
      teaser: "สร้อยและต่างหูชุดเข้าคู่",
      eta: "ปลายเดือนนี้",
      image: imgสร้อยลูกปัดฝังทองเหลือง,
    },
    {
      id: "soon-2",
      name: "เวิร์กช็อปประกอบสร้อยมือ",
      teaser: "จองที่นั่งออนไลน์",
      eta: "เร็วๆ นี้",
      image: imgเวิร์กชอปสร้อยข้อมือ,
    },
    {
      id: "soon-3",
      name: "ลิมิเต็ดลูกปัดเซรามิกญี่ปุ่น",
      teaser: "จำนวนจำกัดต่อแบบ",
      eta: "สัปดาห์หน้า",
      image: imgลูกปัดเซรามิก,
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
