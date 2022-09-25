import React, { useContext } from 'react';
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
 
const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {pathname:location} = useLocation();
    return (     
            loggedInUser.email? children : <Navigate to='/login' state={{from: location}} replace />  
    );
};

export default PrivateRoute;