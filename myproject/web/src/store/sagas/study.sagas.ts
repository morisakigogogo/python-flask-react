import { call, put, takeLatest } from 'redux-saga/effects';
import { getStudy } from '../../api/course';
import { actionTypes, BaseActionsTypes } from '../types';
import actions from '../actions';
const { GET_STUDY }: any = actionTypes;
const { getStudyAction }: BaseActionsTypes = actions;

// get study
// ---
export function* watchGetStudy() {
  yield takeLatest(GET_STUDY, workGetStudy);
}

function* workGetStudy({ payload }) {
  const { studyId, questionId } = payload;
  const { res, err } = yield call(getStudy, { studyId, questionId });
  if (res) {
    yield put(getStudyAction(res, true));
  } else {
    console.log('TCL: function*workGetStudy -> else', err);
  }
}
