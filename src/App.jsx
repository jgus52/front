import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = () => {
  return (
    <>
    <Header/>
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
    
    </>
  );
}

export default App;