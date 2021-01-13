import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStylesList = makeStyles({
  root: {
    clipPath: "polygon(0 85%, 100% 27%, 100% 100%, 0% 100%)",
    background:
      "radial-gradient(circle, rgba(108,115,159,1) 30%, rgba(63,81,181,1) 100%)",
    height: "150px",
    width: "100%",
    paddingBottom: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  desc: {
    color: "#fff",
  },
});

const Footer = () => {
  const classList = useStylesList();
  return (
    <div className={classList.root}>
      <div className={classList.desc}>Copyright © 2021 - Andoly</div>
      <div className={classList.desc}>To-do-list usando React + Redux + Material UI</div>
    </div>
  );
};

export default Footer;
