"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ThemeToggle from "@/components/ThemeToggle";
import WaitlistForm from "@/components/WaitlistForm";

const Countdown = dynamic(() => import("@/components/Countdown"), { ssr: false });

const copy = {
  en: {
    badge: "Launching May 25, 2026",
    headline: ["Get Certified.", "Get Hired."],
    sub: "The cert prep platform built to get you across the finish line. AI-powered mock exams, structured learning paths, and a pass guarantee — or we extend your access, free.",
    features: [
      "AI-powered mock exams — timed, scored, and explained",
      "Pass guarantee — fail once, get 3 months free extension",
      "Beginner to intermediate — IPAS, AWS, Google certs & more",
    ],
    waitlist: "127 people already on the waitlist",
    countdown: ["Days", "Hours", "Mins", "Secs"],
    form: {
      placeholder: "Enter your email address",
      cta: "Notify Me →",
      note: "Early-bird: 20% off for everyone on the waitlist at launch.",
      success: "🎉 You're on the list! We'll notify you at launch.",
      error: "Something went wrong. Please try again.",
      duplicate: "You're already on the waitlist!",
    },
    social: "Follow for updates",
    footer: "© 2026 LevelCert.com — All rights reserved.",
  },
  zh: {
    badge: "即將於 2026 年 5 月 25 日上線",
    headline: ["考取證照。", "贏得機會。"],
    sub: "專為幫你通過考試而生的證照備考平台。AI 模擬考試、結構化學習路徑，以及通過保證 — 考不過沒關係，免費延長使用期，再衝一次！",
    features: [
      "AI 模擬考試 — 計時作答、評分與解析",
      "通過保證 — 第一次未過，免費延長 3 個月",
      "初級至中級 — IPAS、AWS、Google 等證照",
    ],
    waitlist: "已有 127 人加入候補名單",
    countdown: ["天", "時", "分", "秒"],
    form: {
      placeholder: "輸入您的電子郵件",
      cta: "立即訂閱 →",
      note: "早鳥優惠：上線享 8 折，限候補名單成員。",
      success: "🎉 已加入名單！上線時我們會通知您。",
      error: "發生錯誤，請稍後再試。",
      duplicate: "您已在候補名單中！",
    },
    social: "追蹤我們，掌握最新消息",
    footer: "© 2026 LevelCert.com — 版權所有",
  },
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const t = copy[lang];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-4 sticky top-0 z-50"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Level<span style={{ color: "var(--accent)" }}>Cert</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden text-xs font-semibold" style={{ border: "1px solid var(--border)" }}>
            {(["en", "zh"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1.5 transition-colors cursor-pointer"
                style={{
                  background: lang === l ? "var(--accent)" : "var(--bg)",
                  color: lang === l ? "#fff" : "var(--text-secondary)",
                }}
              >
                {l === "en" ? "EN" : "繁中"}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-3xl mx-auto w-full">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-8"
          style={{ background: "var(--badge-bg)", color: "var(--accent)", border: "1px solid var(--border)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
          {t.badge}
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
        >
          {t.headline[0]}
          <br />
          <span style={{ color: "var(--accent)" }}>{t.headline[1]}</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg max-w-xl mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {t.sub}
        </p>

        {/* Countdown */}
        <Countdown labels={t.countdown} />

        {/* Features */}
        <div className="flex flex-col gap-3 mb-8 w-full max-w-sm text-left">
          {t.features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[0.6rem] font-bold text-white mt-0.5"
                style={{ background: "var(--success)" }}
              >
                ✓
              </span>
              {f}
            </div>
          ))}
        </div>

        {/* Waitlist counter */}
        <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: "var(--text-secondary)" }}>
          <div className="flex">
            {["D", "S", "M"].map((letter, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[0.6rem] font-bold text-white border-2"
                style={{
                  background: ["#51a2ff", "#34D399", "#F59E0B"][i],
                  borderColor: "var(--bg)",
                  marginLeft: i === 0 ? 0 : "-6px",
                }}
              >
                {letter}
              </div>
            ))}
          </div>
          {t.waitlist}
        </div>

        {/* Email form */}
        <WaitlistForm lang={lang} copy={t.form} />
      </main>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* Social */}
      <section className="flex flex-col items-center py-10 gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
          {t.social}
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          {["Facebook", "X (Twitter)", "Instagram"].map((label) => (
            <a
              key={label}
              href="#"
              className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-5 text-xs"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
      >
        {t.footer}
      </footer>
    </div>
  );
}
