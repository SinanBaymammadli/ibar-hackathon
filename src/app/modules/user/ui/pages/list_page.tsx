import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { IAsyncData } from "../../../../core/models";
import { userRedux } from "../state/state";
import { IUser } from "../../data/entities";
import { Table, Divider, Button } from "antd";
import { isPending } from "../../../../core/redux";
import { Routing } from "../../../../core/routing";
import { ROUTES } from "../../../../routes";

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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Action",
      key: "action",
      // eslint-disable-next-line react/display-name
      render: (user: IUser) => (
        <span>
          <Button type="link" onClick={() => Routing.generateDetailRoute(ROUTES.user, user.id)}>
            View
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => Routing.generateEditRoute(ROUTES.user, user.id)}>
            Edit
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => deleteUser(user.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={userListBranch.data || []}
      loading={isPending(deleteBranch) || isPending(userListBranch)}
    />
  );
};
