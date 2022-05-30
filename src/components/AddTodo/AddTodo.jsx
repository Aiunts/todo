import React, { useState } from "react"

export default function AddTodo({ addTodo }) {

    const [todoName, setTodoName] = useState('')

    const createTodo = (event) => {
        event.preventDefault()

        if (todoName.trim()) {
            addTodo(todoName)
            setTodoName('')
        }
    }

    return (
        <div className="add-todo">
            <h2>Add Todo</h2>
            <form onSubmit={createTodo}>
                <input
                    maxLength='60'
                    value={todoName}
                    onChange={event => setTodoName(event.target.value)}
                    placeholder="Todo name"
                    type="text"
                />
                <button type='submit'>+</button>
            </form>
        </div >
    )
}
