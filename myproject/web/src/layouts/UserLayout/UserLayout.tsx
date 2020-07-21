import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserLayout from './UserLayoutContent';
import './user-layout.less';
import storage from '../../lib/webStorage';

const UserLayoutRoute = ({ component: Component, ...rest }: any) => {
  const { accessToken, refreshToken } =
    (storage.getItem('authinfo') && storage.getItem('authinfo')) || {};
  return (
    <Route
      {...rest}
      render={matchProps =>
        accessToken && refreshToken ? (
          <UserLayout>
            <Component {...matchProps} />
          </UserLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: matchProps.location.pathname }
            }}
          />
        )
      }
    />
  );
};

export default UserLayoutRoute;
// const mapStateToProps = () => ({});
// export default connect(
//   mapStateToProps,
//   {}
// )(UserLayoutRoute);
