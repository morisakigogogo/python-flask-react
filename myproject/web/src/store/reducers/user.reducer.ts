import { BaseAction, actionTypes } from '../types';
import storage from '../../lib/webStorage';

const { REQUEST_SIGNIN, EDIT_USERINFO, GET_USER } = actionTypes;

export interface TypeUser {
  email: string;
  createdAt: string;
  token: null;
  updatedAt: string;
  name: string;
  schoolId: number;
  isManager: boolean;
  isAdmin: boolean;
  loginAt: null;
  typeCount: number;
  id: number;
}
let initialState: TypeUser = {
  email: '',
  createdAt: '',
  token: null,
  updatedAt: '',
  name: '',
  schoolId: 1,
  isManager: false,
  isAdmin: false,
  loginAt: null,
  typeCount: 0,
  id: 0
};
export default (state: TypeUser = initialState, action: BaseAction) => {
  switch (action.type) {
    case `${REQUEST_SIGNIN}_SUCCESS`:
      return { ...state, ...action.payload };
    case `${EDIT_USERINFO}_SUCCESS`:
      return { ...state, ...action.payload };
    case `${GET_USER}_SUCCESS`:
      return { ...state, ...action.payload };
    case GET_USER:
      const user = storage.getItem('userinfo');
      return { ...state, ...user };
    default:
      return state;
  }
};
