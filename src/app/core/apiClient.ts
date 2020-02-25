import axios, { AxiosInstance, AxiosError } from "axios";
import { ROUTES } from "../routes";
import { AuthRepoImpl } from "../modules/auth/data/repo";

export interface IApiClient extends AxiosInstance {}

const currentDomain = window.location.hostname;

const prodDomain = "accountant-web.now.sh";
const devDomain = "accountant-web.sinanbaymammadli.now.sh";

const prodApiUrl = "https://accountant-prd.herokuapp.com/";
const devApiUrl = "https://accountant-dev.herokuapp.com/";
const localApiUrl = "http://localhost:4400/";

function getBaseApiUrl(): string {
  if (currentDomain === prodDomain) {
    return prodApiUrl;
  } else if (currentDomain === devDomain) {
    return devApiUrl;
  }
  return localApiUrl;
}

export const BASE_URL = getBaseApiUrl();

function authInterceptor(error: AxiosError) {
  if (error.response?.status === 401) {
    AuthRepoImpl.logout();
    window.location.href = ROUTES.login;
  } else {
    return Promise.reject(error);
  }
}

export const apiClient: IApiClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use((res) => res, authInterceptor);
