import React, { useEffect, useState } from 'react'

export default function MyTodos({ todos, toggleTodo, isLoading, removeTodo }) {

    const [displayedTodos, setDispayedTodos] = useState(todos)
    const [selectedCategory, setSelectedCategory] = useState('Все')
    const [searchTerm, setSearchTerm] = useState('')

    const todoFilter = (category) => {
        if (category === 'Все') {
            setDispayedTodos(todos)
        }
        if (category === 'Выполненые') {
            setDispayedTodos(todos.filter(todo => todo.completed))
        }
        if (category === 'Невыполненые') {
            setDispayedTodos(todos.filter(todo => !todo.completed))
        }
    }

    useEffect(() => {
        todoFilter(selectedCategory)
    }, [todos, selectedCategory])

    useEffect(() => {
        const selectAllTodos = () => {
            if (window.innerWidth <= 375) {
                setSelectedCategory('Все')
            }
        }

        window.addEventListener('resize', selectAllTodos)

        return () => {
            window.removeEventListener('resize', selectAllTodos)
        }
    })

    return (
        <div className={`my-todos ${displayedTodos.length > 6 ? 'gradient' : ''}`}>
            <div className='my-todos__header'>
                <h2>My Todos</h2>
                <input onChange={event => setSearchTerm(event.target.value)} placeholder='Search' type="text" />
            </div>
            <nav className='breadcrumbs'>
                <ul onClick={event => setSelectedCategory(event.target.innerHTML)}>
                    <li className={selectedCategory === 'Все' ? 'active' : null}>Все</li>
                    <li className={selectedCategory === 'Выполненые' ? 'active' : null}>Выполненые</li>
                    <li className={selectedCategory === 'Невыполненые' ? 'active' : null}>Невыполненые</li>
                </ul>
            </nav>
            <div className={`todos ${displayedTodos.length > 6 ? 'overflow' : ''}`}>
                {displayedTodos.length === 0
                    ? isLoading ? 'Loading...' : 'No todos!'
                    : displayedTodos
                        .sort((a, b) => Number(b.id) - Number(a.id))
                        .sort((a, b) => Number(a.completed) - Number(b.completed))
                        .filter(todo => {
                            if (searchTerm === '')
                                return todo
                            if (todo.title.toLowerCase().startsWith(searchTerm.toLowerCase()))
                                return todo
                            return false
                        })
                        .map(todo =>
                            <div key={todo.id} className='todos__item'>
                                <h2>{todo.title}</h2>
                                <input defaultChecked={todo.completed} type="checkbox" onChange={() => toggleTodo(todo.id)} />
                                <button onClick={() => removeTodo(todo.id)}>X</button>
                            </div>
                        )}
            </div>
        </div>
    )
}
