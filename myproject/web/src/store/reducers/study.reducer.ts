import { BaseAction, actionTypes } from '../types';
const { GET_STUDY } = actionTypes;

export interface IStudy {
  id?: number;
  title?: string;
}

export interface IQuestion {
  id: number;
  no: number;
  title: string;
  description: string;
  code: string;
  order: number;
}

export interface TypeStudy {
  study: IStudy;
  code: string;
  questions: any;
  question: any;
}

let initialState: TypeStudy = {
  study: {},
  code: '',
  question: {},
  questions: []
};
export default (state: TypeStudy = initialState, action: BaseAction) => {
  switch (action.type) {
    case `${GET_STUDY}_SUCCESS`:
      return {
        ...state,
        study: action.payload.study,
        code: action.payload.code,
        question: action.payload.question,
        questions: action.payload.questions
      };
    default:
      return state;
  }
};
