import { NextResponse } from "next/server";
import { Resend } from "resend";

console.log("API KEY:", process.env.RESEND_API_KEY);
export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const body = await request.json();
  const { firstName, lastName, email, phoneNumber, message } = body;

  try {
    const data = await resend.emails.send({
      from: "GSMACTX <no-reply@gsmactx.com>",
      to: ["contactus@gsmactx.com"],
      subject: `New message from ${firstName} ${lastName}`,
      text: `You have received a new message from ${firstName} (${lastName}, ${email}, ${phoneNumber}): ${message}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
