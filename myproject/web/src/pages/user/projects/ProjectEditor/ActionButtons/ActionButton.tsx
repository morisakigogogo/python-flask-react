import React from 'react';
import { Button, Icon, Modal } from 'antd';
import { TypeProjectOne } from '../../../../../store/reducers/project.reducer';
import { TypeUser } from '../../../../../store/reducers/user.reducer';

interface Props {
  user: TypeUser;
  project: TypeProjectOne;
  projectRun: () => void;
}
const ActionButtons: React.FC<Props> = ({ user, project, projectRun }) => {
  const { name } = user;
  const { id } = project;
  const projectURL = `http://localhost:8000/projects/${id}/`;
  const showModal = () => {
    Modal.info({
      title: 'プロジェクトシェア',
      icon: '',
      content: (
        <div>
          　<p>作成者： {name}</p>
          URL
          <div>
            {' '}
            <a href={projectURL} rel="noopener noreferrer" target="_blank">
              {projectURL}
            </a>
          </div>
        </div>
      ),
      okText: 'close',
      onOk() {}
    });
  };
  return (
    <>
      <Button type="primary" style={{ marginRight: '10px' }}>
        Setting
        <Icon type="control" />
      </Button>
      <Button
        type="primary"
        style={{ marginRight: '10px' }}
        onClick={showModal}
      >
        Share
        <Icon type="share-alt" />
      </Button>
      <Button type="primary" style={{ marginRight: '10px' }}>
        Diff
        <Icon type="diff" />
      </Button>
      <Button type="primary" onClick={projectRun}>
        実行
        <Icon type="play-circle" />
      </Button>
    </>
  );
};
export default ActionButtons;
