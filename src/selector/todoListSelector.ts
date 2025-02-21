import { selector } from "recoil";
import { todoListAtom, TodoType } from "../atoms/todoListAtom";

export const todoListSelector = selector<TodoType[]>({
  key: "todoListSelector",
  get: ({ get }) => {
    const todos = get(todoListAtom);
    return todos.filter(item => item.completed === true);
  },
});
