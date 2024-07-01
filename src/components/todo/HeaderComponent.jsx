import { Link } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function HeaderComponent(){
    const authContext = useAuth();
    const authenticated = authContext.isAuthenticated;
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold" href="https://www.in28minutes.com">in28minutes</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                {authenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/welcome">Home</Link></li>}
                                {authenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>}
                            </ul>
                        </div>
                        <div>
                            <ul className="navbar-nav">
                                {!authenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
                                {authenticated && <li className="nav-item fs-5" onClick={()=>authContext.logout()}><Link className="nav-link" to="/logout">Logout</Link></li>}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}