import React from "react";
import { Provider } from "react-redux";

import AppRouters from "./routefolder/route";
import store from "./redux/store";
import { ErrorMessage } from "./shared/sharedFunctions";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false
    };
  }
  static getDeriveStateFromError(error) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return ErrorMessage();
    }
    return (
      <div>
        <Provider store={store}>
          <main>
            <AppRouters />
          </main>
        </Provider>
      </div>
    );
  }
}

export default App;
