# Odd numbers, perfect squares

A classical identity, checked for every natural number in Lean 4.19.0:
`oddSum n = n ^ 2`. The recursive sum starts at zero and adds `2*n + 1`
at each successor. Induction adds an L-shaped border to the previous square.

## Check

Install [Lean's elan toolchain manager](https://github.com/leanprover/elan#installation)
and Python 3, then clone this repository. Elan selects the pinned Lean 4.19.0
release automatically from `lean-toolchain`:

```sh
git clone https://github.com/reason-machines/lean-odd-squares.git
cd lean-odd-squares
lean --version
lean OddSquares.lean
python3 verify.py
```

No Mathlib or third-party Lean dependencies are required. The theorem's printed
axioms are `propext` and `Quot.sound` (standard Lean axioms); there is no
`sorry`, `admit`, or custom axiom.

## View

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Open http://localhost:4173 in a modern browser (do not open `index.html` as a
`file://` URL: the animation fetches the CSV). No npm install or build is needed.
Play/pause, replay, and the target selector control
successive L-shaped borders. Reduced-motion preference disables autoplay and
CSS animation. Inter is requested from Google Fonts with a sans-serif fallback.

## Data provenance

`odd-square-samples.csv` was actually read from the granted Mac workspace at
`reason-launch-demo-20260914/odd-square-samples.csv`, without modifying its source,
and transferred with the managed workspace to Cloud. Its 96 bytes were checked
on both machines against SHA-256
`6284952fc022f5e3a03647ba03d92736f76d73521c9326e072eb41c152ed6811`.
The five examples are not a substitute for the general proof.

## Verification performed

Lean 4.19.0 compiled `OddSquares.lean` successfully. See `verification.txt`.
The actual Cloud browser rendered the animation; sample selectors 1, 3, 5, 8,
and 12 produced the corresponding square equations. Rectangle counts were
checked for 1, 3, 5, and 8. Replay returned to zero and Play resumed animation.
The hosted demonstration browser and preview are temporary; run the server above
to view the animation yourself.
