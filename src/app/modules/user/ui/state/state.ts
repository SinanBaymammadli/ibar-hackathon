import { combineReducers } from "redux";
import { generateCrudRedux, ICRUDReduxState } from "../../../../core/redux";
import { IUser, IUserForm } from "../../data/entities";
import { UserRepoImpl } from "../../data/repo";

export const userRedux = generateCrudRedux<IUser, IUserForm>({
  actionTypeName: "User",
  repository: UserRepoImpl,
});

export interface IUserReduxState extends ICRUDReduxState<IUser> {}

export const UserReducers = combineReducers<IUserReduxState>({
  ...userRedux.reducer,
});
