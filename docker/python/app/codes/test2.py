# inputを飛びこえてその先の関数などのテストをする場合
from io import StringIO
import contextlib


class redirect_stdin(contextlib._RedirectStream):
    _stream = "stdin"


buf = StringIO()
buf.write("0")  # inputに適当な数字をいれてスルーさせる
buf.seek(0)

with redirect_stdin(buf):
    from script2 import *

print(add(8))
