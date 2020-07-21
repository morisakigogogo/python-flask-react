import { BaseAction, actionTypes } from '../types';

let initialState = {};

export default (state: any = initialState, action: BaseAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
