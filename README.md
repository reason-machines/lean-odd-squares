# Odd numbers, perfect squares

`OddSquares.lean` proves `oddSum n = n ^ 2` for every natural number, including zero. The recursive sum adds `2*n + 1` at the successor step, so its terms are precisely the first n odd numbers.

The induction starts with an empty square. An n-by-n square gains an L-shaped border of n cells on each of two sides and one corner: n² + 2n + 1 = (n+1)². This is a classical identity; the CSV examples are illustrations, not the proof.

## Check

Install Lean using the official Lean installation instructions (https://lean-lang.org/install/), then run:

```sh
lean --version
lean OddSquares.lean
python3 verify_samples.py
```

The toolchain is pinned to Lean 4.19.0. Successful compilation prints `oddSum_eq_square`'s axiom dependencies: `[propext]`. There are no `sorry`, `admit`, or custom axioms.

## View

```sh
python3 -m http.server 4173 --bind 0.0.0.0 --directory site
```

Open http://localhost:4173. Play/pause, replay, or select zero or any CSV sample. Reduced-motion users start with a static square; playback remains opt-in. The page uses native SVG/CSS/JavaScript; Inter loads from Google Fonts with a system-font fallback.

## Data provenance

`site/odd-square-samples.csv` was read directly from the granted MacBook Pro file `reason-launch-demo-20260914/odd-square-samples.csv` into the cloud checkout, unchanged including the final newline. The source was not modified. The 96-byte transfer matched the expected SHA-256 checksum. The page loads and validates that actual CSV.

## Verification in this session

Lean 4.19.0 compiled the theorem successfully. All five samples and zero were checked in the cloud browser. Replay reset to zero, animation advanced to eight, and Pause stopped it. The complete layout was visually inspected at 986 × 596. Reduced-motion handling is implemented but was not separately browser-tested.
