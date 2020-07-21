### newapp
### 初回作業
    migrationsのディレクトリが既に存在する場合は、実行しない。
    $ python3 manage.py db init
### table 追加
    $ python3 manage.py db migrate  
    
    $ python3 manage.py db upgrade
    
## 初期データ注入
    $ python3 manage.py seed_data
## 追加数据
  　$ python3 manage.py seed_data <fixturesにあるファイル名>
