import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar-top/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import CategoriesView from './components/CategoriesView/CategoriesView';
import PublishPage from './components/PublishPage/PublishPage';

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

        <Route exact path='/publish'>
          <PublishPage />
        </Route>

        <ProtectedRoute exact path='/users' >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute exact path='/users/:userId' >
          <User />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
