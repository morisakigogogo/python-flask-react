import React from 'react';
import { Route } from 'react-router-dom';

const HomeLayout: React.FC = ({ children, ...rest }) => {
  return <div>{children}</div>;
};

const HomeLayoutRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <HomeLayout>
          <Component {...matchProps} />
        </HomeLayout>
      )}
    />
  );
};

export default HomeLayoutRoute;
// const mapStateToProps = () => ({});
// export default connect(
//   mapStateToProps,
//   {}
// )(HomeLayoutRoute);
