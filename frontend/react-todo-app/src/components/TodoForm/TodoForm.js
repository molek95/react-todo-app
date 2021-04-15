import React, { useState, useEffect, useRef } from 'react'
import './TodoForm.css';

function TodoForm(props) {
    const [input, setInput] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const submitTodo = e => {
        e.preventDefault();
        
        props.onSubmit({
            id: Math.floor(Math.random() * 1000),
            text: input
        });

        setInput('')
    }

    const handleChange = e => {
        setInput(e.target.value);
    }

    return (
        <form className="todo-form" onSubmit={submitTodo}>
            <input 
                type="text" 
                placeholder="Add a todo" 
                value={input} 
                name="text" 
                className="todo-input"
                onChange={handleChange}
                ref={inputRef}/>
            <button className="todo-button">Add todo</button>
        </form>
    )
}

export default TodoForm
