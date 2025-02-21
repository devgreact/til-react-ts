# Recoil

- 설치

```bash
npm i recoil
```

- atoms 는 저장되는 변수라고 생각하자.
- selector 는 astoms 가 변하는 것을 추적해서 atoms 값을 출력하는 용도
- selector 는 필수가 아니라서 사용안하셔도 무관

## 컨벤션

### case 1

- atoms 전용
  - /src/atoms 폴더 생성
- selector 전용
  - /src/selector 폴더 생성

### case 2

- /src/states 폴더 생성

## 기초 코드

- /src/atoms/countAtom.ts 생성

```ts
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
```

- 앱 전체에 리코일 접근 및 수정 적용
  - main.tsx 에 적용을 함.

```ts
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

## countAtom 을 이용한 tsx 생성

- /src/pages/CounterAtom.tsx 생성

```tsx
import React from "react";
import { useRecoilState } from "recoil";
import { countAtom, loginAtom } from "../atoms/countAtom";
interface CounterAtomProps {
  children?: React.ReactNode;
}
const CounterAtom = (): JSX.Element => {
  const [count, setCount] = useRecoilState(countAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);

  return (
    <div>
      <h1>CounterAtom : {isLogin ? "로그인됨" : "로그아웃됨"}</h1>
      <div>
        <button onClick={() => setIsLogin(true)}>로그인</button>
        <button onClick={() => setIsLogin(false)}>로그아웃</button>
      </div>
      <div>
        <h3 style={{ color: "red" }}>{count}</h3>
        <button onClick={() => setCount(count + 1)}>count 증가</button>
        <button onClick={() => setCount(count - 1)}>count 감소</button>
      </div>
    </div>
  );
};

export default CounterAtom;
```

## 응용예제 (Todo)

- /src/atoms/todoListAtom.ts

```ts
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
```

- /src/pages/TodoList.tsx 생성

```tsx
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListAtom } from "../atoms/todoListAtom";
interface TodoListProps {
  children?: React.ReactNode;
}
const TodoList: React.FC<TodoListProps> = () => {
  const [todos, setTodos] = useRecoilState(todoListAtom);
  const [value, setValue] = useState<string>("");
  // 할일 추가
  const addTodo = () => {
    if (value.trim()) {
      // 리코일 업데이트
      setTodos([...todos, { id: Date.now(), text: value, completed: false }]);
    }
    setValue("");
  };
  // 완료여부
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };
  // 삭제
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>TodoList</h1>
      <div>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={() => addTodo()}>추가</button>
        <ul>
          {todos.map(item => (
            <li key={item.id}>
              <p
                onClick={() => toggleTodo(item.id)}
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </p>
              <button onClick={() => deleteTodo(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
```

## Selector 의 이해

- atom 의 새로운 값을 자동으로 계산해서 출력
- atom 의 갱신을 위한 중복 코드를 줄여주고 여러 곳에서 사용한다.
- /src/selector/countSelector.ts

```ts
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
```

- selector 사용

```tsx
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
```

### todoList 에서 completed 가 true 인 목록 뽑기

- /src/selector/todoListSelector.ts

```ts
import { selector } from "recoil";
import { todoListAtom, TodoType } from "../atoms/todoListAtom";

export const todoListSelector = selector<TodoType[]>({
  key: "todoListSelector",
  get: ({ get }) => {
    const todos = get(todoListAtom);
    return todos.filter(item => item.completed === true);
  },
});
```

- 반영

```tsx
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListAtom } from "../atoms/todoListAtom";
import { todoListSelector } from "../selector/todoListSelector";
interface TodoListProps {
  children?: React.ReactNode;
}
const TodoList: React.FC<TodoListProps> = () => {
  const [todos, setTodos] = useRecoilState(todoListAtom);
  // selector
  const completedTodos = useRecoilValue(todoListSelector);

  const [value, setValue] = useState<string>("");
  // 할일 추가
  const addTodo = () => {
    if (value.trim()) {
      // 리코일 업데이트
      setTodos([...todos, { id: Date.now(), text: value, completed: false }]);
    }
    setValue("");
  };
  // 완료여부
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };
  // 삭제
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>TodoList</h1>
      <div>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={() => addTodo()}>추가</button>
        <ul>
          {todos.map(item => (
            <li key={item.id}>
              <p
                onClick={() => toggleTodo(item.id)}
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </p>
              <button onClick={() => deleteTodo(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2> 완료된 목록 출력</h2>
        <ul>
          {completedTodos.map(item => (
            <li key={item.id}>
              <p>{item.text}</p>
              <button onClick={() => deleteTodo(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
```
