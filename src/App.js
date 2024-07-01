import React from 'react';
import './App.css';
import TodoApp from './components/todo/TodoApp'
import AuthProvider from './components/todo/security/AuthContext';

function App() {
  return (
      <AuthProvider>
        <TodoApp/>
      </AuthProvider>
  );
}
export default App;
