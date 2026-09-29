import copy from './copy.json';

export type Lang = 'en' | 'fr';

function getEntry(key: string): { en: string; fr: string } | undefined {
  const value = key.split('.').reduce<unknown>((node, part) => {
    if (node && typeof node === 'object' && part in node) {
      return (node as Record<string, unknown>)[part];
    }
    return undefined;
  }, copy);

  if (
    value &&
    typeof value === 'object' &&
    'en' in value &&
    typeof (value as { en: unknown }).en === 'string'
  ) {
    return value as { en: string; fr: string };
  }

  return undefined;
}

export function t(key: string, lang: Lang = 'en'): string {
  const entry = getEntry(key);
  if (!entry) return key;
  return entry[lang] || entry.en;
}

export { copy };
