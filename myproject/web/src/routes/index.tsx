import React from 'react';
import { Switch } from 'react-router-dom';
// Layouts
import HomeLayoutRoute from '../layouts/HomeLayout/HomeLayout';
import UserLayoutRoute from '../layouts/UserLayout/UserLayout';
import CodingLayoutRoute from '../layouts/CodingLayout/CodingLayout';

// Home Pages
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';

// User Pages
import UserHome from '../pages/user/UserHome/UserHome';
import Projects from '../pages/user/projects';
import Profile from '../pages/user/Profile/Profile';
import AddProject from '../pages/user/projects/AddProject/AddProject';
import ProjectEditor from '../pages/user/projects/ProjectEditor/ProjectEditor';
import ProjectDetail from '../pages/user/projects/ProjectDetail/ProjectDetail';

const routes = (
  <Switch>
    <HomeLayoutRoute exact path="/" component={Home} />
    <HomeLayoutRoute exact path="/sign-up" component={SignUp} />
    <HomeLayoutRoute exact path="/sign-in" component={SignIn} />

    <UserLayoutRoute exact path="/user" component={UserHome} />
    <UserLayoutRoute exact path="/user/projects" component={Projects} />
    <CodingLayoutRoute
      exact
      path="/user/projects/:projectId"
      component={ProjectDetail}
    />
    <CodingLayoutRoute
      exact
      path="/user/projects/:projectId/editor"
      component={ProjectEditor}
    />
    <UserLayoutRoute exact path="/user/project/add" component={AddProject} />
    <UserLayoutRoute exact path="/user/profile" component={Profile} />
  </Switch>
);

export default routes;
