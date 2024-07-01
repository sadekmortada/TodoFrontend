
import { Link } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent(){
    const authContext = useAuth();

    return (
        <div className="Welcome">
            Welcome {authContext.username} <Link to='/todos'>Manage Todos</Link>
            {/* <div>
                <button className="btn btn-success" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div> */}
        </div>
    )
}