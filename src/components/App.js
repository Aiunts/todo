import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo/AddTodo'
import MyTodos from './MyTodos/MyTodos'

export default function App() {

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  )
  const [isLoading, setIsLoading] = useState(false)

  const addTodo = (title) => {
    setTodos(prevState =>
      [{ userId: 1, id: prevState.length + 1, title: title, completed: false }, ...prevState]
    )
  }

  const removeTodo = (todoId) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== todoId))
  }

  const toggleTodo = (todoId) => {
    setTimeout(() => {
      setTodos(todos.map(todo => {
        if (todo.id === todoId)
          todo.completed = !todo.completed
        return todo
      }))
    }, 400)

  }

  useEffect(() => {
    setIsLoading(true)
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(serverTodos => {
        if (todos.length === 0)
          setTodos(serverTodos)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <header />
      <div className='container'>
        <h1>Todo App</h1>
        <main>
          <AddTodo addTodo={addTodo} />
          <MyTodos todos={todos} isLoading={isLoading} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        </main>
      </div>
    </>
  )
}
