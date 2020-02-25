import { IApiClient, apiClient } from "../../../core/apiClient";
import { ICRUDRepo } from "../../../core/models";
import { IUser, IUserForm, userFromJson, userToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";

interface IUserRepo extends ICRUDRepo<IUser, IUserForm> {}

const URL = "v1/user";

const UserRepoImplFactory = (apiClient: IApiClient): IUserRepo => {
  const r: IUserRepo = {
    ...generateCrudRepoFactory<IUser, IUserForm>(apiClient, URL, userFromJson, userToJson),
  };

  return r;
};

export const UserRepoImpl = UserRepoImplFactory(apiClient);
