import { isValidEmail } from "@/lib/email";

// Waitlist endpoint. No email service is connected yet, so a valid address is
// checked and then dropped: the response says "demo" and nothing is stored or logged.
export async function POST(request: Request) {
  // An email address is tiny; refuse anything large before parsing it.
  if (Number(request.headers.get("content-length") ?? 0) > 2048) {
    return Response.json({ status: "error", message: "Request too large." }, { status: 413 });
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ status: "error", message: "Send a JSON body with an email field." }, { status: 400 });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return Response.json({ status: "error", message: "Enter a valid email address, like name@example.com." }, { status: 400 });
  }

  // TODO: when an email service is chosen, read its key from process.env (see .env.example) and save the address here.
  return Response.json({ status: "demo" });
}
