import React from "react";
import AppRouters from "./routefile/route";
import { Provider } from "react-redux";
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
