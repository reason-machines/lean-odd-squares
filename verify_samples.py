import csv
import hashlib
from pathlib import Path

path = Path('site/odd-square-samples.csv')
data = path.read_bytes()
assert len(data) == 96
assert hashlib.sha256(data).hexdigest() == '6284952fc022f5e3a03647ba03d92736f76d73521c9326e072eb41c152ed6811'
rows = list(csv.DictReader(data.decode().splitlines()))
assert [int(row['n']) for row in rows] == [1, 3, 5, 8, 12]
for row in rows:
    n = int(row['n'])
    assert int(row['last_odd']) == 2 * n - 1
    assert int(row['tile_count']) == sum(range(1, 2 * n, 2)) == n * n
print('PASS: 96 bytes, checksum match=True, all five Mac samples valid')
