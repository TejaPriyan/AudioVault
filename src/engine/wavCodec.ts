/**
 * AUDIOVAULT RIFF/WAVE 16-Bit PCM Lossless Encoder & Parser
 */

export function encodeWav16Bit(samplesInt16: Int16Array, sampleRate = 44100): Uint8Array {
  const numSamples = samplesInt16.length;
  const dataByteLen = numSamples * 2;
  const buf = new ArrayBuffer(44 + dataByteLen);
  const view = new DataView(buf);

  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataByteLen, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, dataByteLen, true);

  for (let i = 0; i < numSamples; i++) {
    view.setInt16(44 + i * 2, samplesInt16[i], true);
  }
  return new Uint8Array(buf);
}

export function parseWav16Bit(wavBytes: Uint8Array): {
  samples: Int16Array;
  sampleRate: number;
  channels: number;
} {
  const view = new DataView(wavBytes.buffer, wavBytes.byteOffset, wavBytes.byteLength);
  if (wavBytes.byteLength < 44) throw new Error('Invalid WAV file: too short.');
  const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
  const wave = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11));
  if (riff !== 'RIFF' || wave !== 'WAVE') throw new Error('Expected RIFF/WAVE container.');

  let offset = 12;
  let channels = 1;
  let sampleRate = 44100;
  let bitsPerSample = 16;
  let audioFormat = 1;

  while (offset + 8 <= wavBytes.byteLength) {
    const chunkId = String.fromCharCode(
      view.getUint8(offset), view.getUint8(offset + 1),
      view.getUint8(offset + 2), view.getUint8(offset + 3)
    );
    const chunkSize = view.getUint32(offset + 4, true);
    if (chunkId === 'fmt ') {
      audioFormat = view.getUint16(offset + 8, true);
      channels = view.getUint16(offset + 10, true);
      sampleRate = view.getUint32(offset + 12, true);
      bitsPerSample = view.getUint16(offset + 22, true);
    } else if (chunkId === 'data') {
      const dataStart = offset + 8;
      const dataLen = Math.min(chunkSize, wavBytes.byteLength - dataStart);
      if (audioFormat === 1 && bitsPerSample === 16) {
        const count = Math.floor(dataLen / (2 * channels));
        const samples = new Int16Array(count);
        for (let i = 0; i < count; i++) {
          samples[i] = view.getInt16(dataStart + i * 2 * channels, true);
        }
        return { samples, sampleRate, channels };
      }
    }
    offset += 8 + chunkSize + (chunkSize & 1);
  }
  throw new Error('Could not locate 16-bit PCM data chunk in WAV.');
}
