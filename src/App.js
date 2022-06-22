import React from "react";
import TodoList from "./todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => new Promise(resolve => {
    setTimeout(() =>{
        resolve(import('./todo/AddTodo'))
    }, 2000)
}))

function App() {

    const [todos, setTodos] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(json => {
                setTimeout(() =>{
                    setTodos(json)
                    setLoading(false)
                }, 2000)

            })
    }, [])

    function toggleTodo(id){
        setTodos(
            todos.map(todo => {
                if(todo.id === id){
                    todo.completed = !todo.completed
                }
                return todo
            })
        )
    }

    function removeTodo(id){
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function addTodo(title) {
        setTodos(
            todos.concat([
                {
                    title,
                    id: Date.now(),
                    completed: false
                }
            ])
        )
    }

    return (
      <Context.Provider value={{ removeTodo }}>
        <div className='wrapper'>
          <h1>Планы на проект.</h1>


            <React.Suspense fallback={<Loader/>}>
                <Modal/>
                <AddTodo onCreate={addTodo}/>
            </React.Suspense>

            {todos.length ? (
                <TodoList todos={todos} onToggle={toggleTodo} />
                ) : (
                    loading ?  null : <p>Ты зачем всё удалил, айбол?</p>
            )}
        </div>
      </Context.Provider>
  );
}

export default App;
