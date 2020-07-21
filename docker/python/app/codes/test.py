# from script import *
from subprocess import Popen, PIPE, STDOUT, run

#cmd = "python script.py"
#ret = subprocess.run(cmd, timeout=15, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
#print(ret.stdout.decode())

# p = Popen(['python', 'script.py'], stdout=PIPE, stdin=PIPE, stderr=STDOUT)
p = run(['python', 'script.py'], stdout=PIPE, input='hello222', encoding='ascii')
print("-------")
print(p)

"""
print(len(l))

# TestCase:1
if b() == 'bb':
    print("success")
else:
    print("error")
"""