import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
// import TableCell from "@material-ui/core/TableCell";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { userRedux } from "../state/state";
import { IUser } from "../../data/entities";
// import { ListTable } from "../../../../components/list_table";
// import { CreateButton } from "../../../../components/create_button";

export const UserListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRedux.actions.getList());
  }, [dispatch]);
  const userListBranch = useSelector<IAppReduxState, IAsyncData<IUser[]>>((state) => state.user.list);

  const deleteUser = async (id: string): Promise<void> => {
    await dispatch(userRedux.actions.delete(id));
    dispatch(userRedux.actions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.user.delete);

  return (
    <div>
      {/* <CreateButton route={ROUTES.user} />

      <ListTable<IUser>
        branch={userListBranch}
        route={ROUTES.user}
        onDelete={deleteUser}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Name</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Maas</TableCell>
          </>
        )}
        renderRow={(user) => (
          <>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.balance} AZN</TableCell>
            <TableCell>{user.salary} AZN</TableCell>
          </>
        )}
      /> */}
    </div>
  );
};
