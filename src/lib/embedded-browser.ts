const embeddedBrowserPatterns = [
  /FBAN/i,
  /FBAV/i,
  /FBIOS/i,
  /FB_IAB/i,
  /Messenger/i,
  /Instagram/i,
  /Line\//i,
  /TikTok/i,
  /Snapchat/i
];

export function isEmbeddedBrowserUserAgent(userAgent: string) {
  return embeddedBrowserPatterns.some((pattern) => pattern.test(userAgent));
}
