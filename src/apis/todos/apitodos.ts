import axios from "axios";
import { TodoType } from "../../types/todo";
const todoURL = "https://jsonplaceholder.typicode.com/todos/";

// 자료 1개 호출하여 리턴 받기
const getOneTodo = async (id: number): Promise<TodoType | null> => {
  try {
    const res = await axios.get<TodoType>(`${todoURL}${id}`);
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
