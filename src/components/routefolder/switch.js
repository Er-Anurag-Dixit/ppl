import React from "react";
import { Route, Switch } from "react-router-dom";
import SinglePost from "../../screens/singlepost";
import Timeline from "../../screens/timeline";
import LoginComponent from "../login/login";
import Signup from "../signup/Signup";

export default function SwitchComponent() {
  return (
    <Switch>
      <Route path="/login" component={LoginComponent} />
      <Route path="/signup" component={Signup} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/singlepost/:id" component={SinglePost} />
      <Route exact path="*" component={LoginComponent} />
    </Switch>
  );
}
