import { atom } from "recoil";

// App 전체에서 관리할 값
export const countAtom = atom<number>({
  key: "countAtom",
  default: 0,
});

// App 전체에서 관리할 값
export const loginAtom = atom<boolean>({
  key: "loginAtom",
  default: false,
});
