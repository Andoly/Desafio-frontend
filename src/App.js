import { Container } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import Form from "./components/Form";

function App() {
  return (
    <Provider store={store}>
    <Header />
      <Container fixed>
        <Form />
      </Container>
    </Provider>
  );
}

export default App;
