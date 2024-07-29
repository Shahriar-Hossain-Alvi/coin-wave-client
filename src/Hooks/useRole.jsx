import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useRole = () => {

    const  {user} = useContext(AuthContext);

    const role = user?.role;

    if(role === 'admin')
        return [role];
    if(role === 'user') 
        return [role];
    if(role === 'agent')
        return [role];
};

export default useRole;