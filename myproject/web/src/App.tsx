import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';
import './App.less';
import { connect } from 'react-redux';
import actions from './store/actions';
import { TypeRootState } from './store/reducers';
import { Spin } from 'antd';
import { Observer } from './lib';

const { getUserAction }: any = actions;
interface AppProps {
  history: History;
  getUser: () => void;
}

const App = ({ history }: AppProps) => {
  const [loading, setLoading] = useState(false);
  Observer.on('request', () => {
    setLoading(true);
  });
  Observer.on('response', () => {
    setLoading(false);
  });
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <ConnectedRouter history={history}>
      {loading && (
        <div className="span-loading">
          <Spin />
        </div>
      )}
      {routes}
    </ConnectedRouter>
  );
};
// export default hot(module)(App);
const mapStateToProps = ({ projects, user }: TypeRootState) => ({
  projects,
  user
});
export default hot(module)(
  // prettier-ignore
  connect(mapStateToProps, { getUser: getUserAction })(App)
);
