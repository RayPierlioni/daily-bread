"use client";

import { useMemo } from "react";
import { gracieMessages, type GracieMessage } from "@/components/gracie/gracieMessages";

function routeMatches(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function pickMessage(messages: GracieMessage[], lastMessageId?: string | null) {
  const available = messages.length > 1 ? messages.filter((message) => message.id !== lastMessageId) : messages;
  return available[0] ?? messages[0] ?? gracieMessages[0];
}

export function useGracieMessage(pathname: string, lastMessageId?: string | null) {
  return useMemo(() => {
    const routeMessages = gracieMessages.filter((message) => message.routes?.some((route) => routeMatches(pathname, route)));
    return pickMessage(routeMessages.length ? routeMessages : gracieMessages.filter((message) => message.category === "general"), lastMessageId);
  }, [lastMessageId, pathname]);
}
