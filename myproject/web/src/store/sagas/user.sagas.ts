import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  getUser,
  signup,
  signin,
  signoutaccess,
  signoutrefresh,
  editUserinfo
} from '../../api/user';
import { actionTypes, BaseActionsTypes } from '../types';
import actions from '../actions';
import storage from '../../lib/webStorage';

const {
  GET_USER,
  REQUEST_SIGNUP,
  REQUEST_SIGNIN,
  REQUEST_SIGNOUT,
  EDIT_USERINFO
}: any = actionTypes;
const {
  requestSignupAction,
  requestSigninAction,
  getUserAction,
  requestSignoutAction,
  editUserinfoAction
}: BaseActionsTypes = actions;

export function* watchGetUser() {
  yield takeLatest(GET_USER, workGetUsers);
}
function* workGetUsers() {
  const users: string[] = yield call(getUser);
  yield put(getUserAction(users));
}
/* ~~~~~~~~~~~~~~~~~~ サインアップ ~~~~~~~~~~~~~~~~~~~~~~~~ */
export function* watchSignup() {
  yield takeLatest(REQUEST_SIGNUP, workSignup);
}

function* workSignup({ payload }: any) {
  const users = yield call(signup, payload);
  yield put(requestSignupAction(users, true));
  yield put(push('/sign-in'));
}
/* ~~~~~~~~~~~~~~~~~~ サインイン ~~~~~~~~~~~~~~~~~~~~~~~~ */
export function* watchSignin() {
  yield takeLatest(REQUEST_SIGNIN, workSignin);
}
function* workSignin({ payload }: any) {
  const { res, err } = yield call(signin, payload);
  if (res) {
    storage.setItem('authinfo', {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken
    });
    delete res.accessToken;
    delete res.refreshToken;
    storage.setItem('userinfo', res);
    yield put(requestSigninAction(res, true));
    yield put(push('/user'));
  } else {
    console.log('TCL: function*workSignout -> else', err);
  }
}
/* ~~~~~~~~~~~~~~~~~~ サインアウト ~~~~~~~~~~~~~~~~~~~~~~~~ */
export function* watchSignout() {
  yield takeLatest(REQUEST_SIGNOUT, workSignout);
}

function* workSignout() {
  const { res: accessres, err: accesserror } = yield call(signoutaccess);
  const { res: refreshres, err: refresherror } = yield call(signoutrefresh);
  if (accessres === 'R0001' && refreshres === 'R0001') {
    storage.removeItem('authinfo');
    storage.removeItem('userinfo');
    yield put(requestSignoutAction('', true));
    yield put(push('/'));
  } else {
    console.log('TCL: function*workSignout -> accesserror', accesserror);
    console.log('TCL: function*workSignout -> refresherror', refresherror);
  }
}
/* ~~~~~~~~~~~~~~~~~~ edit user ~~~~~~~~~~~~~~~~~~~~~~~~ */
export function* watchEditUserinfo() {
  yield takeLatest(EDIT_USERINFO, workEditUserinfo);
}

function* workEditUserinfo({ payload }: any) {
  const id = payload.id;
  delete payload.id;
  const { res, err } = yield call(editUserinfo, payload, id);
  if (res) {
    storage.setItem('userinfo', res);
    yield put(editUserinfoAction(res, true));
  } else {
    console.log('TCL: workEditUserinfo  -> err', err);
  }
}
