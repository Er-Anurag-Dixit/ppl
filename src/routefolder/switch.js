import React from "react";
import { Route, Switch } from "react-router-dom";
import SinglePost from "../singlepost/singlepost";
import Timeline from "../timeline/timeline";
import LoginComponent from "../login/login";
import Signup from "../signup/Signup";
import Errorpage from "../errorfile/errorpage";

export default function SwitchComponent() {
  return (
    <Switch>
      <Route path="/login" component={LoginComponent} />
      <Route path="/signup" component={Signup} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/singlepost/:id" component={SinglePost} />
      <Route path="/errorpage" component={Errorpage} />
      <Route exact path="*" component={LoginComponent} />
    </Switch>
  );
}
