import { useState } from "react";
import Hi from "./componets/Hi";

const App = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);

  const add = (): void => {
    const temp = count + 1;
    setCount(temp);
  };

  const minus = (num: number): void => {
    const temp = count - num;
    setCount(temp);
  };

  return (
    <div>
      App
      <Hi
        age={10}
        name="홍길동"
        count={count}
        setCount={setCount}
        add={add}
        minus={minus}
      >
        <p>안녕하세요.</p>
      </Hi>
    </div>
  );
};

export default App;
