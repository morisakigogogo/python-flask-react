import axios from 'axios';
import { notification } from 'antd';
import storage from '../lib/webStorage';
import history from '../store/history';
import { Observer } from '../lib';
export const $ajax = axios.create({
  timeout: process.env.REACT_APP_REQUEST_TIMOUT,
  baseURL: process.env.REACT_APP_API_BASE
});

$ajax.interceptors.request.use(
  config => {
    console.log('TCL: #Api:request', config);
    const { accessToken, refreshToken } =
      (storage.getItem('authinfo') && storage.getItem('authinfo')) || {};
    if (config.url.includes('signout/refresh')) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    Observer.run('request');
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
$ajax.interceptors.response.use(
  res => {
    console.log('TCL: #Api:response', res);
    Observer.run('response');
    if (res.status === 200) {
      if (res.data) {
        return checkResponses(res.data, res.config);
      } else {
        return checkResponses(res);
      }
    }
    return checkResponses(res);
  },
  err => {
    Observer.run('response');
    return checkResponses(err.response.data);
  }
);

export const checkResponses = (res, config = '') => {
  const noMsg = ['/user/projects', '/user/courses', '/user/studies'];
  return new Promise((resolve, reject) => {
    switch (res.rcd) {
      case 'R0001':
        if (
          (noMsg.includes(config.url) && config.method === 'get') ||
          (config.url.includes('/user/projects') && config.method === 'get')
        ) {
        } else {
          if (
            config.url.includes('/user/projects') &&
            config.method === 'put'
          ) {
            showMsg(res.rmg, 'info');
          } else {
            showMsg(res.rmg);
          }
        }
        resolve(res.data || res.rcd);
        break;
      case 'A0002':
        showMsg(res.rmg);
        storage.removeItem('authinfo');
        history.push('/sign-in');
        break;
      default:
        showMsg(res.rmg || res.message || 'ネットワーク不安定です！');
        reject(res.rmg || res.message || 'ネットワーク不安定です！');
        break;
    }
  });
};
const showMsg = (rmg, type = 'warning') => {
  notification[type]({
    message: rmg,
    duration: 5
  });
};

// Form data
// $ajax.defaults.transformRequest = [function(data){
//     let reqData = '';
//     for (let key in data) {
//         reqData += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
//     }
//     return reqData;
// }]
// $ajax.defaults.transformResponse = [function(data){
// }]
// export const formUrlencoded = {
//   headers: {
//     Accept: "aplication/x-www-form-urlencoded, text/plain, */*"
//   },
//   transformRequest: [
//     function(data) {
//       let ret = "";
//       for (let key in data) {
//         ret +=
//           encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
//       }
//       return ret;
//     }
//   ]
// };

// export const json = {
//   headers: {
//     Accept: "aplication/json"
//   }
// };
// export const formDate = {
//   headers: {
//     Accept: "multipart/form-data"
//   }
// };
