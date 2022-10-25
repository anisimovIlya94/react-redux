import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger";
import taskReduser from "./task";
import errorReduser from "./errors";

const rootRedusers = combineReducers({
  task: taskReduser,
  error: errorReduser
})

function createStore() {
  return configureStore({
    reducer: rootRedusers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}
export default createStore;
