import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import moment from 'moment';
import store from './store';
import App from './App';
import 'antd/dist/antd.less';
import './index.less';
import './assets/styles/base.less';
import history from './store/history';

moment.locale('ja_JP');
const antdConfig = {
  locale: jaJP
};
ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider {...antdConfig}>
      <App history={history} />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
