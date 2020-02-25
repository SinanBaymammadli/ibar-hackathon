import React from "react";
import { Row, Col } from "antd";
import { LoginForm } from "../components/loginForm";

export const LoginPage: React.FC = () => {
  return (
    <>
      <Row justify="center">
        <Col sm={24} md={8}>
          <LoginForm />
        </Col>
      </Row>
    </>
  );
};
