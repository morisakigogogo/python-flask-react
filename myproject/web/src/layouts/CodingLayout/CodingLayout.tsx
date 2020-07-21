import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router';
import UserHeader from '../../components/organisms/UserHeader/UserHeader';
import './coding-layout.less';

const { Content } = Layout;

const CodingLayout: React.FC = ({ children, ...rest }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <UserHeader />
      <Layout style={{ flex: 1 }}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

const CodingLayoutRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <CodingLayout>
          <Component {...matchProps} />
        </CodingLayout>
      )}
    />
  );
};

export default CodingLayoutRoute;
// const mapStateToProps = () => ({});
// export default connect(
//   mapStateToProps,
//   {}
// )(CodingLayoutRoute);
