import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { userRedux } from "../state/state";
import { IUser } from "../../data/entities";
// import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Row, Col } from "antd";
// import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";

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
    <>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
    </>
  );
};
