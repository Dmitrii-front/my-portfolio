# Portfolio desktop source

`portfolio-desktop.png` is a real local `/en` viewport capture of Portfolio 2026 at commit `520c9618e91147ce3954ede51c13b86d77042ffa`, captured 2026-10-06 with installed Chrome, 1920×1106 CSS px, DPR 1 and the supported reduced-motion preference. Public Home UI only; no browser chrome, private data, editor, debug overlay or fabricated device layout. No recursive Portfolio device appears in the captured viewport.

Owner authorized this current-site source in Phase 4.2; it is not evidence from the historical screenshot archive. Project-owned UI/capture. Original PNG remains unchanged. SHA-256: `5ae2a4764b0f1750f7ebe7412fc2a98fe9118ed151153f38441aaa6e0086e764`.

`node scripts/portfolio-capture.mjs NEW_PATH.png` captures a new candidate from a running local production server without overwriting an existing source. Review/re-audit and explicitly update the source hash before replacing assets. `npm run assets:prepare -- --portfolio` reproduces the three WebP derivatives offline without needing the external Pnlwise/Healthy archive.
