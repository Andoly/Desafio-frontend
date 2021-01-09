import React from "react";
import Task from "./Task";

const List = ({ tasksList, onfavoriteTask, onUpdateTask, onRemoveTask }) => {
  return (
    <ul>
      {tasksList.map(({ id, favorite, tasks }) => (
        <Task
          key={id}
          id={id}
          favorite={favorite}
          task={tasks}
          onfavoriteTask={onfavoriteTask}
          onUpdateTask={onUpdateTask}
          onRemoveTask={onRemoveTask}
        />
      ))}
    </ul>
  );
};

export default List;
