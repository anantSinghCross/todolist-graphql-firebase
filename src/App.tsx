import {useState} from "react";
import {TodoItem} from "./components/TodoItem.tsx";

// TODO: 1. Implement Zustand in this project
// TODO: 2. Integrate CRUD with GraphQL

export interface Todo {
  id: string
  description: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<Todo>({
    id: '',
    description: '',
    completed: false
  })

  const handleAddTodo = (newTask: Todo) => {
    const id = Math.trunc(Math.random() * 1000000).toString();
    setTodos(prevState => [...prevState, {...newTask, id}])
    setNewTask({id: '', description: '', completed: false});
  }

  const handleEditTodo = (id: string, description: string) => {
    setTodos(prevState => {
      return prevState.map(item => item.id === id ? {...item, description} : item)
    })
  }

  const handleNewTodoChange = (description: string) => {
    setNewTask(prevState => ({...prevState, description: description}))
  }

  const handleRemoveTodo = (id: string) => {
    setTodos(prevState => {
      return prevState.filter((item: Todo) => item.id !== id)
    })
  }

  const handleChecked = (id: string) => {
    setTodos(p => {
      return p.map(item => item.id===id ? {...item, completed: !item.completed}:item);
    })
  }

  return (
    <section className='flex justify-center h-lvh  bg-slate-100'>
      <div className='relative flex gap-3 pt-3 flex-col w-full max-w-lg overflow-y-auto'>
        {
          todos?.length > 0 && todos?.map((item: Todo) => (
            <TodoItem
              key={item.id}
              todo={item}
              deleteTodo={handleRemoveTodo}
              toggleCheck={handleChecked}
              editTodo={handleEditTodo}
            />
          ))
        }
      </div>
      <div className='absolute flex w-full max-w-lg bottom-0 pb-5'>
        <input
          className='flex-grow p-2 px-3 rounded-s-lg outline-blue-500 shadow-lg shadow-slate-500/10'
          type='text'
          placeholder='Your task...'
          value={newTask.description}
          onChange={(e) => handleNewTodoChange(e.target.value)}
        />
        <button
          className='bg-blue-600 text-white text-sm font-semibold p-2 px-3 rounded-e-lg shadow-lg shadow-blue-500/50'
          onClick={() => handleAddTodo(newTask)}
        >
          Add Task
        </button>
      </div>
    </section>
  )
}

export default App
