# script1.pyの変数や関数をimportしてテストする

from script1 import *

print("変数import")
print("----")
print(a)
if a == 1:
    print("success")
else:
    print("fail")
print("")

print("List import")
print("----")
print(fruits)
if len(fruits) == 3:
    print("success")
else:
    print("fail")
print("")


print("Dict import")
print("----")
print(student)
if student['name'] == 'Jogn':
    print("success")
else:
    print("fail")
print("")


print("List & Dict import")
print("----")
print(companies)
if companies[0]['name'] == 'Google':
    print("success")
else:
    print("fail")
print("")


print("関数import")
print("----")
print(b())
if b() == 1:
    print("success")
else:
    print("fail")
