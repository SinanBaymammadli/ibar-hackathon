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
          <Form.Item label={label}>
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
              // size="small"
              // label={label}
              // fullWidth
              // variant="filled"
              // margin="normal"
              // error={Boolean(meta.touched && meta.error)}
              // helperText={meta.touched && meta.error}
              {...rest}
            />
          </Form.Item>
        );
      }}
    </Field>
  );
};
