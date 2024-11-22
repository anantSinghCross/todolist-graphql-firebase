import * as React from "react";
import {Todo} from "../App.tsx";
import {useState} from "react";

interface TodoItemProps {
  todo: Todo
  deleteTodo: (id: string) => void
  toggleCheck: (id: string) => void
  editTodo: (id: string, description: string) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({todo, deleteTodo, toggleCheck, editTodo}) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editModeText, setEditModeText] = useState<string>(todo.description);

  return (
    <div className='flex gap-2 bg-white mx-2 p-3 rounded-lg shadow-lg shadow-slate-500/10'>
      <div onClick={() => toggleCheck(todo.id)}>
        {
          todo.completed ? '✅':'⬜'
        }
      </div>
      <div className='flex flex-grow'>
        {
          editMode ? (
            <input className='flex-grow px-1 bg-blue-100 outline-blue-500' type="text" value={editModeText} onChange={(e) => setEditModeText(e.target.value)}/>
          ):(
            <p className='flex-grow px-1' onClick={() => setEditMode(p => !p)}>{todo.description}</p>
          )
        }
      </div>
      {
        editMode ? (
          <button className='self-start' onClick={() => {
            editTodo(todo.id, editModeText)
            setEditModeText(editModeText);
            setEditMode(false);
          }}>✔️</button>
        ):(
          <button className='self-start' onClick={() => deleteTodo(todo.id)}>🗑️</button>
        )
      }
    </div>
  )
}