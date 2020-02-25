import React from "react";
import { Form, Button, Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { IAsyncData } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { authRedux } from "../state/state";
import { ErrorPanel } from "../../../../components/errorPanel";
import { ILoginForm, loginFormValidation } from "../../data/entites";
import { Formik } from "formik";
import { TextInput } from "../../../../components/textInput";
import { PasswordInput } from "../../../../components/passwordInput";

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const loginBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.auth.login);
  const loading = isPending(loginBranch);

  async function onLogin(form: ILoginForm) {
    await dispatch(authRedux.actions.login(form));
    dispatch(authRedux.actions.checkAuth());
  }

  return (
    <Card>
      <Typography.Title>Hackathon</Typography.Title>

      <ErrorPanel branch={loginBranch} />

      <Formik<ILoginForm>
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginFormValidation}
        onSubmit={onLogin}
      >
        {({ submitForm }) => (
          <Form onFinish={submitForm} layout="vertical">
            <TextInput label="Email" name="email" type="email" />

            <PasswordInput label="Password" name="password" />

            <Button type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
