import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../store/actions';
import { BaseActionsTypes } from '../../../store/types';
import { Layout, Menu, Icon, Modal, Progress } from 'antd';
import './user-header.less';

const { Header } = Layout;
const { SubMenu } = Menu;
const { requestSignoutAction }: BaseActionsTypes = actions;
interface Props {
  rSignOut: () => void;
  user: any;
}

const UserHeader: React.FC<Props> = ({ rSignOut, user }) => {
  const signOutModal = () => {
    Modal.confirm({
      title: 'ログアウト',
      content: '本当にログアウトしますか',
      onOk() {
        rSignOut();
      },
      onCancel() {}
    });
  };
  const Title: React.FC = () => (
    <span>
      <>
        <Icon type="user" /> {user.name || 'アカウント'}
        <Progress
          percent={50}
          status="active"
          style={{ width: '100px', margin: '0 10px' }}
          showInfo={false}
        />
        <span style={{ display: 'inline-block' }}>Lv.1</span>
      </>
    </span>
  );
  return (
    <Header style={{ height: 'auto', padding: '0 20px' }}>
      <div className="logo">
        <Link to="/user">Home</Link>
      </div>
      <Menu mode="horizontal" theme="dark" style={{ float: 'right' }}>
        <SubMenu title={<Title />}>
          <Menu.Item key="setting:1">
            <Link to="/user/profile">プロフィール</Link>
          </Menu.Item>
          <Menu.Item key="setting:2" onClick={signOutModal}>
            ログアウト
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});
/* eslint-disable */
export default connect(mapStateToProps, { rSignOut: requestSignoutAction })(
  UserHeader
);
