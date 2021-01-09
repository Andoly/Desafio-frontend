import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "./List";

import randomString from "randomstring";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddBoxIcon from "@material-ui/icons/AddBox";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "120ch",
    },
  },
}));

const useStylesForm = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Form = () => {
  const classForm = useStyles();
  const form = useStylesForm();

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
    const preventRepeated = tasks.findIndex(t => t.tasks === value.trim())

    if (value.trim().length > 0 && preventRepeated === -1) {
      console.log('valor adicionado', value)
      setError("");
      const createTasks = {
        id: randomString.generate(8),
        tasks: value,
        favorite: false
      };
      const addItemArr = [...tasks, createTasks];
      dispatch({
        type: "CREATE",
        payload: addItemArr,
      });
      setTasks([...addItemArr]);
      setValue("");
      console.log(addItemArr)
    } else {
      setError("Please input something...");
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
    console.log(id, value)
    const cloneTask = [...tasks]
    cloneTask[taskIndex].tasks = value
    console.log(cloneTask)
    dispatch({
      type: "UPDATE",
      payload: cloneTask,
    });
    setTasks([...cloneTask]);
  } 

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

  return (
    <>
      <Container fixed>
        <form
          onSubmit={handleAddTasks}
          className={classForm.root}
        >
          <div className={form.root}>
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
            >
              {error.length > 0 && (
                <small className="text-danger">{error}</small>
              )}
            </TextField>
            <Fab color="primary" size="small" aria-label="submit" type="submit">
              <AddBoxIcon />
            </Fab>
          </div>
        </form>
        <hr />
        <List
          tasksList={tasks}
          onfavoriteTask={favoriteTasksHandler}
          onUpdateTask={dispatchTaskAction}
          onRemoveTask={removeTasksHandler}
        />
      </Container>
    </>
  );
};

export default Form;
