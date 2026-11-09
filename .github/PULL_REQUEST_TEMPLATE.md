## Description
Summary of the changes made and the problem being solved.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing wire protocol or audio extraction to fail)
- [ ] Documentation update
- [ ] Cryptographic or DSP optimization

## Verification & Testing
- [ ] Executed `npm run typecheck` (`tsc --noEmit`) with 0 errors.
- [ ] Executed `npm run build` (`vite build`) successfully.
- [ ] Ran the in-browser 8-test verification suite (All 8 tests PASS).
- [ ] Tested roundtrip encoding and decoding with both text and binary file payloads.
- [ ] Verified over-the-air or synthesized FSK demodulation.

## Security & Privacy Checklist
- [ ] 100% zero-knowledge: no telemetry, external network calls, or secret leaks.
- [ ] PBKDF2 iterations preserved at $\ge 100,000$.
- [ ] Cryptographically secure random salts and nonces (`crypto.getRandomValues`).

