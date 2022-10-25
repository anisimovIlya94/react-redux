import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = {entities: [], isLoading: true};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex((el) => el.id === action.payload.id);
      state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload };
    },
    remove(state, action) {
      state.entities = state.entities.filter((el) => el.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestErrored(state) {
      state.isLoading = false
    },
    create(state, action) {
      state.entities.push(action.payload)
    }
  },
});

const { actions, reducer: taskReduser } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestErrored, create } = actions;

export const loadTasks = () => async (dispatch) => {
  try {
    dispatch(taskRequested());
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestErrored())
    dispatch(setError(error.message))
  }
};

export const createTask = () => async (dispatch) => {
  const data = await todosService.post({ title: "New task one", completed: false })
  dispatch(create(data));
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export function titleUpdated(id) {
  return update({ id, title: `New title for ${id}` });
}
export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.task.entities;
export const getTasksLoadingStatus = () => (state) => state.task.isLoading;


export default taskReduser;
