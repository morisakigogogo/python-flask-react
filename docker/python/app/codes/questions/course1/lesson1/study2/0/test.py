import sys
import json
import subprocess

# script.py を実行して出力を取得する
cmd = "python sample.py"  # 実行するpythonのファイル名
ret = subprocess.run(cmd, timeout=15, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
out = ret.stdout.decode()
rows = out.splitlines()
results = {'success': False, 'reason': ''}

if rows[0] == 'apple':
    results['success'] = True
    results['response'] = rows
else:
    results['success'] = False
    results['hint'] = "appleがありません"
    results['response'] = rows

print(json.dumps(results))
