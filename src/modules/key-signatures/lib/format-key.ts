/** Convierte "a", "f#", "bb" → "Am", "F#m", "Bbm". */
export function formatMinorKey(minorKey: string): string {
  if (!minorKey) {
    return "";
  }

  return `${minorKey[0]!.toUpperCase()}${minorKey.slice(1)}m`;
}
