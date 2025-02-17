# 컴포넌트의 이해

- App.tsx

```tsx
function App() {
  return <div>App</div>;
}

export default App;
```

- 정의 형태 1. (React.FunctionComponent)

```tsx
import React from "react";

const App: React.FC = () => {
  return <div>App</div>;
};

export default App;
```

- 정의 형태 2.

```tsx
const App = (): JSX.Element => {
  return <div>App</div>;
};

export default App;
```

- 정의 형태 3.

```tsx
const App: React.FC = (): JSX.Element => {
  return <div>App</div>;
};

export default App;
```

## 우리는 2번 형태로 하겠습니다.

```tsx
const App = (): JSX.Element => {
  return <div>App</div>;
};

export default App;
```

## Props 전달하기

- /sc/componets/Hi.tsx 생성함.
- 단계 1. ( props: { age: number; name: string } 정의)

```tsx
// 함수의 파라메터는 ts 에서 타입 지정해야함.
const Hi = (props: { age: number; name: string }): JSX.Element => {
  return (
    <div>
      Hi {props.age} {props.name}
    </div>
  );
};

export default Hi;
```

- 단계 2. (인터페이스로 props 정의하기)

```tsx
// 함수의 파라메터는 ts 에서 타입 지정해야함.
interface HiProps {
  age: number;
  name: string;
}
const Hi = (props: HiProps): JSX.Element => {
  return (
    <div>
      Hi {props.age} {props.name}
    </div>
  );
};

export default Hi;
```

- 단계 3. (props 객체 구조 분해할당)

```tsx
// 함수의 파라메터는 ts 에서 타입 지정해야함.
interface HiProps {
  age: number;
  name: string;
}
const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age} {name}
    </div>
  );
};

export default Hi;
```

- 단계 4. (props 의 children)

```tsx
// 함수의 파라메터는 ts 에서 타입 지정해야함.
interface HiProps {
  age: number;
  name: string;
  children?: React.ReactNode;
}
const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age} {name}
    </div>
  );
};

export default Hi;
```

## Props 로 useState 변수 전달하기

- App.tsx (일반변수, state, children 을 전달하는 상황)

```tsx
import { useState } from "react";
import Hi from "./componets/Hi";

const App = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      App
      <Hi age={10} name="홍길동" count={count} setCount={setCount}>
        <p>안녕하세요.</p>
      </Hi>
    </div>
  );
};

export default App;
```

- count 와 setCount 가 현재 컴포넌트에 정의가 안되어있다.
- interface Hiprops 조건에 맞지 않다. (형태가 맞지 않다.)

```tsx
import { Dispatch, SetStateAction } from "react";

// 함수의 파라메터는 ts 에서 타입 지정해야함.
interface HiProps {
  age: number;
  name: string;
  children?: React.ReactNode;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}
const Hi = ({ age, name }: HiProps): JSX.Element => {
  return (
    <div>
      Hi {age} {name}
    </div>
  );
};

export default Hi;
```

- set 류의 useState 를 직접 전달하는 것은 컴포넌트가 복잡해진다.

## Props 로 함수를 전달하기

```tsx
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
```

```tsx
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
```
