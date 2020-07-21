import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';
import user from './user.reducer';
import projects from './project.reducer';
import courses from './course.reducer';
import study from './study.reducer';
import question from './question.reducer';
import documents from './document.reducer';

const reducers = {
  router: connectRouter(history),
  user,
  projects,
  courses,
  study,
  question,
  documents
};
export type TypeRootState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>;
};
const rootReducer = combineReducers(reducers);
export default rootReducer;
