import Lottie from 'react-lottie';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import loadingAnimation from "../assets/Animations/LoadingAnimation.json"
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [role] = useRole();


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    if (loading) {
        return <div className='min-h-screen'>
            <Lottie options={defaultOptions} />
        </div>
    }

    if (user && role === 'admin') return children;

    return (
        <Navigate to='/login' state={{ from: location }}></Navigate>
    )
};


AdminRoute.propTypes = {
    children: PropTypes.any
}

export default AdminRoute;