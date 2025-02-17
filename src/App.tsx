import { useState } from "react";

interface UserI {
  id: number;
  level: number;
  login?: boolean;
}

function App() {
  // 초기값을 반드시 주자.
  // 처음에는 추론 보다는 제넥으로 타입변수를 지정하자.
  const [count, setCount] = useState<number>(0);
  const [point, setPoint] = useState<number | null>(0);

  // 객체형 타입 정의하기
  const [user, setUser] = useState<UserI | null>(null);

  return <div>App</div>;
}

export default App;
