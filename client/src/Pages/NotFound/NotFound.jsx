import './NotFound.css';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Opps! Page not found</h2>
                <p className="not-found-message">
                    The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
                </p>
                <button className="not-found-button" onClick={() => navigate('/Dashboard')}>
                    Go to Homepage
                </button>
            </div>
        </div>
    )
}

export default NotFound;