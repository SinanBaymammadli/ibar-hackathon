import React from "react";
import { Field, FieldProps } from "formik";
import { Input, Form } from "antd";
import { InputProps } from "antd/es/input";

interface IProps extends InputProps {
  label: string;
  name: string;
  validate?: (value: string) => any;
}

export const PasswordInput: React.FC<IProps> = ({ label, name, onChange, onBlur, validate, ...rest }: IProps) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps): JSX.Element => {
        return (
          <Form.Item
            name={name}
            label={label}
            validateStatus={Boolean(meta.touched && meta.error) ? "error" : ""}
            help={meta.touched && meta.error}
          >
            <Input.Password
              name={name}
              value={meta.value}
              placeholder={label}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              onBlur={(e) => {
                field.onBlur(e);
                onBlur && onBlur(e);
              }}
              {...rest}
            />
          </Form.Item>
        );
      }}
    </Field>
  );
};
