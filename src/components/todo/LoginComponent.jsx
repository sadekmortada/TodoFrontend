import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './security/AuthContext';

export default function LoginComponent(){
    const authContext = useAuth();
    const [disableSubmit,setDisableSubmit] = useState(false);
    const [username,setUsername] = useState("sadek");
    const [password,setPassword] = useState("123");
    const [fail,setFail] = useState(false);
    const navigate = useNavigate();
    function handleSubmit(){
        setDisableSubmit(true);
        authContext.login(username,password)
        .then((result)=>{
            if(result){
                setFail(false);
                // navigate('/welcome/'+username);
                navigate(`/welcome`);
            }
            else
                setFail(true);
            setDisableSubmit(false);
        });
    }
    return (
        <div className="container">
            <div className="my-1 row">
                <div className="col-sm-3"/>
                <div className="col-sm-6 py-1">
                    {fail && <input type="text" className="text-center text-white bg-danger form-control" disabled defaultValue="Authentication failed, bad credentials"/>}
                </div>
            </div>
            <div className="LoginForm">
                <div className='row my-2'> 
                    <label htmlFor="inputUsername" className='col-sm-2 col-form-label'>User Name</label>
                    <div className='col-sm-4'>
                        <input type="text" name="username" className='form-control' placeholder="username here" id="inputUsername"
                        value={username}
                        onChange={(event)=>setUsername(event.target.value)}
                        />
                    </div>
                </div>
                <div className='row my-2'>
                    <label htmlFor="inputPassword" className='col-sm-2 col-form-label'>Password</label>
                    <div className='col-sm-4'>
                        <input type="password" name="password" className='form-control' placeholder="password here" id="inputPassword"
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}/>
                    </div>
                </div>
                <div className="row my-2">
                    <div className='col-sm-2'/>
                    <div className='col-auto'>
                        <button type="button" className="btn btn-success" name="login" onClick={handleSubmit} disabled={disableSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}