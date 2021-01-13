import React, { useState, useCallback } from "react";
import List from "@material-ui/core/List";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

const useStylesList = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 1,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 42,
    padding: "10px",
    marginBottom: "8px",
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  useStylesButton: {
    display: "flex",
    justifyContent: "space-between",
    width: "150px",
    position: "relative",
    zIndex: 10
  },
  useStyleMode: {
    display: "inline-flex",
    alignItems: "center",
    color: "white",

  },
  ul: {
    listStyleType: "none",
  },
  span: {
    color: "#695A50",
    paddingRight: "5px"
  }
});

const Task = ({
  task,
  id,
  favorite,
  onfavoriteTask,
  onUpdateTask,
  onRemoveTask,
}) => {
  const classList = useStylesList();
  const favoriteTaskHandler = useCallback(() => onfavoriteTask(id), [
    id,
    onfavoriteTask,
  ]);

  const [value, setValue] = useState(task)
  const [editMode, setEditMode] = useState(false);


  const updateTaskHandler = (e) => {
    if (e.key === "Enter") {
      onUpdateTask(id, value);
      setEditMode(false)
    }
  };
  const removeTodoHandler = useCallback(() => onRemoveTask(id), [
    id,
    onRemoveTask,
  ]);

  return (
    <li key={id} className={classList.ul}>
      <List className={classList.root}>
        <div className={classList.useStyleMode}>
          <span className={classList.span}>Task: </span> {" "}
          {!editMode ? (
            task
          ) : (
            <TextField
              onKeyDown={updateTaskHandler}
              style={{ marginLeft: "20px" }}
              value={value}
              margin="dense"
              id="standard-basic"
              label="Edit task"
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </div>
        <div className={classList.useStylesButton}>
          <Fab
            type="button"
            size="small"
            aria-label="favorite"
            onClick={favoriteTaskHandler}
          >
            {favorite ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </Fab>
          <Fab
            type="button"
            color="default"
            size="small"
            aria-label="edit"
            onClick={() => setEditMode(!editMode)}
          >
            <EditIcon />
          </Fab>
          <Fab
            type="button"
            color="default"
            size="small"
            aria-label="delete"
            onClick={removeTodoHandler}
          >
            <DeleteIcon color="primary" />
          </Fab>
        </div>
      </List>
    </li>
  );
};

export default Task;
