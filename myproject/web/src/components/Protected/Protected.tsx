import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import storage from '../../lib/webStorage';

const Protected: React.FC = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      storage.getItem('userinfo').accessToken ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/', state: { from: props.location.pathname } }}
        />
      )
    }
  />
);
export default Protected;
