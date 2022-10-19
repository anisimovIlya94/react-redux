import * as actionTypes from "./actionTypes";

export function taskReduser(state = [], action) {
  switch (action.type) {
    case actionTypes.taskUpdated: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
      break;
    }
    case actionTypes.taskDeleted: {
      const newArray = [...state];
      return newArray.filter((el) => el.id !== action.payload.id);
      break;
    }
    default:
      return state;
  }
}
