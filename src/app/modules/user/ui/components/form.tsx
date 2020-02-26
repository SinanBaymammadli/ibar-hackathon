import React from "react";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { userFormValidation, IUserForm } from "../../data/entities";
import { Row, Col, Button } from "antd";
import { Form } from "../../../../components/form";
import { TextInput } from "../../../../components/textInput";

interface IProps extends IFormProps<IUserForm> {}

export const UserForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <>
      <Row justify="center">
        <Col sm={24} md={8}>
          <Form<any>
            {...props}
            initialValues={{
              name: "",
            }}
            validationSchema={userFormValidation}
          >
            {() => (
              <>
                <TextInput label="Name" name="name" />

                <Button type="primary" htmlType="submit" loading={loading}>
                  {submitTitle}
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};
