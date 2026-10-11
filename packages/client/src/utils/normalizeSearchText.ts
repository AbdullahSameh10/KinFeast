/**
 * Normalizes search text for English and Arabic.
 * Used for search matching only; it never changes displayed text.
 */
export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase()
    // Normalize common Arabic letter variations.
    .replace(/[أإآٱ]/g, "ا")
    .replace(/[ىي]/g, "ي")
    .replace(/ة/g, "ه")
    // Remove Arabic diacritics and tatweel.
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    // Normalize Arabic and English numerals.
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
    )
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
    )
    // Treat punctuation and repeated whitespace consistently.
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
