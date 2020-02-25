import React from "react";
import { IAsyncData } from "../core/models";
import { isError } from "../core/redux";
import { Alert } from "antd";

interface IProps {
  branch: IAsyncData<any>;
}

export const ErrorPanel: React.FC<IProps> = ({ branch }: IProps) => {
  if (isError(branch)) {
    return <Alert message={branch.error?.message} type="error" />;
  }

  return null;
};
