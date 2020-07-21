import { all, fork } from 'redux-saga/effects';
import {
  watchSignup,
  watchSignin,
  watchSignout,
  // watchGetUser,
  watchEditUserinfo
} from './user.sagas';
import {
  watchAddProject,
  watchGetProjectsList,
  watchGetProject,
  watchEditProject,
  watchDeleteProject,
  watchGetProjectAssets,
  watchGetProjectFiles,
  watchRunProject
} from './project.sagas';
import { watchGetCourseList, watchGetCourse } from './course.sagas';
import { watchGetStudy } from './study.sagas';
import { watchExecuteCode } from './question.saga';
import { watchGetDocuments } from './document.saga';

const rootSaga = function* root() {
  yield all([
    fork(watchSignup),
    fork(watchSignin),
    fork(watchSignout),
    // fork(watchGetUser),
    fork(watchEditUserinfo),
    fork(watchAddProject),
    fork(watchGetProjectsList),
    fork(watchGetProject),
    fork(watchGetProjectAssets),
    fork(watchEditProject),
    fork(watchGetProjectFiles),
    fork(watchRunProject),
    fork(watchDeleteProject),
    fork(watchGetCourseList),
    fork(watchGetCourse),
    fork(watchGetStudy),
    fork(watchExecuteCode),
    fork(watchGetDocuments)
  ]);
};

export default rootSaga;
