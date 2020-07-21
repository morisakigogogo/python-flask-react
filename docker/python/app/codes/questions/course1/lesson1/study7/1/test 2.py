results = {'success': False, 'reason': '','hint':''}

import sys
import json

#構文エラーの検知
try:
    from sample import *
except SyntaxError:
    results['hint'] = '構文に問題があるよ'
    print('構文に問題があるよ')
    print(json.dumps(results))
    sys.exit()

#変数がaであるか確認
try:
    a
except NameError:
    results['success'] = False
    results['hint'] = '変数aがないよ'
    print('変数aがないよ')
    print(json.dumps(results))
    sys.exit()

#代入した型の確認
if type(a) is int:
    results['success'] = True
else:
    results['success'] = False
    results['hint'] = '変数の型が違うよ'
    print('変数に代入する型が違うよ')
    print(json.dumps(results))
    sys.exit()

#変数に1が代入されているかどうか
if a == 1:
    results['success'] = True
    print(results)
    print(json.dumps(results))
else:
    results['success'] = False
    results['hint'] = '変数aに1が代入されてないよ'
    print('変数aに1が代入されてないよ')
    print(json.dumps(results))
