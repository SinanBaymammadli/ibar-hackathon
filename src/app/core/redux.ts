import { IAsyncData, EProcessStatus, Maybe, IError, ICRUDRepo, IId } from "./models";
import { Reducer } from "redux";

export function generateErrorActionTypeName(actionTypeName: string | symbol): string {
  return actionTypeName.toString() + "_ERROR";
}
export function generateInitialActionTypeName(actionTypeName: string | symbol): string {
  return actionTypeName.toString() + "_INITIAL";
}
export function generatePendingActionTypeName(actionTypeName: string | symbol): string {
  return actionTypeName.toString() + "_PENDING";
}
export function generateSuccessActionTypeName(actionTypeName: string | symbol): string {
  return actionTypeName.toString() + "_SUCCESS";
}

export function getInitialAsyncData<T>(initialData: Maybe<T> = null): IAsyncData<T> {
  return {
    data: initialData,
    error: null,
    status: EProcessStatus.IDLE,
  };
}

export interface IReduxAction<P, M = {}> {
  payload: P;
  type: string;
  meta?: M;
}

export interface IAsyncReduxAction<T, M = {}> extends IReduxAction<Promise<T>, M & { timestamp?: number }> {}
export interface IAsyncWithConfirmationReduxAction<T, M = {}>
  extends IReduxAction<() => Promise<T>, M & { timestamp?: number }> {}

export function asyncItemReducerGenerator<T>(actionType: string): Reducer<IAsyncData<T>, IAsyncReduxAction<T>> {
  return (state: IAsyncData<T> = getInitialAsyncData<T>(), action: IAsyncReduxAction<T>): IAsyncData<T> => {
    switch (action.type) {
      case generatePendingActionTypeName(actionType):
        return {
          ...state,
          // data: null, //TODO think about this
          status: EProcessStatus.PENDING,
          timestamp: action.meta && action.meta.timestamp,
        };
      case generateSuccessActionTypeName(actionType): {
        const raceConditionIssueEncountered = action.meta && state.timestamp !== action.meta.timestamp;

        if (raceConditionIssueEncountered) {
          return state;
        }

        return {
          ...state,
          data: ((action as unknown) as IReduxAction<T>).payload,
          error: null,
          status: EProcessStatus.SUCCESS,
        };
      }
      case generateErrorActionTypeName(actionType): {
        const raceConditionIssueEncountered = action.meta && state.timestamp !== action.meta.timestamp;

        if (raceConditionIssueEncountered) {
          return state;
        }

        return {
          ...state,
          data: null,
          error: ((action as unknown) as IReduxAction<IError>).payload,
          status: EProcessStatus.ERROR,
        };
      }
      case generateInitialActionTypeName(actionType):
        return {
          ...getInitialAsyncData(),
          timestamp: +new Date(),
        };
      default:
        return state;
    }
  };
}

export const isInitial = (data: IAsyncData<any>) => data.status === EProcessStatus.IDLE;

export const isLoading = (data: IAsyncData<any>) =>
  data.status === EProcessStatus.PENDING || data.status === EProcessStatus.IDLE;

export const isPending = (data: IAsyncData<any>) => data.status === EProcessStatus.PENDING;

export const isSuccess = (data: IAsyncData<any>) => data.status === EProcessStatus.SUCCESS;

export const isError = (data: IAsyncData<any>) => data.status === EProcessStatus.ERROR;

export const isInitialLoading = (data: IAsyncData<any>) => isLoading(data) && data.data === null;

export const isInitialPending = (data: IAsyncData<any>) => isPending(data) && data.data === null;

export interface IConfirmation {
  title: string;
  message: string;
}

export interface IActionWithConfirmationMeta {
  confirmation: IConfirmation;
}

// export interface IBulkForm<T> {
//   bulk: T[];
// }

export interface ICRUDReduxState<T> {
  list: IAsyncData<T[]>;
  details: IAsyncData<T>;
  create: IAsyncData<IId>;
  createBulk: IAsyncData<void>;
  edit: IAsyncData<void>;
  delete: IAsyncData<void>;
}

