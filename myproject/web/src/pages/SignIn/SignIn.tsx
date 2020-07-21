import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { TypeRootState } from '../../store/reducers';
import { BaseActionsTypes } from '../../store/types';
import './signin.less';

const { requestSigninAction }: BaseActionsTypes = actions;
interface Props extends UserProps {
  rSignIn: ({ email, password }) => void;
}
const SignIn: React.FC<Props> = ({ form, rSignIn }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        const { email, password } = values;
        rSignIn({ email, password });
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <>
      <div className="form-container">
        <div className="left">
          <Link to="/" className="back-to-top">
            <Icon type="arrow-left" /> トップに戻る
          </Link>
          <h1>ログイン</h1>
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
                ログイン
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="right">
          <div className="filter" />
        </div>
      </div>
    </>
  );
};
const SignIns = Form.create({ name: 'signIn' })(SignIn);
const mapStateToProps = ({ user }: TypeRootState) => ({ user });
/* eslint-disable */
export default connect(mapStateToProps, {
  rSignIn: requestSigninAction
})(SignIns);
