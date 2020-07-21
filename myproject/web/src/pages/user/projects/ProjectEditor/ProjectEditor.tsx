import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Layout, Tabs, Modal, Form, Input } from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { RouteComponentProps } from 'react-router';
import { Helmet } from 'react-helmet';
import ActionButtons from './ActionButtons/ActionButton';
import AssetBlock from './AssetBlock/AssetBlock';
import ConsoleBlock from './ConsoleBlock/ConsoleBlock';
import actions from '../../../../store/actions';
import { TypeRootState } from '../../../../store/reducers';
import {
  TypeProjectOne,
  TypeProjectAssets
} from '../../../../store/reducers/project.reducer';
import { TypeUser } from '../../../../store/reducers/user.reducer';
import { BaseActionsTypes } from '../../../../store/types';
import './project-editor.less';
const { Content } = Layout;
const { TabPane } = Tabs;
const {
  getProjectAction,
  editProjectAction,
  updateProjecttitleAction,
  getUserAction,
  getProjectassetsAction,
  getProjectfilesAction,
  runProjectAction,
  resetProjectfilesAction
}: BaseActionsTypes = actions;
interface Props extends UserProps {
  getUser: () => void;
  getProject: (projectId) => void;
  editProject: ({ title, id }) => void;
  getProjectFiles: ({ projectId }) => void;
  runProject: ({ fileType, source, id }) => void;
  updateProjectTitle: ({ title }) => void;
  getProjectAssets: (projectId) => void;
  resetProjectfiles: () => void;
  project: TypeProjectOne;
  user: TypeUser;
  projectAssets: Array<TypeProjectAssets>;
  reviewUrl: string;
  main: string;
  index: string;
  style: string;
}
interface IParams {}
type RouteProps = RouteComponentProps<IParams>;
type IProps = Props & RouteProps;

const ProjectEditor: React.FC<IProps> = ({
  getProject,
  getUser,
  getProjectAssets,
  project,
  location,
  form,
  editProject,
  getProjectFiles,
  resetProjectfiles,
  runProject,
  updateProjectTitle,
  user,
  projectAssets,
  reviewUrl,
  main,
  index,
  style
}) => {
  const { id, title }: TypeProjectOne = project;
  const [isShow, setIsShow] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [source, setSource] = useState({ 1: main, 2: index, 3: style });
  const [fileType, setFiletype] = useState(1);
  const { getFieldDecorator, setFieldsValue } = form;
  useEffect(() => {
    getUser();
    getProject({ projectId: location.state });
    getProjectAssets({ projectId: location.state });
    getProjectFiles({ projectId: location.state });
    return () => {
      resetProjectfiles();
    };
  }, [
    getProject,
    getProjectAssets,
    getProjectFiles,
    getUser,
    location.state,
    resetProjectfiles
  ]);
  useEffect(() => {
    setSource({ 1: main, 2: index, 3: style });
  }, [index, main, resetProjectfiles, style]);
  const showModal = () => {
    setIsShow(true);
    setFieldsValue({ title });
  };
  const handleOk = e => {
    e.preventDefault();
    let projectInfo;
    form.validateFields((err: any, values: any) => {
      if (!err) {
        const { title } = values;
        projectInfo = values;
        setConfirmLoading(true);
        setTimeout(() => {
          setConfirmLoading(false);
          editProject({ title, id });
          setIsShow(false);
          updateProjectTitle({ title: projectInfo.title });
        }, 500);
      }
    });
  };
  const handleCancel = e => {
    setIsShow(false);
  };
  const handleEditorOnChange = (newValue, e) => {
    setSource({ ...source, [fileType]: newValue });
  };
  const editTabOnChange = key => {
    key = Number(key);
    setFiletype(key);
    if (key === 1) {
      setSource({ ...source, [key]: main });
    } else if (key === 2) {
      setSource({ ...source, [key]: index });
    } else {
      setSource({ ...source, [key]: style });
    }
  };
  const projectRun = () => {
    runProject({ fileType, source, id });
  };
  const options = {
    selectOnLineNumbers: true
  };

  return (
    <Layout style={{ flexDirection: 'column' }}>
      <Helmet title={title}></Helmet>
      <Modal
        title="プロジェクト編集"
        visible={isShow}
        okText="編集"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form onSubmit={handleOk}>
          <Form.Item>
            {getFieldDecorator('title', {
              initialValue: `${title || ''}`
            })(<Input placeholder="プロジェクトタイトル" />)}
          </Form.Item>
        </Form>
      </Modal>
      <Content
        style={{
          boxSizing: 'border-box',
          padding: '10px 10px',
          textAlign: 'right',
          background: '#fff',
          borderBottom: 'solid 1px #001529'
        }}
      >
        <div style={{ float: 'left', cursor: 'pointer' }} onClick={showModal}>
          {title}
          <Icon type="edit" />
        </div>
        <ActionButtons user={user} project={project} projectRun={projectRun} />
      </Content>
      <Content>
        <Layout style={{ flexDirection: 'row' }}>
          <Content style={{ flex: 1 }}>
            <Tabs className="files-tab" onChange={editTabOnChange}>
              <TabPane tab="main.js" key="1" />
              <TabPane tab="index.html" key="2" />
              <TabPane tab="style.css" key="3" />
            </Tabs>
            <MonacoEditor
              height="calc(100vh - 64px - 77px)"
              options={options}
              language="javascript"
              value={source[fileType]}
              onChange={handleEditorOnChange}
            />
          </Content>
          {/* <div>{style}</div>
          <div>{source[fileType]}</div> */}
          <Content style={{ flex: 1 }}>
            <div>
              <Tabs>
                <TabPane
                  tab={
                    <span>
                      <Icon type="file-text" />
                      プレビュー
                    </span>
                  }
                  key="1"
                >
                  <div style={{ padding: '0 20px 20px 20px' }}>
                    <iframe
                      src={reviewUrl}
                      style={{
                        width: '100%',
                        height: '600px',
                        border: 'none'
                      }}
                      title={title}
                    />
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="file-text" />
                      資料
                    </span>
                  }
                  key="2"
                >
                  <div style={{ padding: '0 20px 20px 20px' }}>資料</div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="file-text" />
                      アセット
                    </span>
                  }
                  key="3"
                >
                  <div style={{ padding: '0 20px 20px 20px' }}>
                    <AssetBlock
                      getProjectAssets={getProjectAssets}
                      id={id}
                      projectAssets={projectAssets}
                    />
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="file-text" />
                      コンソール
                    </span>
                  }
                  key="4"
                >
                  <div style={{ padding: '0 20px 20px 20px' }}>
                    <ConsoleBlock />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
const ProjectEditorWrap = Form.create({ name: 'profile edit' })(ProjectEditor);
const mapStateToProps = ({ projects, user }: TypeRootState) => ({
  project: projects.project,
  projectAssets: projects.projectAssets,
  reviewUrl: projects.reviewUrl,
  main: projects.main,
  index: projects.index,
  style: projects.style,
  user
});
/* eslint-disable */
export default connect(mapStateToProps, {
  getUser: getUserAction,
  getProject: getProjectAction,
  editProject: editProjectAction,
  getProjectFiles: getProjectfilesAction,
  resetProjectfiles: resetProjectfilesAction,
  runProject: runProjectAction,
  updateProjectTitle: updateProjecttitleAction,
  getProjectAssets: getProjectassetsAction
})(ProjectEditorWrap);
