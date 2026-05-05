import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { recordAnalyticsEvent, sanitizeClientAnalyticsEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = JSON.parse(await request.text());
  } catch {
    return NextResponse.json({ error: "Invalid analytics payload" }, { status: 400 });
  }

  const safeEvent = sanitizeClientAnalyticsEvent(payload);
  if (!safeEvent) {
    return NextResponse.json({ error: "Unsupported analytics event" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  await recordAnalyticsEvent({
    eventName: safeEvent.eventName,
    userId: session?.user?.id,
    route: safeEvent.route,
    properties: {
      ...safeEvent.properties,
      signedIn: Boolean(session?.user?.id)
    }
  });

  return new NextResponse(null, { status: 204 });
}
