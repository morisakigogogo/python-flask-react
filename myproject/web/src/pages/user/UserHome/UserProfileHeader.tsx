import React from 'react';
import { Layout } from 'antd';
import './user-profile-header.less';

interface Props {
  user: {
    name: string;
  };
}
const UserProfileHeader: React.FC<Props> = ({ user }) => {
  return (
    <Layout className="user-profile-container">
      <div className="user-name">Hi! {user.name}</div>
    </Layout>
  );
};

export default UserProfileHeader;
// const mapStateToProps = () => ({});
// export default connect(
//   mapStateToProps,
//   {}
// )(UserProfileHeader);
