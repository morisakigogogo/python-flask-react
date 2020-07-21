## subprocess.run
subprocess.runを使って実行結果の標準出力を取得してその値で判定

## import
実行スクリプトをimportして変数などの値をみて判定

## 例外処理
チェック元のコードに例外が発生している時は以下のコードで例外をキャッチできる
```
try:
    from sample import *
except:
    print(sys.exc_info())
```

# 結果の返却
テスト実行後resultsという変数を用意をjson.dumpsしてからprint

## 成功
```
{
  "success": True
}
```

## 失敗
```
{
  "success": False,
  "errors": [
    {
      "case": 1,
      "reason": "理由",
      "result": "エラーになったデータ",
    },
    {
      "case": 2,
      "reason": "理由",
      "result": "エラーになったデータ",
    },
  ]
}
```