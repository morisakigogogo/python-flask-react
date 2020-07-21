import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, BaseActionsTypes } from '../types';
import actions from '../actions';
import { executeCode } from '../../api/course';
const { EXECUTE_CODE } = actionTypes;
const { executeCodeAction }: BaseActionsTypes = actions;

export function* watchExecuteCode() {
  yield takeLatest(EXECUTE_CODE, workExecuteCode);
}

function* workExecuteCode({ payload }: any) {
  const { res, err } = yield call(executeCode, payload, payload.id);
  if (res) {
    yield put(executeCodeAction(res, true));
  } else {
    console.log('TCL: function*workExecuteCode -> else', err);
  }
}
