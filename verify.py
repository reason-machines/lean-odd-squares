"""Check the original fixture and its arithmetic, not a replacement for Lean."""
import csv
import hashlib
from pathlib import Path

source = Path('odd-square-samples.csv')
assert hashlib.sha256(source.read_bytes()).hexdigest() == '6284952fc022f5e3a03647ba03d92736f76d73521c9326e072eb41c152ed6811'
with source.open() as file:
    rows = list(csv.DictReader(file))
assert [int(row['n']) for row in rows] == [1, 3, 5, 8, 12]
for row in rows:
    n = int(row['n'])
    assert int(row['last_odd']) == 2 * n - 1
    assert int(row['tile_count']) == sum(range(1, 2 * n, 2)) == n * n
print('PASS: original 96-byte Mac fixture and all five sample identities')
