import * as Yup from "yup";
import { IBasicEntity, basicEntityFromJson } from "../../../core/models";

interface IUserBase {
  name: string;
}

export interface IUser extends IUserBase, IBasicEntity {}

export interface IUserForm extends IUserBase {}

const userCommonValidation = {
  name: Yup.string().required(),
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
  };

  return e;
};

export const userToJson = (form: IUserForm) => {
  return {
    name: form.name.toString(),
  };
};
