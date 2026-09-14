const svg = document.querySelector('#square');
const target = document.querySelector('#target');
const play = document.querySelector('#play');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let n = 0;
let running = !reducedMotion;
let timer;

function render() {
  const limit = Number(target.value);
  const unit = 400 / Math.max(limit, 1);
  svg.replaceChildren();
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      cell.setAttribute('x', 10 + x * unit);
      cell.setAttribute('y', 410 - (y + 1) * unit);
      cell.setAttribute('width', unit - 3);
      cell.setAttribute('height', unit - 3);
      cell.setAttribute('rx', Math.min(4, unit / 10));
      if (Math.max(x, y) === n - 1) cell.setAttribute('class', 'new');
      svg.append(cell);
    }
  }
  svg.setAttribute('aria-label', `${n} by ${n} square, ${n * n} cells; newest border has ${n ? 2 * n - 1 : 0} cells`);
  document.querySelector('#step').textContent = `Step ${n} / ${limit}`;
  document.querySelector('#equation').textContent = `${n * n} = ${n}²`;
  document.querySelector('#sum').textContent = n ? Array.from({length:n}, (_, i) => 2 * i + 1).join(' + ') + ` = ${n * n}` : 'Empty sum = 0';
  document.querySelector('#detail').textContent = n ? `A ${n - 1} × ${n - 1} square + ${2 * n - 1} new cells. One row of ${n}, one column of ${n - 1}: the next odd number fits exactly.` : 'Begin with no cells. The empty sum is zero—the base case of the proof.';
  play.textContent = running ? 'Pause' : 'Play';
}
function schedule() {
  clearTimeout(timer);
  if (!running) return;
  timer = setTimeout(() => {
    n = n >= Number(target.value) ? 0 : n + 1;
    render();
    schedule();
  }, n === Number(target.value) ? 2600 : 1100);
}
play.addEventListener('click', () => { running = !running; play.textContent = running ? 'Pause' : 'Play'; schedule(); });
document.querySelector('#replay').addEventListener('click', () => { n = 0; render(); schedule(); });
target.addEventListener('change', () => { n = Number(target.value); render(); schedule(); });
try {
  const response = await fetch('odd-square-samples.csv');
  if (!response.ok) throw new Error('CSV request failed');
  const rows = (await response.text()).trim().split(/\r?\n/);
  if (rows.shift() !== 'sample,n,last_odd,tile_count') throw new Error('Unexpected CSV columns');
  for (const row of rows) {
    const [sample, count, last, tiles] = row.split(',');
    const value = Number(count);
    if (!Number.isInteger(value) || value < 1 || value > 30 || Number(last) !== 2 * value - 1 || Number(tiles) !== value * value) throw new Error('Invalid sample');
    target.add(new Option(`${value} · ${sample}`, count));
  }
  target.value = '5';
  document.querySelector('#source').textContent = 'Original Mac CSV · 5 examples · Lean 4.19.0 · Classical identity, formally checked';
  render();
  schedule();
} catch (error) {
  running = false;
  render();
  play.disabled = true;
  document.querySelector('#source').textContent = `Cannot load examples: ${error.message}`;
}