export interface ICRUDReducers<T> {
  list: Reducer<IAsyncData<T[]>, IAsyncReduxAction<T[], {}>>;
  details: Reducer<IAsyncData<T>, IAsyncReduxAction<T>>;
  create: Reducer<IAsyncData<IId>, IAsyncReduxAction<IId>>;
  createBulk: Reducer<IAsyncData<void>, IAsyncReduxAction<void>>;
  edit: Reducer<IAsyncData<void>, IAsyncReduxAction<void>>;
  delete: Reducer<IAsyncData<void>, IAsyncReduxAction<void>>;
}

export function generateCrudReducers<T>(actions: ICRUDActionTypes): ICRUDReducers<T> {
  return {
    list: asyncItemReducerGenerator<T[]>(actions.list),
    details: asyncItemReducerGenerator<T>(actions.detail),
    create: asyncItemReducerGenerator<IId>(actions.create),
    createBulk: asyncItemReducerGenerator<void>(actions.createBulk),
    edit: asyncItemReducerGenerator<void>(actions.edit),
    delete: asyncItemReducerGenerator<void>(actions.delete),
  };
}

interface IReduxCrud<TEntity, TForm> {
  actions: {
    getList: (searchQuery?: string) => IAsyncReduxAction<TEntity[]>;
    getDetail: (id: string) => IAsyncReduxAction<TEntity>;
    create: (form: TForm) => IAsyncReduxAction<IId>;
    createBulk: (forms: TForm) => IAsyncReduxAction<void>;
    edit: (id: string, form: TForm) => IAsyncReduxAction<void>;
    delete: (id: string) => IAsyncWithConfirmationReduxAction<void, IActionWithConfirmationMeta>;
  };
  reducer: ICRUDReducers<TEntity>;
}

interface ICRUDActionTypes {
  list: string;
  detail: string;
  create: string;
  createBulk: string;
  edit: string;
  delete: string;
}

function generateCrudActionTypes(actionTypeName: string): ICRUDActionTypes {
  return {
    list: `GET_${actionTypeName}_LIST`,
    detail: `GET_${actionTypeName}_DETAIL`,
    create: `CREATE_${actionTypeName}`,
    createBulk: `CREATE_BULK_${actionTypeName}`,
    edit: `EDIT_${actionTypeName}`,
    delete: `DELETE_${actionTypeName}`,
  };
}

export function generateCrudRedux<TEntity, TForm>({
  actionTypeName,
  repository,
}: {
  actionTypeName: string;
  repository: ICRUDRepo<TEntity, TForm>;
}): IReduxCrud<TEntity, TForm> {
  const actionsTypes = generateCrudActionTypes(actionTypeName);

  const actionCreators = {
    getList: (searchQuery?: string): IAsyncReduxAction<TEntity[]> => ({
      type: actionsTypes.list,
      payload: repository.getList(searchQuery),
    }),
    getDetail: (id: string): IAsyncReduxAction<TEntity> => ({
      type: actionsTypes.detail,
      payload: repository.getDetails(id),
    }),
    create: (form: TForm): IAsyncReduxAction<IId> => ({
      type: actionsTypes.create,
      payload: repository.create(form),
    }),
    createBulk: (forms: TForm): IAsyncReduxAction<void> => ({
      type: actionsTypes.createBulk,
      payload: repository.createBulk(forms),
    }),
    edit: (id: string, form: TForm): IAsyncReduxAction<void> => ({
      type: actionsTypes.edit,
      payload: repository.edit(id, form),
    }),
    delete: (id: string): IAsyncWithConfirmationReduxAction<void, IActionWithConfirmationMeta> => ({
      type: actionsTypes.delete,
      payload: (): Promise<void> => repository.delete(id),
      meta: {
        confirmation: {
          title: "Are you sure you want to delete this item?",
          message: "Are you sure?",
        },
      },
    }),
  };

  const reducer = generateCrudReducers<TEntity>(actionsTypes);

  return {
    actions: actionCreators,
    reducer,
  };
}
