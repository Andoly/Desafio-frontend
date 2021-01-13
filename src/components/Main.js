import React from "react";
import Form from "./Form";
import Footer from "./Footer";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  footer: {
    position: "relative",
  },
  main: {
    minHeight: "80vh",
    zIndex: 5,
    position: "relative",
  },
});
const Main = () => {
  const classForm = useStyles();
  return (
    <>
      <div className={classForm.main}>
        <Container>
          <Form />
        </Container>
      </div>
      <div className={classForm.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Main;
