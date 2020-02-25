import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserListPage } from "./list_page";
import { UserCreatePage } from "./create_page";
import { UserEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { UserDetailPage } from "./detail_page";

export const UserMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.user} exact>
        <UserListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.user)}>
        <UserCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.user)}>
        <UserEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.user)}>
        <UserDetailPage />
      </Route>
    </Switch>
  );
};
