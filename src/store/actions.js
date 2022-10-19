import * as actionTypes from "./actionTypes";

export function taskChanged(id) {
  return { type: actionTypes.taskUpdated, payload: { id, completed: true } };
}
export function titleUpdated(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, title: `New title for ${id}` },
  };
}
export function taskDeleted(id) {
  return { type: actionTypes.taskDeleted, payload: { id } };
}
