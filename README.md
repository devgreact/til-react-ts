# axios

```bash
npm install axios
npm install @types/axios
```

## 폴더 및 파일 구조

- /src/apis 폴더 생성
- `/src/apis/todos 폴더` 생성
- `/src/apis/todos/apitodos.ts 파일` 생성
  - 확장자가 tsx 가 아닙니다.
  - js 라서 ts 가 됩니다.

```ts
import axios from "axios";
const todoURL = "https://jsonplaceholder.typicode.com/todos/";

interface TodoType {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}

// 자료 1개 호출하여 리턴 받기
const getOneTodo = async (id: number): Promise<TodoType | null> => {
  try {
    const res = await axios.get<TodoType>(`todoURL${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// 자료 여러개 호출해서 리턴받기
const getTodos = async (): Promise<TodoType[] | null> => {
  try {
    const res = await axios.get<TodoType[]>(todoURL);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 자료 1개 추가하기
const postTodo = async ({
  userId,
  title,
  completed,
}: TodoType): Promise<TodoType | null> => {
  try {
    const res = await axios.post<TodoType>(todoURL, {
      userId,
      title,
      completed,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 자료 1개 전체를 업데이트 하기
const putTodo = async ({
  userId,
  id,
  title,
  completed,
}: TodoType): Promise<TodoType | null> => {
  try {
    const res = await axios.put<TodoType>(todoURL, {
      userId,
      id,
      title,
      completed,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 자료 1개 중 일부분만 업데이트 하기
const patchTodo = async ({
  completed,
  userId,
  title,
  id,
}: TodoType): Promise<TodoType | null> => {
  try {
    const res = await axios.patch<TodoType>(todoURL, {
      completed,
      userId,
      title,
      id,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 삭제
const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    const res = await axios.delete(`todoURL${id}`);
    console.log(res.data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { getOneTodo, getTodos, putTodo, patchTodo, deleteTodo };
```

## type 관련 파일은 별도로 관리하자.

- `/src/types 폴더` 생성
- `/src/types/todo.ts 파일` 생성

```ts
export interface TodoType {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}
```

## api 호출하는 컴포넌트 만들기

- ts 로 작성했기 때문에 작성시 `코드 힌트`가 주어짐으로 편리하다.
- `/src/components/Todo.tsx 파일` 생성

```tsx
import { MouseEvent, ReactNode, useState } from "react";
import { getOneTodo, getTodos } from "../apis/todos/apitodos";
import { TodoType } from "../types/todo";

interface TodoProps {
  children?: ReactNode;
}

const Todo = (props: TodoProps): JSX.Element => {
  const [detail, setDetail] = useState<TodoType | null>(null);

  const oneTodo = async () => {
    const data = await getOneTodo(3);
    // const data: TodoType | null
    // console.log(data.id); // 오류
    // 타입 좁히기 (타입가드)
    if (data) {
      // const data: TodoType
      console.log(data);
      console.log(data.id);
      setDetail(data);
    } else {
      console.log("자료가 없어요.");
      // const data: null
      setDetail(data);
    }
  };

  const [todos, setTodos] = useState<TodoType[]>([]);

  const allTodo = async () => {
    // const data:  TodoType[] | null
    const data = await getTodos();
    if (data) {
      // const data: TodoType[]
      console.log(data);
      setTodos(data);
    } else {
      // const data: null
      console.log(data);
      setTodos([]);
    }
  };

  return (
    <>
      {detail && <div>상세한 내용 : {detail.title}</div>}
      <button onClick={oneTodo}>한개 가져오기</button>
      <button onClick={allTodo}>다 가져오기</button>
      <button>추가하기</button>
      <button>전체수정하기</button>
      <button>일부수정하기</button>
      <button>삭제하기</button>
    </>
  );
};
export default Todo;
```
