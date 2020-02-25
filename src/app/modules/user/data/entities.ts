import * as Yup from "yup";
import { IBasicEntity, basicEntityFromJson } from "../../../core/models";

export enum EUserType {
  BUYER = "BUYER",
  SELLER = "SELLER",
  WORKER = "WORKER",
}

export interface IUserType {
  id: string;
  label: string;
}

export const userTypeOptions = Object.entries(EUserType).map<IUserType>((item) => {
  const [key, value] = item;
  return {
    id: key,
    label: value,
  };
});

interface IUserBase {
  name: string;
  balance: number;
  salary: number;
  info: string;
  type: EUserType;
}

export interface IUser extends IUserBase, IBasicEntity {}

export interface IUserForm extends IUserBase {}

const userCommonValidation = {
  name: Yup.string().required(),
  info: Yup.string(),
  balance: Yup.number().required(),
  salary: Yup.number(),
  type: Yup.mixed()
    .oneOf(Object.values(EUserType))
    .required(),
};

export const userFormValidation = Yup.object<IUserForm>({
  ...userCommonValidation,
});

export const userEditFormValidation = Yup.object<IUserForm>({
  ...userCommonValidation,
});

export const userFromJson = (json: any): IUser => {
  const e: IUser = {
    ...basicEntityFromJson(json),
    name: json.name?.toString(),
    balance: parseInt(json.balance, 10),
    salary: parseInt(json.salary ?? 0, 10),
    info: json.info?.toString(),
    type: json.type?.toString(),
  };

  return e;
};

export const userToJson = (form: IUserForm) => {
  return {
    name: form.name.toString(),
    balance: parseInt(form.balance.toString(), 10),
    salary: parseInt(form.salary.toString(), 10),
    info: form.info.toString(),
    type: form.type.toString(),
  };
};
