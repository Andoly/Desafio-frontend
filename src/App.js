import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
      <Provider store={store}>
        <Header />
        <Main />
      </Provider>
  );
}

export default App;
