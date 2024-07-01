import { useState, createContext } from "react";
import { useContext } from 'react';
import { configureJwt, authenticate, ejectInterceptor } from "../api/ApiClient";

//create a context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)
//share the context with other components
export default function AuthProvider({children}){
    //put some state in the context
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('')
    const [interceptorId, setInterceptorId] = useState(0);

    function login(username,password){
        return authenticate(username,password)
        .then((response)=>{
            setInterceptorId(configureJwt(response.data.token));
            setToken(response.data.token);
            setUsername('sadek');
            setIsAuthenticated(true);
            return true;
        })
        .catch((error)=>{
            console.log(error);
            return false;
        });
    }
    function logout(){
        ejectInterceptor(interceptorId);
        setInterceptorId(0);
        setToken('');
        setUsername('');
        setIsAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    )
}