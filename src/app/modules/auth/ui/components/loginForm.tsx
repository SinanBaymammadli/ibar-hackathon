import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { IAsyncData } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { authRedux } from "../state/state";
import { ErrorPanel } from "../../../../components/errorPanel";

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const loginBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.auth.login);
  const loading = isPending(loginBranch);

  async function onLogin(form: any) {
    await dispatch(authRedux.actions.login(form));
    dispatch(authRedux.actions.checkAuth());
  }

  return (
    <Card>
      <Typography.Title>Hackathon</Typography.Title>

      <ErrorPanel branch={loginBranch} />

      <Form onFinish={onLogin}>
        <Form.Item name="email" validateStatus="error">
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
