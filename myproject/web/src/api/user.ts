import { $ajax, checkResponses } from './config';
export default checkResponses;
// export const getApi = params => $ajax.get(`${process.env.REACT_APP_API_BASE}api/get`, { params: {params} }).then(res => ({ res })).catch(err => ({ err }));
// export const postApi = (params={}) => $ajax.post(`${process.env.REACT_APP_API_BASE}api/post`, params);
// export const putApi = params => $ajax.put(`${process.env.REACT_APP_API_BASE}api/put`, params).then(res => ({ res })).catch(err => ({ err }));
// export const delApi = params => $ajax.delete(`${process.env.REACT_APP_API_BASE}api/delete`, { params }).then(res => ({ res })).catch(err => ({ err }));
// export const patchApi = params => $ajax.patch(`${process.env.REACT_APP_API_BASE}api/patch`, params).then(res => ({ res })).catch(err => ({ err }));
// export const headApi = params => $ajax.head(`${process.env.REACT_APP_API_BASE}api/get`, { params }).then(res => ({ res })).catch(err => ({ err }));
// export const requestApi = params => $ajax.request(params).then(res => ({ res })).catch(err => ({ err }));

export const getUser = (): Promise<any> =>
  $ajax
    .get(`/users`)
    .then(res => ({ res }))
    .catch(err => ({ err }));
export const signup = (params = {}): Promise<any> =>
  $ajax
    .post(`/users`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));
export const signin = (params = {}): Promise<any> =>
  $ajax
    .post(`/signin`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));
export const signoutaccess = (params = {}): Promise<any> => {
  return $ajax
    .delete(`/signout/access`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));
};
export const signoutrefresh = (params = {}): Promise<any> =>
  $ajax
    .delete(`/signout/refresh`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));
export const editUserinfo = (params = {}, id: number): Promise<any> =>
  $ajax
    .put(`/users/${id}`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));
