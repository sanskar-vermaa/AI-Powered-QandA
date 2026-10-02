import Script from "next/script";

// Optional Chatbase assistant ("DeltaBot"). Loads only when
// NEXT_PUBLIC_CHATBASE_ID is set, so forks don't embed someone else's bot.
// Chatbase's embed script reads the bot id from its own id attribute.
export default function ChatbaseWidget() {
  const botId = process.env.NEXT_PUBLIC_CHATBASE_ID;
  if (!botId || !/^[A-Za-z0-9_-]+$/.test(botId)) return null;

  return <Script id={botId} src="https://www.chatbase.co/embed.min.js" strategy="lazyOnload" domain="www.chatbase.co" />;
}
