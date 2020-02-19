import { ServerUrl } from "../config";
import React from "react";
import Axios from "axios";
const serverCall = (route, data = null) => Axios.post(ServerUrl + route, data);

export const ErrorMessage = () => {
  return (
    <div>
      <h1 style={{ padding: "200px 450px", color: "#f47b13" }}>
        404 | Something went wrong
      </h1>
    </div>
  );
};

export default serverCall;
