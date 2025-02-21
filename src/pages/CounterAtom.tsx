import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { countAtom, loginAtom } from "../atoms/countAtom";
import { countSelector } from "../selector/countSelector";
interface CounterAtomProps {
  children?: React.ReactNode;
}
const CounterAtom = (): JSX.Element => {
  const [count, setCount] = useRecoilState(countAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  // selecter
  const nowCountValue = useRecoilValue(countSelector);

  return (
    <div>
      <h1>CounterAtom : {isLogin ? "로그인됨" : "로그아웃됨"}</h1>
      <div>
        <button onClick={() => setIsLogin(true)}>로그인</button>
        <button onClick={() => setIsLogin(false)}>로그아웃</button>
      </div>
      <div>
        <h3 style={{ color: "red" }}>{count}</h3>
        <h3>{count % 2 == 0 ? "짝수" : "홀수"}</h3>
        <h3>{nowCountValue}</h3>
        <h3>{nowCountValue}</h3>
        <button onClick={() => setCount(count + 1)}>count 증가</button>
        <button onClick={() => setCount(count - 1)}>count 감소</button>
      </div>
    </div>
  );
};

export default CounterAtom;
