# Contributing to AUDIOVAULT

Thank you for your interest in contributing to **AUDIOVAULT**! As an acoustic cryptography and sonic steganography platform, reliability, mathematical accuracy, and privacy are paramount.

---

## Code of Conduct

This project and everyone participating in it is governed by the [AUDIOVAULT Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## Development Workflow

### 1. Prerequisites
- Node.js (version 20.x or newer)
- npm (version 10.x or newer)

### 2. Setup
```bash
git clone https://github.com/TejaPriyan/AudioVault.git
cd AudioVault
npm install
```

### 3. Running Locally
Start the Vite development server:
```bash
npm run dev
```
Or open `index.html` directly in any modern web browser.

### 4. Running Verification & Typechecks
Before submitting any pull request, ensure that all types compile cleanly:
```bash
npm run typecheck   # Runs tsc --noEmit
npm run build       # Tests production Vite bundling
```
Also open the web application and click **Run Audio Verification Suite** in the footer to ensure all 8 acoustic and cryptographic tests pass.

---

## Architecture Guidelines

- **Zero-Knowledge**: AUDIOVAULT is 100% client-side. Never introduce network telemetry, analytics, third-party trackers, or cloud storage for payloads or keys.
- **Lossless Audio Preservation**: 16-bit PCM WAV must be preserved without lossy transcoding.
- **Wire Protocol Integrity**: Any alteration to the header layout in `pcmStego.ts` or `index.html` affects backward compatibility. Always increment wire version headers when modifying formats.

---

## Pull Request Guidelines

1. Create a descriptive branch name (e.g. `feat/reed-solomon-fec` or `fix/goertzel-edge-case`).
2. Follow standard JavaScript / TypeScript idioms.
3. Complete the pull request template checklist.
4. Ensure CI tests pass.

