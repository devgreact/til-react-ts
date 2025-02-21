import { selector } from "recoil";
import { countAtom } from "../atoms/countAtom";

export const countSelector = selector<string>({
  key: "countSelector",
  // atom 이 바뀌면 자동으로 연산한 결과를 돌려줌
  get: ({ get }) => {
    const count = get(countAtom);
    return count % 2 == 0 ? "짝수" : "홀수";
  },
});
