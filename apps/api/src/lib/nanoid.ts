const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Removed ambiguous chars: I, L, O, U

export function nanoid(size: number = 8): string {
  let id = "";
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  for (let i = 0; i < size; i++) {
    id += ALPHABET[bytes[i]! % ALPHABET.length];
  }
  return id;
}
