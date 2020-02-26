import * as Yup from "yup";
import { IBasicEntity, basicEntityFromJson } from "../../../core/models";

interface IUserBase {
  username: string;
  phone: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  filePath?: string;
}

export interface IUser extends IUserBase, IBasicEntity {}

export interface IUserForm extends IUserBase {}

const userCommonValidation = {
  username: Yup.string().required(),
  phone: Yup.string(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  firstName: Yup.string(),
  lastName: Yup.string(),
  companyName: Yup.string().required(),
  filePath: Yup.string(),
};

export const userFormValidation = Yup.object<IUserForm>({
  ...userCommonValidation,
});

export const userEditFormValidation = Yup.object<IUserForm>({
  ...userCommonValidation,
});

export const userFromJson = (json: any): IUser => {
  return {
    ...basicEntityFromJson(json),
    username: json.username?.toString(),
    phone: json.phone?.toString(),
    email: json.email?.toString(),
    password: json.password?.toString(),
    firstName: json.firstName?.toString(),
    lastName: json.lastName?.toString(),
    companyName: json.companyName?.toString(),
    filePath: json.filePath?.toString(),
  };
};

export const userToJson = (form: IUserForm) => {
  return {
    username: form.username?.toString(),
    phone: form.phone?.toString(),
    email: form.email?.toString(),
    password: form.password?.toString(),
    firstName: form.firstName?.toString(),
    lastName: form.lastName?.toString(),
    companyName: form.companyName?.toString(),
    filePath: form.filePath?.toString(),
  };
};
