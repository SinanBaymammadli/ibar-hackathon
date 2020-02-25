import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { UserForm } from "../components/form";
import { IAsyncData } from "../../../../core/models";
import { userRedux } from "../state/state";
import { IUserForm } from "../../data/entities";

export const UserCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IUserForm): Promise<void> => {
    await dispatch(userRedux.actions.create(values));
    history.push(ROUTES.user);
  };

  const createUserBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.user.create);

  return <UserForm branch={createUserBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
