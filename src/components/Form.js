import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "./List";
import ToDo from "./ToDo";

import randomString from "randomstring";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Hidden } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%",
      flexGrow: 1,
    },
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Form = () => {
  const classForm = useStyles();

  const getTasks = useSelector((state) => state.tasks.list);

  const dispatch = useDispatch();
  const [tasks, setTasks] = useState(getTasks);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTasks(e) {
    e.preventDefault();
    setError("");
    const preventRepeated = tasks.findIndex((t) => t.tasks === value.trim());

    if (value.trim().length > 0 && preventRepeated === -1) {
      setError("");
      const createTasks = {
        id: randomString.generate(8),
        tasks: value,
        favorite: false,
      };
      const addItemArr = [...tasks, createTasks];
      dispatch({
        type: "CREATE",
        payload: addItemArr,
      });
      setTasks([...addItemArr]);
      setValue("");
      // console.log(addItemArr);
    }
    if (value.trim().length === 0) {
      setError("Por favor insira algo");
      return;
    }
    if (preventRepeated !== -1) {
      setError("Esta tarefa já foi inserida");
      return;
    }
  }

  const favoriteTasksHandler = useCallback(
    (id) => {
      const search = tasks.find((item) => item.id === id);
      if (!search.favorite) search.favorite = true;
      else {
        search.favorite = false;
      }
      dispatch({
        type: "FAVORITE",
        payload: [...tasks],
      });
      setTasks([...tasks]);
    },
    [dispatch, tasks]
  );

  const dispatchTaskAction = (id, value) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);
    // console.log(id, value);
    const cloneTask = [...tasks];
    cloneTask[taskIndex].tasks = value;
    // console.log(cloneTask);
    dispatch({
      type: "UPDATE",
      payload: cloneTask,
    });
    setTasks([...cloneTask]);
  };

  const removeTasksHandler = useCallback(
    (id) => {
      const filterRemove = tasks.filter((item) => item.id !== id);
      dispatch({
        type: "REMOVE",
        payload: filterRemove,
      });
      setTasks(filterRemove);
    },
    [dispatch, tasks]
  );
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const timeClose = () => setInterval(setError(""), 5000);

  return (
    <div>
      <form onSubmit={handleAddTasks} className={classForm.root}>
        <div className={classForm.form}>
          <TextField
            label="Add tasks"
            rowsMax={2}
            variant="outlined"
            type="text"
            name="value"
            id="inputTasks"
            placeholder="Tasks..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></TextField>
          {error && (
            <Snackbar open={true} onClose={timeClose} autoHideDuration={1000}>
              <Alert severity="error">{error}</Alert>
            </Snackbar>
          )}
          <Fab color="primary" size="small" aria-label="submit" type="submit">
            <AddBoxIcon />
          </Fab>
        </div>
      </form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={3}>
          <Hidden mdDown>
            <ToDo />
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <List
            tasksList={tasks}
            onfavoriteTask={favoriteTasksHandler}
            onUpdateTask={dispatchTaskAction}
            onRemoveTask={removeTasksHandler}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
