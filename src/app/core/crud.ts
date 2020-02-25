import { ApiClient } from "./apiClient";
import { ICRUDRepo } from "./models";
import { Failure } from "./failure";

export function generateCrudRepoFactory<T, TForm>(
  apiClient: ApiClient,
  url: string,
  fromJson: (json: any) => T,
  toJson: (form: TForm) => any,
): ICRUDRepo<T, TForm> {
  const r: ICRUDRepo<T, TForm> = {
    getList: async (searchQuery) => {
      try {
        const sq = searchQuery || `?sort=id,DESC`;
        const res = await apiClient.get(`/${url}${sq}`);
        return res.data.map(fromJson);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    getDetails: async (id: string) => {
      try {
        const res = await apiClient.get(`/${url}/${id}`);
        return fromJson(res.data);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    create: async (form) => {
      try {
        const res = await apiClient.post(`/${url}`, toJson(form));
        return { id: res.data.id };
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    createBulk: async (form) => {
      try {
        await apiClient.post(`/${url}/bulk`, toJson(form));
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    edit: async (id, form) => {
      try {
        await apiClient.put(`/${url}/${id}`, toJson(form));
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    delete: async (id) => {
      try {
        await apiClient.delete(`/${url}/${id}`);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
  };

  return r;
}
