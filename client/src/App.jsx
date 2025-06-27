import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Menubar from './components/Menubar';
import Dashboard from './Pages/Dashboard/Dashboard';
import ManageCategory from './Pages/ManageCategory/ManageCategory';
import ManageUser from './Pages/ManageUser/ManageUser';
import ManageItem from './Pages/ManageItem/ManageItem';
import Explore from './Pages/Explore/Explore';
import NotFound from './Pages/NotFound/NotFound';
import SplashScreen from './Pages/Loader/SplashScreen';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login/Login';
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import { useContext, useEffect } from 'react';
import { AppContext } from './Context/AppContext.jsx';

const App = () => {

  const location = useLocation();
  const {auth} = useContext(AppContext);

  const LoginRoute = ({element}) => {
    if(auth.token) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  }

  const ProtectedRoute = ({element, allowedRoles}) => {
    if(!auth.token) {
      return <Navigate to="/login" replace/>;
    }

    if(allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return element;
  }

  useEffect(() => {
    console.log("Auth in App.jsx", auth);
  }, [auth]);


  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/" && <Menubar />}
      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />

        <Route path="/category" element={<ProtectedRoute element={<ManageCategory />} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path="/users" element={<ProtectedRoute element={<ManageUser />} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path="/items" element={<ProtectedRoute element={<ManageItem />} allowedRoles={['ROLE_ADMIN']} />} />

        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
