import './Login.css';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../Context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../../Service/AuthService.js';

const Login = () => {
    const {setAuthData} = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({
            ...data,
            [name]: value
        }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        if (!data.email || !data.password) {
            toast.error("email and password are required!!");
            setLoading(false);
            return;
            
        }

        try {
            const response = await login(data);
  
            if (response.status === 200) {
               
                toast.success("logged in successfully!!");

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);

                setAuthData({
                    token: response.data.token,
                    role: response.data.role
                });
                // Redirect to dashboard after successful login
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error in login:", error);
            toast.error("email/password is incorrect!!");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-light d-flex align-item-center justify-content-center vh-100 login-background'>
            <div className="card shadow-lgw-100" style={{maxWidth: '480px'}}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className='card-title'>Sign in</h1>
                        <p className='card-text text-muted'>
                            Sign in below to access your account
                        </p>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-4">
                                <label htmlFor="email" className='form-label text-muted'>Email address</label>
                                <input type="email" className='form-control' id="email" name='email' placeholder='Email address' onChange={onChangeHandler} value={data.email} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className='form-label text-muted'>Password</label>
                                <input type="password" className='form-control' id="password" name='password' placeholder='************' onChange={onChangeHandler} value={data.password}/>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-dark btn-lg w-40" disabled={loading}>{loading ? "loadin..." : "Sign in"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Login;