import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const WAITLIST_FILE = join(process.cwd(), "waitlist.json");

async function getEmails(): Promise<string[]> {
  try {
    const data = await readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const emails = await getEmails();

  if (emails.includes(email)) {
    return Response.json({ error: "Already on the waitlist" }, { status: 409 });
  }

  emails.push(email);
  await writeFile(WAITLIST_FILE, JSON.stringify(emails, null, 2));

  return Response.json({ ok: true });
}

export async function GET() {
  const emails = await getEmails();
  return Response.json({ count: emails.length });
}
