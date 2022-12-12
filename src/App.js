import './app.scss'
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState([]);

    const ShowTodos = ({todos}) => {
        return (
            <div>
                {todos.map((todos) => (
                    <p key={todos.id}><span>{todos.id}.</span> {todos.title}</p>
                ))}
                {value ? <p className="entering">Adding: {value}</p> : ""}
            </div>
        );

    }
    
    async function fetchPosts() {
        const todos = await axios.get('https://jsonplaceholder.typicode.com/todos', {
            params: {
                _limit: 10
            }
        })
        setTodos(todos.data)
    }

    const handleSubmit = e => {
        e.preventDefault();
        value && addTask(value)
        setValue("");
    };
    
    const addTask = (title) => setTodos([...todos, {id: todos.pop().id + 1, title}]);
    
    
    return (
        <div className="app">
            <button onClick={fetchPosts}>Download TODO list</button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    placeholder="Create a new todo..."
                    onChange={e => setValue(e.target.value)}
                />
                <p>Press "Enter" to add the new TODO item to the List</p>
            </form>
            
            <div className="todo-list">
                <ShowTodos todos={todos} />
                <ShowTodos todos={todos} />
            </div>
        </div>
    );
}

export default App;
    