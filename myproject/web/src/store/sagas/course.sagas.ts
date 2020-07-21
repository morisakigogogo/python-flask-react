import { call, put, takeLatest } from 'redux-saga/effects';
import { getCourses, getCourse } from '../../api/course';
import { actionTypes, BaseActionsTypes } from '../types';
import actions from '../actions';
const { GET_COURSES, GET_COURSE }: any = actionTypes;
const { getCoursesAction, getCourseAction }: BaseActionsTypes = actions;

// get courses
// ---
export function* watchGetCourseList() {
  yield takeLatest(GET_COURSES, workGetCourseList);
}

function* workGetCourseList() {
  const { res, err } = yield call(getCourses);
  if (res) {
    yield put(getCoursesAction(res, true));
  } else {
    console.log('TCL: function*workGetCourses -> else', err);
  }
}

// get course
// ---
export function* watchGetCourse() {
  yield takeLatest(GET_COURSE, workGetCourse);
}

function* workGetCourse({ payload }) {
  const { courseId } = payload;
  const { res, err } = yield call(getCourse, { courseId });
  if (res) {
    yield put(getCourseAction(res, true));
  } else {
    console.log('TCL: function*workGetCourse -> else', err);
  }
}
