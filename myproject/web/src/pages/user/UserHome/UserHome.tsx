import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import UserProfileHeader from './UserProfileHeader';
import { Typography, Button, Row, Col, Card, Progress } from 'antd';
import actions from '../../../store/actions';
import { TypeRootState } from '../../../store/reducers';
import { BaseActionsTypes } from '../../../store/types';

const { Title } = Typography;
const { getProjectsAction, getUserAction }: BaseActionsTypes = actions;
interface Props extends UserProps {
  getUser: () => void;
  getProjects: ({ pageNumber, pageSize }) => void;
  projectsList: {
    list: Array<any>;
    pageInfo: any;
  };
  user: any;
}

interface IParams {}
type RouteProps = RouteComponentProps<IParams>;
type IProps = Props & RouteProps;
interface ProjectsType {
  title: string;
}
const UserHome: React.FC<IProps> = ({
  getUser,
  getProjects,
  projectsList,
  user,
  history
}) => {
  useEffect(() => {
    getUser();
    getProjects({ pageNumber: 1, pageSize: 4 });
    return () => {};
  }, [getProjects, getUser]);
  return (
    <>
      <UserProfileHeader user={user} />
      <div style={{ padding: '24px 48px' }}>
        <Title level={2}>MyRanking</Title>
        <div>
          <Row>
            <Col>
              <Progress
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068'
                }}
                format={() => `9 Lv.`}
                percent={80}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div style={{ padding: '24px 48px' }}>
        <Title level={2}>MyProjects</Title>
        <div>
          <Row>
            {projectsList.list.length > 0 &&
              projectsList.list.map(({ id, title }: any, index: number) => (
                <Col span={6} key={index}>
                  <Card title={title}>
                    <Button
                      type="primary"
                      onClick={() => {
                        history.push({
                          pathname: `/user/projects/${id}/editor`,
                          state: id
                        });
                      }}
                    >
                      編集する
                    </Button>
                  </Card>
                </Col>
              ))}
          </Row>
          <Link to="/user/projects">More</Link>
        </div>
      </div>
      <div style={{ padding: '24px 48px' }}>
        <Title level={2}>Minecraft</Title>
        <div>
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Lua">
                <p style={{ marginBottom: '20px' }}>ComputerCraft</p>
                <Button type="primary">Run ></Button>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Python">
                <p style={{ marginBottom: '20px' }}>RaspberryJamMod</p>
                <Button type="primary">Run ></Button>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Java">
                <p style={{ marginBottom: '20px' }}>Spigot</p>
                <Button type="primary">Run ></Button>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ projects, user }: TypeRootState) => ({
  projectsList: projects.projectsList,
  user
});
/* eslint-disable */
export default connect(mapStateToProps, {
  getUser: getUserAction,
  getProjects: getProjectsAction
})(UserHome);
