import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Spinners from '../Spinners/Spinners';

const RequireAuth = ({ children }) => {
    let location = useLocation();
    const [user, loading] = useAuthState(auth);
    if(loading){
        return <Spinners></Spinners>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;