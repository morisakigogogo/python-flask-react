# coding: utf-8
import sys
import json
import subprocess
import re

# script.py を実行して出力を取得する
cmd = "python sample.py"  # 実行するpythonのファイル名
ret = subprocess.run(cmd, timeout=15, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
out = ret.stdout.decode()
rows = out.split()
rowss = out.splitlines()
"""
print("")
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
print(ret.stdout)
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
print(rows)
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
"""

results = {'success': False, 'reason': '','hint':''}

#出力があるかどうか
if len(rows) == 0:
    results['success'] = False
    results['hint']= '関数が出力されてないよ'
    print(json.dumps(results))
    print(results)
    sys.exit()

#関数の正誤
for row in rows:
    if row == "NameError:":
        results['success'] = False
        for i in rowss:
            matches = re.findall(r"NameError.+",i)
            if len(matches) == 1:
                match = matches[0]
                match1 = re.findall(r"'.*'",match)
                match2 = match1[0]
                text_mod = match2.replace("'","")
                results['hint']='関数が'+text_mod+'になってるよ'
                print(json.dumps(results))
                print(results)
                sys.exit()
    else:
        results['success'] = True

#文法の正誤
for row in rows:
    if row == "SyntaxError:":
        results['success'] = False
        results['hint'] = '関数の文法に誤りがあるよ'
        print(results)
        print(json.dumps(results))
        sys.exit()
    else:
        results['success'] = True

#書式の正誤
for row in rows:
    if row == "TypeError:":
        results['success'] = False
        results['hint'] = '文字と数字が混ざっています'
        print(results)
        print(json.dumps(results))
        sys.exit()
else:
    results['success'] = True

#出力内容の確認
if len(rows) == 1:
    results['success'] = True
else:
    results['success'] = False
    results['hint'] = '出力する内容が正しくありません'
    print(results)
    print(json.dumps(results))
    sys.exit()

if rows[0] == '1':
    results['success'] = True
    print(results)
    print(json.dumps(results))
else:
    results['success'] = False
    results['hint'] = '出力する内容が正しくありません'
    print(results)
    print(json.dumps(results))
    sys.exit()
