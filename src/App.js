import { Switch, Route } from 'react-router-dom';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import { Redirect } from 'react-router-dom';

function App() {
  const authCtr = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtr.isLoggedIn &&
        <Route path='/auth'>
          <AuthPage />
        </Route>
        }
        <Route path='/profile'>
                 {authCtr.isLoggedIn && <UserProfile />}                 
                 {!authCtr.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to ='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
