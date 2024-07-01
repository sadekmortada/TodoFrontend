import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import WelcomeComponent from './WelcomeComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import LogoutComponent from './LogoutComponent';
import LoginComponent from './LoginComponent';
import {useAuth} from './security/AuthContext'
import AccessDeniedComponent from './AccessDeniedComponent';
import TodoComponent from './TodoComponent';

export default function TodoApp(){
    const authContext = useAuth();
    return ( 
            <div className='container text-white'>
                    <BrowserRouter>
                        <HeaderComponent/>
                        <Routes>
                            <Route path='/login' element={<LoginComponent/>}/>
                            <Route path='/' element={<LoginComponent/>}/>
                            <Route path='/logout' element={<LogoutComponent/>}/>
                            {authContext.isAuthenticated?( 
                                <>
                                    <Route path='/welcome' element={<WelcomeComponent/>}/>
                                    <Route path='/todos' element={<ListTodosComponent/>}/>
                                    <Route path='/edit-todo' element={<TodoComponent/>}/>
                                    <Route path='/create-todo' element={<TodoComponent/>}/>
                                    <Route path='*' element={<ErrorComponent/>}/>
                                </>
                            ):(
                                <Route path='*' element={<AccessDeniedComponent/>}/>
                            )}
                        </Routes>
                        <FooterComponent/>
                    </BrowserRouter>
            </div>
    )
}