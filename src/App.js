import React from "react";
import { Provider } from "react-redux";

import AppRouters from "./routefolder/route";
import store from "./redux/store";

class App extends React.Component {
  render() {
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
