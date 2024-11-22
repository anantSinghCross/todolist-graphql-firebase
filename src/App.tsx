import {useState} from "react";
import {TodoItem} from "./components/TodoItem.tsx";
import {Todo, useTodos} from "./zustore.tsx";
import {useShallow} from "zustand/react/shallow";

// TODO: 1. Integrate CRUD with GraphQL

function App() {
  const {todos, addTodo} = useTodos(useShallow((state) => ({todos: state.todos, addTodo: state.addTodo})));
  const [newTask, setNewTask] = useState<string>('');

  const handleNewTodoChange = (description: string) => {
    setNewTask(description)
  }

  return (
    <section className='flex justify-center h-lvh  bg-slate-100'>
      <div className='relative flex gap-3 pt-3 flex-col w-full max-w-lg overflow-y-auto'>
        {
          todos?.length > 0 && todos?.map((item: Todo) => (
            <TodoItem
              key={item.id}
              todo={item}
            />
          ))
        }
      </div>
      <div className='absolute flex w-full max-w-lg bottom-0 pb-5'>
        <input
          className='flex-grow p-2 px-3 rounded-s-lg outline-blue-500 shadow-lg shadow-slate-500/10'
          type='text'
          placeholder='Your task...'
          value={newTask}
          onChange={(e) => handleNewTodoChange(e.target.value)}
        />
        <button
          className='bg-blue-600 text-white text-sm font-semibold p-2 px-3 rounded-e-lg shadow-lg shadow-blue-500/50'
          onClick={() => addTodo(newTask)}
        >
          Add Task
        </button>
      </div>
    </section>
  )
}

export default App
