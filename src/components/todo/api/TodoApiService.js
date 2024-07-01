import {apiClient} from "./ApiClient";

// export function retrieveHelloWorldBean(path){
//     return axios.get('http://localhost:8080/'+path);
// }

// export function retrieveHelloWorldBeanPathVariable(path, variable){
//     return axios.get('http://localhost:8080/'+path+'/'+variable);
// }

export function retrieveTodosForUser(username){
    return apiClient.get(username + '/todos');
}

export function retrieveTodoForUser(username, id){
    return apiClient.get(username + '/todos/' + id);
}

export function createTodo(username, todo){
    return apiClient.post(username + '/todos', JSON.stringify(todo));
}

export function updateTodo(username, todo){
    return apiClient.put(username + '/todos', JSON.stringify(todo));
}

export function deleteTodo(username, id){
    return apiClient.delete(username + '/todos/' + id);
}