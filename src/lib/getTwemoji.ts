import twemoji from "twemoji";

export function getTwemojiURL(emoji: string) {
  const code = twemoji.convert.toCodePoint(emoji);
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code}.svg`;
}
