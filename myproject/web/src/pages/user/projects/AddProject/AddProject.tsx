import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import actions from '../../../../store/actions';
import { BaseActionsTypes } from '../../../../store/types';
import './addproject.less';

const { addProjectAction }: BaseActionsTypes = actions;
interface Props extends UserProps {
  saveProject: ({ title }: any) => void;
}
const AddProject: React.FC<Props> = ({ form, saveProject }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        const { title } = values;
        saveProject({ title });
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <>
      <div className="addproject-container">
        <h1>プロジェクトを作る</h1>
        <Form onSubmit={handleSubmit} className="form-box">
          <Form.Item>
            {getFieldDecorator('title', {
              rules: [
                { required: true, message: 'プロジェクトのタイトルはnull禁止' }
              ]
            })(<Input placeholder="タイトル" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form-box-button"
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

const AddProjects = Form.create({ name: 'AddProject' })(AddProject);
const mapStateToProps = () => ({});
export default connect(
  // prettier-ignore
  mapStateToProps,
  { saveProject: addProjectAction }
)(AddProjects);
