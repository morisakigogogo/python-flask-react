# coding: UTF-8
from flask import abort
import re
from functools import reduce


def get_err_msg(type='success', code=''):
    errorCode = {
        'success': {
            'rcd': 'R0001',
            'rmg': '操作成功しました！'
        },
        'user': {
            'err1': {
                'rcd': 'U0001',
                'rmg': 'すでに登録されています。'
            },
            'err2': {
                'rcd': 'U0002',
                'rmg': 'メールアドレス間違えました。'
            },
            'err3': {
                'rcd': 'U0003',
                'rmg': 'パスワード間違えました。'
            },
        },
        'http': {
            'err1': {
                'rcd': 'H0001',
                'rmg': 'リクエストが不正です！Content-Typeはapplication/jsonを設定して下さい。'
            },
            'err2': {
                'rcd': 'H0002',
                'rmg': 'リクエストボディが不正です。'
            },
        },
        "auth": {
            'err1': {
                'rcd': 'A0001',
                'rmg': '無効なトークンです。'
            },
            'err2': {
                'rcd': 'A0002',
                'rmg': 'トークンの有効期限が切れました。'
            },
            'err3': {
                'rcd': 'A0003',
                'rmg': '無効なトークンです。'
            },
        }
    }
    if type == 'success':
        return {**errorCode[type]}
    else:
        return {**errorCode[type][code]}


def get_res_data(type='success', code='', rmg='', data=''):
    res = {**get_err_msg(type, code)}
    if(rmg):
        res['rmg'] = rmg
    if(data):
        res['data'] = data
    return res


def to_dict(self):
    return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}


def abort_doesnt_exist(db, Model, src, target):
    if (db.session.query(Model).filter(src == target).first() is None):
        abort(404, "target {} 存在しません".format(target))


underline2hump = lambda dt: re.sub(r'(_\w)', lambda x: x.group(1)[1].upper(), dt)  # noqa: E731


dictUnderline2hump = lambda d: {underline2hump(key): d[key] for key in d}  # noqa: E731


def listUnderline2hump(list):
    rlist = []

    def fn(acc, cur):
        rlist.append(dictUnderline2hump(cur))
        return rlist
    result = reduce(fn, list, [])
    return result
