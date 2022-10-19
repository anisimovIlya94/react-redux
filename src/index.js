import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { initiateStore } from "./store/store";
import * as actions from "./store/actions";

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());
  const completeTask = (taskId) => {
    store.dispatch(actions.taskChanged(taskId));
  };
  const updateTitle = (taskId) => {
    store.dispatch(actions.titleUpdated(taskId));
  };
  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));
  };
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => updateTitle(el.id)}>Change Title</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
