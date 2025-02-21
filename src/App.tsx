import CounterAtom from "./pages/CounterAtom";
import TodoList from "./pages/TodoList";

const App = (): JSX.Element => {
  return (
    <>
      <CounterAtom />
      <TodoList />
    </>
  );
};

export default App;
