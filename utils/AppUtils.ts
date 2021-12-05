import { loadDefaultJapaneseParser } from 'budoux';

/**
 * parse the specified text with BudouX
 *
 * @param text target text
 * @returns text parsed with BudouX(HTML String)
 */
export function parseBudouX(text: string): string {
  if (!text) return text;
  const parser = loadDefaultJapaneseParser();
  return parser.translateHTMLString(text);
}
