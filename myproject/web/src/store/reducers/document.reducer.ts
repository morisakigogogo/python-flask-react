import { BaseAction, actionTypes } from '../types';
const { GET_DOCUMENTS } = actionTypes;

export interface IDocument {
  id: number;
  title: string;
  description: string;
  content: string;
  type: string;
  video_url: string;
  thumbnail_url: string;
  order: number;
}

let initialState = {
  documents: []
};

export default (state: any = initialState, action: BaseAction) => {
  switch (action.type) {
    case `${GET_DOCUMENTS}_SUCCESS`:
      console.log('document payload', action.payload);
      return { ...state, documents: action.payload.documents };
    default:
      return state;
  }
};
