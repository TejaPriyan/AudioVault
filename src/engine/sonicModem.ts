/**
 * AUDIOVAULT Sonic FSK Data-Over-Sound Synthesizer & Goertzel Demodulator
 */

export const FSK_SAMPLE_RATE = 44100;
export const FSK_SAMPLES_PER_BIT = 441; // 10ms per bit (100 bps)
export const FSK_AUDIBLE_F0 = 1800;
export const FSK_AUDIBLE_F1 = 3000;
export const FSK_ULTRA_F0 = 14500;
export const FSK_ULTRA_F1 = 16500;

export function synthesizeFskSamples(packetBytes: Uint8Array, stealthUltrasonic = false): Int16Array {
  const f0 = stealthUltrasonic ? FSK_ULTRA_F0 : FSK_AUDIBLE_F0;
  const f1 = stealthUltrasonic ? FSK_ULTRA_F1 : FSK_AUDIBLE_F1;
  const full = new Uint8Array(2 + packetBytes.length);
  full[0] = stealthUltrasonic ? 0xA5 : 0x5A;
  full[1] = 0xC3;
  full.set(packetBytes, 2);

  const totalBits = full.length * 8;
  const samples = new Int16Array(totalBits * FSK_SAMPLES_PER_BIT);

  for (let b = 0; b < totalBits; b++) {
    const byteVal = full[b >>> 3];
    const bit = (byteVal >>> (7 - (b & 7))) & 1;
    const freq = bit ? f1 : f0;
    const baseIdx = b * FSK_SAMPLES_PER_BIT;
    for (let n = 0; n < FSK_SAMPLES_PER_BIT; n++) {
      let env = 1.0;
      if (n < 24) env = 0.5 * (1 - Math.cos((Math.PI * n) / 24));
      else if (n > FSK_SAMPLES_PER_BIT - 24) env = 0.5 * (1 - Math.cos((Math.PI * (FSK_SAMPLES_PER_BIT - n)) / 24));
      samples[baseIdx + n] = Math.round(Math.sin((2 * Math.PI * freq * n) / FSK_SAMPLE_RATE) * env * 24000);
    }
  }
  return samples;
}

export function goertzelPower(samples: Int16Array, startIdx: number, length: number, targetFreq: number, sampleRate = 44100): number {
  const k = Math.round((length * targetFreq) / sampleRate);
  const w = (2 * Math.PI * k) / length;
  const coeff = 2 * Math.cos(w);
  let q0 = 0, q1 = 0, q2 = 0;
  for (let i = 0; i < length; i++) {
    q0 = coeff * q1 - q2 + samples[startIdx + i];
    q2 = q1;
    q1 = q0;
  }
  return q1 * q1 + q2 * q2 - q1 * q2 * coeff;
}
