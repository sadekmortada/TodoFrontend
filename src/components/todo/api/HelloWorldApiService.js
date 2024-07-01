import {apiClient} from "./ApiClient";

// export function retrieveHelloWorldBean(path){
//     return axios.get('http://localhost:8080/'+path);
// }

// export function retrieveHelloWorldBeanPathVariable(path, variable){
//     return axios.get('http://localhost:8080/'+path+'/'+variable);
// }

export const retrieveHelloWorldBean = (path) =>
    apiClient.get(path);

export const retrieveHelloWorldBeanPathVariable = (path, variable) => 
    apiClient.get(path+'/'+variable);
