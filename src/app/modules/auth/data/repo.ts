import { IApiClient, apiClient } from "../../../core/apiClient";
import { Failure } from "../../../core/failure";
import { isNullish } from "../../../core/models";
import { ILoginForm } from "./entites";

interface IAuthRepo {
  isLoggedIn: () => Promise<boolean>;
  login: (form: ILoginForm) => Promise<void>;
  logout: () => Promise<void>;
}

export const AUTH_TOKEN = "AUTH_TOKEN";

const AuthRepoImplFactory = (apiClient: IApiClient, localDatasource: Storage): IAuthRepo => {
  const r: IAuthRepo = {
    isLoggedIn: async () => {
      try {
        const token = localDatasource.getItem(AUTH_TOKEN);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return !isNullish(token);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };

        throw failure;
      }
    },
    login: async (loginForm: ILoginForm) => {
      try {
        const res = await apiClient.post("login", loginForm);
        const token = res.data["accessToken"];
        localDatasource.setItem(AUTH_TOKEN, token);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };

        throw failure;
      }
    },
    logout: async () => {
      try {
        localDatasource.removeItem(AUTH_TOKEN);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };

        throw failure;
      }
    },
  };

  return r;
};

export const AuthRepoImpl = AuthRepoImplFactory(apiClient, localStorage);
