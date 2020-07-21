import { BaseAction, actionTypes } from '../types';
const { EXECUTE_CODE } = actionTypes;

let initialState = {
  execute: {
    command: '',
    result: ''
  }
};

export default (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case `${EXECUTE_CODE}`:
      return state;
    case `${EXECUTE_CODE}_SUCCESS`:
      return { ...state, execute: action.payload };
    default:
      return state;
  }
};
