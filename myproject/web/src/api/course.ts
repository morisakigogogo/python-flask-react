import { $ajax, checkResponses } from './config';
export default checkResponses;
// export const getApi = params => $ajax.get(`${process.env.REACT_APP_API_BASE}api/get`, { params: {params} }).then(res => ({ res })).catch(err => ({ err }));
// export const postApi = (params={}) => $ajax.post(`${process.env.REACT_APP_API_BASE}api/post`, params);
// export const putApi = params => $ajax.put(`${process.env.REACT_APP_API_BASE}api/put`, params).then(res => ({ res })).catch(err => ({ err }));
// export const delApi = params => $ajax.delete(`${process.env.REACT_APP_API_BASE}api/delete`, { params }).then(res => ({ res })).catch(err => ({ err }));
// export const patchApi = params => $ajax.patch(`${process.env.REACT_APP_API_BASE}api/patch`, params).then(res => ({ res })).catch(err => ({ err }));
// export const headApi = params => $ajax.head(`${process.env.REACT_APP_API_BASE}api/get`, { params }).then(res => ({ res })).catch(err => ({ err }));
// export const requestApi = params => $ajax.request(params).then(res => ({ res })).catch(err => ({ err }));

export const getCourses = (params = {}): Promise<any> =>
  $ajax
    .get(`/user/courses`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));

export const getCourse = ({ courseId }): Promise<any> =>
  $ajax
    .get(`/user/courses/${courseId}`)
    .then(res => ({ res }))
    .catch(err => ({ err }));

export const getStudy = ({ studyId, questionId }): Promise<any> =>
  $ajax
    .get(`/user/studies/${studyId}`, { params: { questionId: questionId } })
    .then(res => ({ res }))
    .catch(err => ({ err }));

export const executeCode = (params = {}, questionId): Promise<any> =>
  $ajax
    .post(`/user/questions/${questionId}/executes/python`, params)
    .then(res => ({ res }))
    .catch(err => ({ err }));
