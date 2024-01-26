/**
 * Computes the HMAC signature of the provided timestamp and request body,
 * then compares it with the given signature for verification.
 *
 * @param ts - The timestamp.
 * @param requestBody - The request body.
 * @param h1 - The provided signature to be verified.
 * @param secretKey - The secret key for HMAC computation.
 * @returns A boolean indicating whether the signature is valid.
 */
async function hashSignature(
  ts: string,
  requestBody: string,
  h1: string,
  secretKey: string,
): Promise<boolean> {
  const encoder = new TextEncoder();

  const payload = ts + ":" + requestBody;

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secretKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );

  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  return signatureHex === h1;
}

/**
 * Extracts timestamp (ts) and signature (h1) values from the provided input string.
 *
 * @param input - The input string containing timestamp and signature components.
 * @returns An object containing the extracted timestamp and signature.
 */
function extractValues(input: string): { ts: string; h1: string } {
  const matchTs = input.match(/ts=(\d+)/);
  const matchH1 = input.match(/h1=([a-f0-9]+)/);

  return {
    ts: matchTs ? matchTs[1] : "",
    h1: matchH1 ? matchH1[1] : "",
  };
}

/**
 * Verifies the authenticity of a signature by computing and comparing HMAC signatures.
 *
 * @param signature - The signature to be verified.
 * @param body - The request body.
 * @param secret - The secret key for HMAC computation.
 * @returns A boolean indicating whether the signature is valid.
 */
export async function verifySignature(
  signature: string,
  body: string,
  secret: string,
) {
  const { ts, h1 } = extractValues(signature);
  return await hashSignature(ts, body, h1, secret);
}

