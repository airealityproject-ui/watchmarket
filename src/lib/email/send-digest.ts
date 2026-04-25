import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("Missing RESEND_API_KEY");
    _resend = new Resend(key);
  }
  return _resend;
}

export async function sendDigestEmail(to: string, digest: string, date: string) {
  const { error } = await getResend().emails.send({
    from: "Watchmarket <digest@watchmarket.dev>",
    to,
    subject: `Watchmarket Digest — ${date}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="font-size: 20px; color: #1a1a2e;">Competitive Intelligence Digest</h1>
        <p style="color: #666; font-size: 14px;">${date}</p>
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 16px 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #333;">
${digest}
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 12px;">
          Sent by <a href="https://watchmarket-phi.vercel.app" style="color: #3b82f6;">Watchmarket</a> — AI competitive intelligence
        </p>
      </div>
    `,
  });

  if (error) throw new Error(error.message);
}
