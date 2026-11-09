/**
 * AUDIOVAULT 16-Bit PCM LSB Steganography Engine
 */

export function embedPcmLsb(sourceSamples: Int16Array, packetBytes: Uint8Array): Int16Array {
  const totalBits = packetBytes.length * 8;
  if (totalBits > sourceSamples.length) {
    throw new Error('Payload exceeds audio sample capacity.');
  }
  const out = new Int16Array(sourceSamples);
  for (let b = 0; b < totalBits; b++) {
    const byteVal = packetBytes[b >>> 3];
    const bit = (byteVal >>> (7 - (b & 7))) & 1;
    out[b] = (out[b] & ~1) | bit;
  }
  return out;
}

export function extractPcmLsbBytes(samples: Int16Array, byteCount: number): Uint8Array {
  const totalBits = byteCount * 8;
  if (totalBits > samples.length) {
    throw new Error('Declared payload length exceeds audio sample count.');
  }
  const out = new Uint8Array(byteCount);
  for (let b = 0; b < totalBits; b++) {
    const bit = samples[b] & 1;
    out[b >>> 3] |= (bit << (7 - (b & 7)));
  }
  return out;
}
