import React from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { IFormProps, isAsyncData } from "../core/models";
import { isPending } from "../core/redux";
import { ErrorPanel } from "./errorPanel";
import { Spin, Card, Form as AntForm } from "antd";

interface IProps<T> extends IFormProps<T> {
  initialValues: T;
  validationSchema: Yup.Schema<T>;
  children?: (props: FormikProps<T>) => React.ReactNode;
}

export function Form<T>({ initialData, onSubmit, branch, initialValues, validationSchema, children }: IProps<T>) {
  const initialLoading = isAsyncData(initialData) ? isPending(initialData) : false;
  const loadedInitialValues = isAsyncData(initialData) ? initialData.data : initialData;

  return (
    <Spin spinning={initialLoading}>
      <Card>
        <ErrorPanel branch={branch} />

        <Formik<T>
          initialValues={loadedInitialValues ?? initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(props) => <AntForm onFinish={props.submitForm}>{children?.(props)}</AntForm>}
        </Formik>
      </Card>
    </Spin>
  );
}
