import React, { useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import actions from '../../../store/actions';
import { TypeRootState } from '../../../store/reducers';
import { TypeUser } from '../../../store/reducers/user.reducer';
import { BaseActionsTypes } from '../../../store/types';
import './profile.less';

const { editUserinfoAction, getUserAction }: BaseActionsTypes = actions;
interface Props extends UserProps {
  getUser: () => void;
  editUserinfo: ({ name, id }) => void;
  user: TypeUser;
}
const Profile: React.FC<Props> = ({ form, getUser, user, editUserinfo }) => {
  useEffect(() => {
    getUser();
    return () => {};
  }, [getUser]);
  const { id, name }: TypeUser = user;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        const { name } = values;
        editUserinfo({ name, id });
      }
    });
  };
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };
  const { getFieldDecorator } = form;
  return (
    <>
      <div className="profile-container">
        <h1>プロフィール</h1>
        <Form onSubmit={handleSubmit} className="form-box">
          <Form.Item {...formItemLayout} label="氏名">
            {getFieldDecorator('name', {
              initialValue: `${name || ''}`
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="氏名"
              />
            )}
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

const Profiles = Form.create({ name: 'profile' })(Profile);
const mapStateToProps = ({ user }: TypeRootState) => ({ user });
export default connect(
  // prettier-ignore
  mapStateToProps,
  {
    getUser: getUserAction,
    editUserinfo: editUserinfoAction
  }
)(Profiles);
