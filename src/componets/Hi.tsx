import { Dispatch, SetStateAction } from "react";

// 함수의 파라메터는 ts 에서 타입 지정해야함.
interface HiProps {
  age: number;
  name: string;
  children?: React.ReactNode;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  add: () => void;
  minus: (num: number) => void;
}
const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age} {name}
    </div>
  );
};

export default Hi;
