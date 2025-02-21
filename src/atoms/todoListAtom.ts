import { atom } from "recoil";

export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
}

export const todoListAtom = atom<TodoType[]>({
  key: "todoListAtom",
  default: [],
});
