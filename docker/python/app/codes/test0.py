import subprocess

# script.py を実行して出力を取得する
cmd = "python script0.py"  # 実行するpythonのファイル名
ret = subprocess.run(cmd, timeout=15, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
print("")
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
print(ret.stdout.decode())
print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
