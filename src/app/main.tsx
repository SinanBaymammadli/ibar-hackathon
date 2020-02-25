import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { Layout } from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "./redux/store";
import { IAsyncData } from "./core/models";
import { authRedux } from "./modules/auth/ui/state/state";
import { isLoading } from "./core/redux";
import { LoginPage } from "./modules/auth/ui/pages/login_page";
import { UserMainPage } from "./modules/user/ui/pages/main_page";

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRedux.actions.checkAuth());
  }, [dispatch]);

  const isLoggedInBranch = useSelector<IAppReduxState, IAsyncData<boolean>>((state) => state.auth.isLoggedIn);
  const loading = isLoading(isLoggedInBranch);

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : isLoggedInBranch.data ? (
        <Layout>
          <Switch>
            <Route path={ROUTES.user}>
              <UserMainPage />
            </Route>

            <Route path="*">
              <Redirect to={ROUTES.user} />
            </Route>
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path={ROUTES.login}>
            <LoginPage />
          </Route>
          <Route path="*">
            <Redirect to={ROUTES.login} />
          </Route>
        </Switch>
      )}
    </div>
  );
};
