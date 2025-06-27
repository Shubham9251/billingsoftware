import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext.jsx';
import { assets } from '../assets/logo';
import './Menubar.css';

const Manubar = () => {
    const { setAuthData, auth} = useContext(AppContext);
    const location = useLocation();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        setAuthData(null, null);

    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    const isAdmin = auth.role === "ROLE_ADMIN";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <a className="navbar-brand" href="#">
                <img src={assets.logo} alt="Logo" height="40" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-2" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/dashboard') ? 'fw-bold text-warning': ''}`} to="/dashboard">DASHBORD</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/explore') ? 'fw-bold text-warning': ''}`} to="/explore">EXPLORE</Link>
                    </li>
                    {
                        isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/items') ? 'fw-bold text-warning': ''}`} to="/items">MANAGE ITEMS</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/category') ? 'fw-bold text-warning': ''}`} to="/category">MANAGE CATEGORIES</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/users') ? 'fw-bold text-warning': ''}`} to="/users">MANAGE USER</Link>
                                </li>
                            </>
                        )      
                    }
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/orders') ? 'fw-bold text-warning': ''}`} to="/orders">Order History</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                   <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={assets.user} alt="User" height={30} width={30} />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item" to="/login" onClick={logout}>Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}


export default Manubar;
