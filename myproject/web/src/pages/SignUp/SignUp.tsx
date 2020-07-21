import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { BaseActionsTypes } from '../../store/types';
import './signup.less';

const { requestSignupAction }: BaseActionsTypes = actions;
interface Props extends UserProps {
  rSignUp: ({ email, password }) => void;
}
const SignUp: React.FC<Props> = ({ form, rSignUp }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        const { email, password } = values;
        rSignUp({ email, password });
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <>
      <h2>会員登録</h2>
      <div className="form-container">
        <Form onSubmit={handleSubmit} className="form-box">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="メールアドレス"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="パスワード"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form-box-button"
            >
              {' '}
              登録{' '}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
const SignUps = Form.create({ name: 'signUp' })(SignUp);
/* eslint-disable */
export default connect(null, {
  rSignUp: requestSignupAction
})(SignUps);
