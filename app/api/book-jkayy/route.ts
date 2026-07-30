import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Email booking is disabled. Booking enquiries are handled directly through WhatsApp.",
    },
    {
      status: 410,
    },
  );
}