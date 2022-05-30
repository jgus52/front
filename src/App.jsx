import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import ScrollToTop from "./components/ScrollToTop";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Voteinfo from "./pages/Voteinfo/Voteinfo";
import VoteNew from "./pages/VoteNew/VoteNew";
import Vote from "./pages/Vote/Vote";
import VoteVerification from "./pages/VoteVerification/VoteVerification";

const App = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/voteinfo/:id" exact component={Voteinfo} />
        <Route path="/votenew" exact component={VoteNew} />
        <Route path="/vote/:id" exact component={Vote} />
        <Route path="/voteverification/" exact component={VoteVerification} />
      </Switch>
    </>
  );
};

export default App;
