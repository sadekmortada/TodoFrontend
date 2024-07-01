import { useCallback, useEffect, useState } from "react";
import { retrieveTodosForUser } from "./api/TodoApiService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { deleteTodo } from "./api/TodoApiService";
import { useLocation } from "react-router-dom";

export default function ListTodosComponent(){
    const location = useLocation();
    const [successMessage] = useState(location.state? location.state.successMessage : '')
    const [dangerMessage,setDangerMessage] = useState(location.state? location.state.dangerMessage : '')
    const authContext = useAuth();
    const navigate = useNavigate();
    const [todos,setTodos] = useState([]);
    const refreshTodos = useCallback(() => {
        retrieveTodosForUser(authContext.username)
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, [authContext.username]);

    useEffect(
        ()=>refreshTodos(),[refreshTodos]
    )

    function editTodo(todo){
        navigate('/edit-todo',  { state: { todo: todo } });
    }

    function newTodo(){
        navigate('/create-todo',  { state: { todo: {empty: true} } });
    }

    function removeTodo(todo){
        deleteTodo(todo.username,todo.id)
        .then(()=> {refreshTodos(); setDangerMessage(`todo with id: ${todo.id} was deleted`)})
        .catch((error)=>console.log(error));
    }
    return (
        <div className="container">
            <div className='bg-secondary container'>
                <div className="my-1 row">
                    <div className="col-sm-3"/>
                    <div className="col-sm-6 py-1">
                        {successMessage && <input type="text" className="text-center text-white bg-success form-control" disabled defaultValue={successMessage}/>}
                        {dangerMessage && <input type="text" className="text-center text-white bg-danger form-control" disabled defaultValue={dangerMessage}/>}
                    </div>
                </div>
                <h1>Things to do</h1>
                <div className="py-2">
                    <table className='table table-striped table-dark'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Done</th>
                                <th>TargetDate</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo=>(
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate}</td>
                                    <th><button className="btn btn-warning text-white" onClick={()=>editTodo(todo)}>edit</button></th>
                                    <th><button className="btn btn-danger" onClick={()=>removeTodo(todo)}>delete</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={()=>newTodo()}>create new</button>
                    </div>
                </div>
            </div>
        </div>
    )
}