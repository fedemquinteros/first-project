import { useRef } from 'react';
import { useState } from 'react';
import './CSS/Todo.css'
import { useEffect } from 'react';
import TodoItems from './TodoItems';

let count = 0;
const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        const newTask = inputRef.current.value.trim();
        if (newTask.length > 0) {
            setTodos([...todos, { no: count++, text: inputRef.current.value, display: "" }]);
            inputRef.current.value = "";
            localStorage.setItem("todos_count", count);
        }else{
            alert("Por favor añada una tarea");}


    }
    const HandleKeydown = (e) => {
        if (e.key === "Enter") {
            add();
        }
    }
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todos")));
        count = localStorage.getItem("todos_count");
    }, [])

    useEffect(() => {
        setTimeout(() => {
            console.log(todos);
            localStorage.setItem("todos", JSON.stringify(todos));


        }, 100);
    }, [todos]);

    return (
        <div className='todo'>
            <div className="todo-header">Lista de Tareas</div>
            <div className="todo-add">
                <input ref={inputRef} type="text" onKeyDown={HandleKeydown} placeholder='Agrega una tarea' className='todo-input' />
                <div onClick={() => { add() }} className="todo-add-btn">++</div>
            </div>
            <div className="todo-list">
                {todos.map((item, index) => {
                    return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />
                })}
            </div>
        </div>
    )
}

export default Todo
