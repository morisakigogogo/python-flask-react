import { BaseAction, actionTypes, BaseActionsTypes } from '../types';

const action = (type: string, payload = null) => ({ type, payload });
const typeToFnName = (strType: string) => {
  const ary = strType.toLocaleLowerCase().split('_');
  return ary[0] + ary[1].replace(/^\S/, s => s.toUpperCase());
};
const createActions = (types: any) => {
  return Object.keys(types).reduce((acc, typeKey) => {
    return {
      ...acc,
      [`${typeToFnName(typeKey)}Action`]: function(
        payload: any,
        async = false
      ): BaseAction {
        return action(async ? `${typeKey}_SUCCESS` : typeKey, payload);
      }
    };
  }, {});
};

const actions: BaseActionsTypes = createActions(actionTypes);
export default actions;
