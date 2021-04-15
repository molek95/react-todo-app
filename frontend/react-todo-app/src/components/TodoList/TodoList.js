import React, {useState, useEffect} from 'react'
import TodoForm from '../TodoForm/TodoForm'
import Todo from '../Todo/Todo'

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/tasks')
            .then(response => response.json())
            .then(data => {
                setTodos(Object.values(data))
            });
    }, []);

    const addTodo = todo => {
        if(!todo.text) {
            return
        }
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo)
        };
        fetch('http://localhost:3000/api/tasks', requestOptions)
            .then(() => {
                const newTodos = [todo, ...todos];
                setTodos(newTodos);
            })
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos);
    }

    const removeTodo = id => {
        fetch('http://localhost:3000/api/tasks/' + `${id}`, {method: 'DELETE'})
            .then(() => {
                const removeArr = [...todos].filter(todo => todo.id !== id)
                setTodos(removeArr);
            })
    }

    const editTodo = (id, currentValue) => {
        if(!currentValue.text) {
            return
        }
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(currentValue)
        }
        fetch('http://localhost:3000/api/tasks/' + `${id}`, requestOptions)
            .then(() => {
                setTodos(prev => prev.map(item => (item.id === id ? currentValue : item)));
            })
    }
    
    return (
        <div>
            <h1>React TODO app</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} editTodo={editTodo}/>
        </div>
    )
}

export default TodoList
