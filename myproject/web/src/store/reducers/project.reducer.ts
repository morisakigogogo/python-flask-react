import { BaseAction, actionTypes } from '../types';
const {
  GET_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECTTITLE,
  DELETE_PROJECT,
  GET_PROJECTASSETS,
  RUN_PROJECT,
  GET_PROJECTFILES,
  RESET_PROJECTFILES
} = actionTypes;
export interface TypeProjectList {
  id: number;
  title: string;
}
export interface TypeProjects {
  list: Array<TypeProjectList>;
  pageInfo: {
    pageSize: number;
    total: number;
  };
}
export interface TypeProjectOne {
  id: number;
  title: string;
}
export interface TypeProjectAssets {
  uid: number;
  name: string;
  status: string;
}
export interface TypeProject {
  projectsList: TypeProjects;
  project: TypeProjectOne;
  projectAssets: Array<TypeProjectAssets>;
  reviewUrl: string;
  main: string;
  index: string;
  style: string;
}
let initialState: TypeProject = {
  projectsList: {
    list: [],
    pageInfo: {
      pageSize: 1,
      total: 0
    }
  },
  project: {
    id: 0,
    title: ''
  },
  projectAssets: [],
  reviewUrl: '',
  main: '',
  index: '',
  style: ''
};
export default (state: TypeProject = initialState, action: BaseAction) => {
  switch (action.type) {
    case `${GET_PROJECTS}_SUCCESS`:
      return { ...state, projectsList: action.payload };
    case `${GET_PROJECT}_SUCCESS`:
      return { ...state, project: action.payload };
    case `${UPDATE_PROJECTTITLE}`:
      return {
        ...state,
        project: { ...state.project, title: action.payload.title }
      };
    case `${DELETE_PROJECT}`:
      return {
        ...state,
        projectsList: {
          ...state.projectsList,
          list: state.projectsList.list.filter(
            item => item.id !== action.payload.projectId
          )
        }
      };
    case `${GET_PROJECTASSETS}_SUCCESS`:
      const projectAssets = action.payload.reduce((acc, cur, index) => {
        return [...acc, { uid: index, name: cur, status: 'done' }];
      }, []);
      return {
        ...state,
        projectAssets
      };
    case `${RUN_PROJECT}_SUCCESS`:
      return {
        ...state,
        reviewUrl: `${action.payload.reviewUrl}?t=${new Date().getTime()}`
      };
    case `${GET_PROJECTFILES}_SUCCESS`:
      return {
        ...state,
        reviewUrl: `${action.payload.reviewUrl}?t=${new Date().getTime()}`,
        main: action.payload.main,
        index: action.payload.index,
        style: action.payload.style
      };
    case `${RESET_PROJECTFILES}`:
      return {
        ...state,
        reviewUrl: '',
        main: '// coding here ...',
        index: '// coding here ...',
        style: '// coding here ...'
      };
    default:
      return state;
  }
};
