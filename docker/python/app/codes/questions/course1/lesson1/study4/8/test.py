import sys
import json
import subprocess

# script.py を実行して出力を取得する
cmd = "python sample.py"  # 実行するpythonのファイル名
ret = subprocess.run(cmd, timeout=15, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
out = ret.stdout.decode()
rows = out.split()
"""
print("")
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
print(ret.stdout)
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
print(rows)
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
"""

results = {'success': False, 'reason': ''}
if rows[0] == '2019' and rows[1] == '2020' and rows[2] == '2021':
    results['success'] = True
else:
    results['success'] = False

print(json.dumps(results))
