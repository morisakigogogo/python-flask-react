/*
type設定したら、actionは自動になります。
例: 
REQUEST_SIGNUP => requestSignupAction
requestSignupAction はactionのネームです。
*/
import { constantTypesAry } from './storeConfig';
const aTypesCreate = (types: string[]) =>
  types.reduce((acc, type) => ({ ...acc, [type]: type }), {});
export type TypeActionTypes = ReturnType<typeof aTypesCreate>;
export const actionTypes = constantTypesAry;
export interface BaseAction {
  type: string;
  payload: any;
}
export interface BaseActionsTypes {
  [propName: string]: any;
}
