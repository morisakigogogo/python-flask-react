import { $ajax, checkResponses } from './config';
export default checkResponses;
// export const getApi = params => $ajax.get(`${process.env.REACT_APP_API_BASE}api/get`, { params: {params} }).then(res => ({ res })).catch(err => ({ err }));
// export const postApi = (params={}) => $ajax.post(`${process.env.REACT_APP_API_BASE}api/post`, params);
// export const putApi = params => $ajax.put(`${process.env.REACT_APP_API_BASE}api/put`, params).then(res => ({ res })).catch(err => ({ err }));
// export const delApi = params => $ajax.delete(`${process.env.REACT_APP_API_BASE}api/delete`, { params }).then(res => ({ res })).catch(err => ({ err }));
// export const patchApi = params => $ajax.patch(`${process.env.REACT_APP_API_BASE}api/patch`, params).then(res => ({ res })).catch(err => ({ err }));
// export const headApi = params => $ajax.head(`${process.env.REACT_APP_API_BASE}api/get`, { params }).then(res => ({ res })).catch(err => ({ err }));
// export const requestApi = params => $ajax.request(params).then(res => ({ res })).catch(err => ({ err }));

export const addProject = (params = {}): Promise<any> =>
  $ajax
    .post(`/user/projects`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));
export const getProjectsList = ({ pageNumber, pageSize }): Promise<any> =>
  $ajax
    .get(`/user/projects`, {
      params: { pageNumber: Number(pageNumber), pageSize: Number(pageSize) }
    })
    .then(res => ({ res }))
    .catch(err => ({ err }));

export const getProject = ({ projectId }): Promise<any> =>
  $ajax
    .get(`/user/projects/${projectId}`)
    .then(res => ({ res }))
    .catch(err => ({ err }));

export const editProject = (params = {}, projectId: number): Promise<any> =>
  $ajax
    .put(`/user/projects/${projectId}`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));

export const delProject = (projectId: number): Promise<any> =>
  $ajax
    .delete(`/user/projects/${projectId}`)
    .then(res => ({ res }))
    .catch(err => ({ err }));

export const getProjectAssetsList = (projectId: number): Promise<any> =>
  $ajax
    .get(`/user/projects/${projectId}/assets`)
    .then(res => ({ res }))
    .catch(err => ({ err }));

export const getProjectFiles = (projectId: number): Promise<any> =>
  $ajax
    .get(`/user/projects/${projectId}/files`)
    .then(res => ({ res }))
    .catch(err => ({ err }));
export const runProject = (params = {}, projectId: number): Promise<any> =>
  $ajax
    .put(`/user/projects/${projectId}/files`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));
