import { $ajax } from './config';

export const getDocuments = ({ type }): Promise<any> =>
  $ajax
    .get(`/user/documents`, { params: { type: type } })
    .then(res => ({ res }))
    .catch(err => ({ err }));
