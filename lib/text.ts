/** Strip Doctronic's promotional CTA text from imported drug copy. */
export function cleanText(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .split(/\n?Ready to take control of your health\?/i)[0]
    .split(/\n?Get started with Doctronic/i)[0]
    .trim();
}
