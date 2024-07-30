import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useRole = () => {

    const { user } = useContext(AuthContext);

    if (!user) return ['']

    const role = user?.role || '';

    if (role === 'admin' || role === 'user' || role === 'agent')
        return [role];

    return [''];
};

export default useRole;