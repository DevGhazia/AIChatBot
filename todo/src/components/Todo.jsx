import React from 'react'
import { useRef, useState, useEffect } from 'react'
import TodoItems from './TodoItems';

export const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []);
    const inputRef = useRef();
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList])

    function onAdd(){
        const input = inputRef.current.value.trim();
        if(input === "" )
            return;
        const newTask = {
            "id": Date.now(),
            "text": input,
            "isComplete": false
        }
        setTodoList(prev => [...prev, newTask]);
        inputRef.current.value = "";
    }
    
    function onDelete(id){
        setTodoList(prev=> prev.filter(task => task.id !== id));
    }

    function onToggle(id){
        setTodoList(prev=>(
            prev.map(task =>{
                if(task.id === id){
                    return {...task, isComplete: !task.isComplete}
                }
                return task;
            })
        ))
    }
        
  return (
    <div className='bg-white place-self-center w-11/12 max-x-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        <div className='flex items-center mt-7 gap-2'>
            <img src="todo_icon" className='w-8' alt="" />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} type="text" placeholder='Add your task' className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'/>
            <button onClick={onAdd} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>
        <div>
            {todoList.map((task, index) => (
                <TodoItems 
                    key={index}
                    id={task.id}
                    isComplete={task.isComplete}
                    deleteTodo={onDelete}
                    toggle={onToggle}
                    text={task.text}
                />
            ))}
        </div>
    </div>
  )
}
export default Todo;
