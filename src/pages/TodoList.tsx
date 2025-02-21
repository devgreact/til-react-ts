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
