import { call, put, takeLatest } from 'redux-saga/effects';
import { getDocuments } from '../../api/document';
import { actionTypes, BaseActionsTypes } from '../types';
import actions from '../actions';
const { GET_DOCUMENTS }: any = actionTypes;
const { getDocumentsAction }: BaseActionsTypes = actions;

export function* watchGetDocuments() {
  yield takeLatest(GET_DOCUMENTS, workGetDocuments);
}

function* workGetDocuments({ payload }) {
  const { type } = payload;
  const { res, err } = yield call(getDocuments, { type: type });
  if (res) {
    yield put(getDocumentsAction(res, true));
  } else {
    console.log('TCL: function*workGetCourses -> else', err);
  }
}
