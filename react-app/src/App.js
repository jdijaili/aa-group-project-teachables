import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar-top/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Home from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import CategoriesView from './components/CategoriesView/CategoriesView';
import ProjectView from './components/ProjectView/ProjectView';
import PublishPage from './components/PublishPage/PublishPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import EditPage from './components/EditPage/EditPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate())
    .then(() => setLoaded(true))
    }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
        <Route exact path='/sign-up'>
          <SignUpForm />
        </Route>
        <Route exact path='/' >
          <Home />
        </Route>

        <Route exact path='/categories/:categoryId'>
          <CategoriesView />
        </Route>

        <Route path='/projects/:projectId' exact={true}>
          <ProjectView />
        </Route>

        <ProtectedRoute path='/publish' exact={true}>
          <PublishPage />
        </ProtectedRoute>

        <Route path='/projects/:projectId/edit' exact={true}>
          <EditPage />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute exact path='/users/:userId' >
          <User />
        </ProtectedRoute>

        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
