# Security Policy

## Zero-Knowledge Guarantee

AUDIOVAULT is designed as a **100% client-side, zero-knowledge** cryptographic platform.
- Secret messages and files are encrypted in the local browser context using authenticated `AES-256-GCM`.
- Keys are derived using `PBKDF2-HMAC-SHA256` with 100,000 iterations and cryptographically random 16-byte salts.
- No plaintext, ciphertext, audio waveforms, or passwords ever leave your machine.
- No analytics, cookies, tracking scripts, or remote endpoints are included.

---

## Supported Versions

| Version | Supported |
| :--- | :--- |
| 1.0.x | :white_check_mark: |
| < 1.0 | :x: |

---

## Reporting a Vulnerability

If you discover a security vulnerability or cryptographic flaw within AUDIOVAULT, please do **NOT** open a public issue.

Instead, please send a detailed disclosure report with reproduction steps to the security maintainers or submit a private security advisory on GitHub:

1. Navigate to the repository's **Security** tab.
2. Click **Report a vulnerability** to start a private advisory.
3. Provide:
   - A description of the vulnerability.
   - Proof-of-concept steps or mathematical analysis.
   - Attack vector (e.g. sample tampering, side-channel, nonce reuse).

We aim to acknowledge receipt within 48 hours and coordinate a coordinated fix and release.

