import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { userRedux } from "../state/state";
import { IUser } from "../../data/entities";
import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";

export const UserDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(userRedux.actions.getDetail(id));
  }, [dispatch, id]);
  const userDetailBranch = useSelector<IAppReduxState, IAsyncData<IUser>>((state) => state.user.details);

  const deleteUser = async (id: string): Promise<void> => {
    await dispatch(userRedux.actions.delete(id));
    history.push(ROUTES.user);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.user.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable branch={userDetailBranch} route={ROUTES.user} onDelete={deleteUser} deleteBranch={deleteBranch}>
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>{userDetailBranch.data?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>balance</TableCell>
                <TableCell>{userDetailBranch.data?.balance} AZN</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Maas</TableCell>
                <TableCell>{userDetailBranch.data?.salary}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Info</TableCell>
                <TableCell>{userDetailBranch.data?.info}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{userDetailBranch.data?.type}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
