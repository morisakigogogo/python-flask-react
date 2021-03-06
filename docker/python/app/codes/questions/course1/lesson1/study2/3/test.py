# coding: utf-8
import sys
import json
import subprocess

# script.py を実行して出力を取得する
cmd = "python sample.py"  # 実行するpythonのファイル名
ret = subprocess.run(cmd, timeout=15, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
out = ret.stdout.decode()
rows = out.splitlines()
"""
print("")
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
print(ret.stdout)
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
print(rows)
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
"""

results = {'success': False, 'reason':''}

if rows[0] == 'banana':
    results['success'] = True
    results['hint'] = ''
    results['response'] = rows
else:
    results['success'] = False
    results['hint'] = ''
    results['response'] = rows
    for i in rows:
        if i == 'NameError:':
            results['reason']= 'fail name'
print(json.dumps(results))
