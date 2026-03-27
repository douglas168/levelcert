import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

export async function POST(req: NextRequest) {
  const { email, lang } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Insert into Supabase
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("waitlist")
    .insert({ email: email.toLowerCase().trim(), lang: lang ?? "en" });

  if (error) {
    if (error.code === "23505") {
      // Unique violation — already on waitlist
      return NextResponse.json({ code: "duplicate" }, { status: 409 });
    }
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Send confirmation email via Resend
  const resend = getResend();
  const isZh = lang === "zh";
  await resend.emails.send({
    from: "GoCertNow <hello@gocertnow.com>",
    to: email,
    subject: isZh ? "您已成功加入 GoCertNow 候補名單！" : "You're on the GoCertNow waitlist!",
    html: isZh
      ? `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
          <h2 style="color:#51a2ff;margin-bottom:8px;">您已成功加入！🎉</h2>
          <p>感謝您加入 <strong>GoCertNow</strong> 候補名單。</p>
          <p>我們將於 <strong>2026 年 5 月 25 日</strong> 正式上線，屆時會第一時間通知您。</p>
          <p style="margin-top:24px;padding:16px;background:#0D1A2E;border-radius:12px;color:#51a2ff;font-weight:600;">
            🎁 早鳥專屬優惠：上線時享 <strong>8 折</strong>，僅限候補名單成員。
          </p>
          <p style="color:#7B9CC4;font-size:13px;margin-top:24px;">— GoCertNow 團隊</p>
        </div>
      `
      : `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
          <h2 style="color:#51a2ff;margin-bottom:8px;">You're on the list! 🎉</h2>
          <p>Thanks for joining the <strong>GoCertNow</strong> waitlist.</p>
          <p>We're launching on <strong>May 25, 2026</strong> and you'll be the first to know.</p>
          <p style="margin-top:24px;padding:16px;background:#0D1A2E;border-radius:12px;color:#51a2ff;font-weight:600;">
            🎁 Early-bird exclusive: <strong>20% off</strong> at launch for everyone on the waitlist.
          </p>
          <p style="color:#7B9CC4;font-size:13px;margin-top:24px;">— The GoCertNow Team</p>
        </div>
      `,
  });

  return NextResponse.json({ success: true });
}
