import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  addProject,
  getProjectsList,
  getProject,
  editProject,
  delProject,
  getProjectAssetsList,
  getProjectFiles,
  runProject
} from '../../api/project';
import { actionTypes, BaseActionsTypes } from '../types';
import actions from '../actions';

const {
  ADD_PROJECT,
  GET_PROJECTS,
  GET_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTASSETS,
  GET_PROJECTFILES,
  RUN_PROJECT
}: any = actionTypes;
const {
  addProjectAction,
  getProjectsAction,
  getProjectAction,
  editProjectAction,
  deleteProjectAction,
  getProjectassetsAction,
  getProjectfilesAction,
  runProjectAction
}: BaseActionsTypes = actions;

export function* watchAddProject() {
  yield takeLatest(ADD_PROJECT, workAddProject);
}

function* workAddProject({ payload }: any) {
  const { res, err } = yield call(addProject, payload);
  if (res) {
    yield put(addProjectAction(res, true));
    yield put(push('/user/projects'));
  } else {
    console.log('TCL: function*workAddProject -> else', err);
  }
}

export function* watchGetProjectsList() {
  yield takeLatest(GET_PROJECTS, workGetProjectsList);
}

function* workGetProjectsList({ payload }) {
  const { pageNumber, pageSize } = payload;
  const { res, err } = yield call(getProjectsList, { pageNumber, pageSize });
  if (res) {
    yield put(getProjectsAction(res, true));
  } else {
    console.log('TCL: function*workGetProjects -> else', err);
  }
}

export function* watchGetProject() {
  yield takeLatest(GET_PROJECT, workGetProject);
}

function* workGetProject({ payload }) {
  const { projectId } = payload;
  const { res, err } = yield call(getProject, { projectId });
  if (res) {
    yield put(getProjectAction(res, true));
  } else {
    console.log('TCL: function*workGetProject -> else', err);
  }
}

export function* watchEditProject() {
  yield takeLatest(EDIT_PROJECT, workEditProject);
}

function* workEditProject({ payload }) {
  const id = payload.id;
  delete payload.id;
  const { res, err } = yield call(editProject, payload, id);
  if (res) {
    yield put(editProjectAction(res, true));
  } else {
    console.log('TCL: function*workEditProject -> else', err);
  }
}

export function* watchDeleteProject() {
  yield takeLatest(DELETE_PROJECT, workDeleteProject);
}

function* workDeleteProject({ payload }) {
  const projectId = payload.projectId;
  const { res, err } = yield call(delProject, projectId);
  if (res) {
    yield put(deleteProjectAction(res, true));
  } else {
    console.log('TCL: function*workDeleteProject -> else', err);
  }
}

export function* watchGetProjectAssets() {
  yield takeLatest(GET_PROJECTASSETS, workGetProjectAssets);
}

function* workGetProjectAssets({ payload }) {
  const projectId = payload.projectId;
  const { res, err } = yield call(getProjectAssetsList, projectId);
  if (res) {
    yield put(getProjectassetsAction(res, true));
  } else {
    console.log('TCL: function*workGetProjectAssets -> else', err);
  }
}

export function* watchRunProject() {
  yield takeLatest(RUN_PROJECT, workRunProject);
}

function* workRunProject({ payload }) {
  const id = payload.id;
  delete payload.id;
  const { res, err } = yield call(runProject, payload, id);
  if (res) {
    yield put(runProjectAction(res, true));
  } else {
    console.log('TCL: function*workRunProject -> else', err);
  }
}
export function* watchGetProjectFiles() {
  yield takeLatest(GET_PROJECTFILES, workGetProjectFiles);
}

function* workGetProjectFiles({ payload }) {
  const id = payload.projectId;
  delete payload.projectId;
  const { res, err } = yield call(getProjectFiles, id);
  if (res) {
    yield put(getProjectfilesAction(res, true));
  } else {
    console.log('TCL: function*workGetProjectFiles -> else', err);
  }
}
