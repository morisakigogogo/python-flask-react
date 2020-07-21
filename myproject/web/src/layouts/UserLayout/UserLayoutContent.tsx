import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserHeader from '../../components/organisms/UserHeader/UserHeader';
import { Icon, Layout, Menu } from 'antd';
import './user-layout.less';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
interface Props {
  children: ReactElement;
}
const UserLayout: React.FC<Props> = ({ children }) => {
  const menuItemList = [
    {
      title: 'ホーム',
      pathName: '/user'
    },
    {
      title: 'プロジェクト',
      pathName: '/user/projects',
      fnName: null
    }
  ];
  return (
    <Layout>
      <UserHeader />
      <Layout>
        <Sider width={200} style={{ background: '#fff' }} breakpoint="lg">
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
            defaultSelectedKeys={['0']}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="home" />
                  Dashboard
                </span>
              }
            >
              {menuItemList.map(({ title, pathName, fnName }, index) => {
                return (
                  <Menu.Item key={index}>
                    {fnName ? (
                      <span onClick={fnName}>{title}</span>
                    ) : (
                      <span>{title}</span>
                    )}
                    {pathName && <Link to={pathName} />}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content className="content-container">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = () => ({});
// eslint-disable-next-line
export default connect(mapStateToProps, {})(UserLayout);
