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
    // getTodos(): Promise<TodoType[] | null>
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
