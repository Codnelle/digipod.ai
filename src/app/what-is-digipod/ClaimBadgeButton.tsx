"use client";

import { useCallback, useState } from "react";
import Script from "next/script";

export default function ClaimBadgeButton() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRazorpay = useCallback(() => {
    if (typeof window === "undefined" || !(window as any).Razorpay) {
      alert("Razorpay SDK not loaded yet. Please wait a moment and try again.");
      return;
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      amount: 500, // $5.00 in cents/paise equivalent
      currency: "USD",
      name: "Digipod",
      description: "Early Access - Founders Deal",
      handler: async function (response: unknown) {
        const res = response as { razorpay_payment_id?: string };
        if (!res.razorpay_payment_id) {
          alert("Payment ID missing!");
          return;
        }
        setIsRedirecting(true);
        const verifyRes = await fetch("/api/verify-razorpay-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_id: res.razorpay_payment_id }),
        });
        const data = await verifyRes.json();
        if ((data as any).code) {
          window.location.href = `/preorder-success?license=${encodeURIComponent((data as any).code)}&payment_id=${encodeURIComponent(res.razorpay_payment_id)}`;
        } else {
          setIsRedirecting(false);
          alert("Payment verified, but license key not generated. Please contact support.");
        }
      },
      theme: {
        color: "#6c4ad6",
      },
    } as any;
    type RazorpayType = new (options: object) => { open: () => void };
    const RazorpayConstructor = (window as any).Razorpay as RazorpayType;
    const rzp = new RazorpayConstructor(options);
    rzp.open();
  }, []);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayLoaded(true)}
      />
      <button
        type="button"
        onClick={handleRazorpay}
        disabled={!razorpayLoaded || isRedirecting}
        className="rounded-full px-7 py-3 font-semibold bg-gradient-to-r from-[#6c4ad6] to-[#8f5fff] text-white shadow hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {razorpayLoaded ? (isRedirecting ? "Redirecting..." : "Claim your badge") : "Loading..."}
      </button>
    </>
  );
} 