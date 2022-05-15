import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ElectionList from './pages/ElectionList/ElectionList';

const App = () => {

  const { isLogin } = useSelector(state=>state.user)

  return (
    <>
    <Header/>
      <Switch>
        {isLogin?<Route path='/' exact component={ElectionList} />:<Route path='/' exact component={Main} />}
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
    
    </>
  );
}

export default App;