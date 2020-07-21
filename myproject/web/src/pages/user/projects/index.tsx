import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader, Button, Modal, Table, Tag } from 'antd';
import './index.less';
import actions from '../../../store/actions';
import { TypeRootState } from '../../../store/reducers';
import {
  TypeProjects,
  TypeProjectList
} from '../../../store/reducers/project.reducer';
import { BaseActionsTypes } from '../../../store/types';

const { getProjectsAction, deleteProjectAction }: BaseActionsTypes = actions;
interface Props extends UserProps {
  getProjects: ({ pageNumber, pageSize }) => void;
  delProject: ({ projectId }) => void;
  projectsList: {
    list: Array<TypeProjectList>;
    pageInfo: {
      pageSize: number;
      total: number;
    };
  };
}

const UserProjects: React.FC<Props> = ({
  getProjects,
  projectsList,
  delProject
}) => {
  // eslint-disable-next-line
  const { list, pageInfo: resPageInfo }: TypeProjects = projectsList;
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 1,
    pageSize: 10
  });
  const { pageNumber, pageSize } = pageInfo;
  useEffect(() => {
    getProjects({ pageNumber, pageSize });
    return () => {};
  }, [getProjects, pageNumber, pageSize]);
  // eslint-disable-next-line
  const onPageHandle = pageNumber => {
    setPageInfo({ ...pageInfo, pageNumber });
    getProjects({ pageNumber, pageSize });
  };
  const delHandel = (projectId: number) => {
    Modal.confirm({
      title: '本当にプロジェクト削除しますか',
      onOk() {
        delProject({ projectId });
      },
      onCancel() {}
    });
  };

  const columns = [
    {
      title: '',
      dataIndex: 'is_released',
      key: 'isReleased',
      width: 70,
      render: isReleased => {
        if (isReleased) {
          return <Tag color="blue">公開</Tag>;
        }
        return <Tag>非公開</Tag>;
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link
          to={{
            pathname: `/user/projects/${record.id}/editor`,
            state: record.id
          }}
        >
          {text}
        </Link>
      )
    },
    {
      title: 'Url',
      key: 'url',
      render: (text, record) => <div>http://localhost/{record.id}/project</div>
    },
    {
      title: 'View',
      key: 'view',
      render: (text, record) => (
        <div>
          <b>132</b>
          view
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          onClick={() => {
            delHandel(record.id);
          }}
          type="link"
        >
          削除
        </Button>
      )
    }
  ];

  return (
    <>
      <PageHeader
        onBack={() => null}
        title="Projects"
        subTitle="This is a subtitle"
      />
      <div style={{ padding: '0 60px' }}>
        <Link to="project/add">プロジェクトを作る</Link>
      </div>
      <div className="project-list">
        <Table columns={columns} dataSource={list} />
      </div>
    </>
  );
};

const mapStateToProps = ({ projects }: TypeRootState) => ({
  projectsList: projects.projectsList
});
/* eslint-disable */
export default connect(mapStateToProps, {
  getProjects: getProjectsAction,
  delProject: deleteProjectAction
})(UserProjects);
