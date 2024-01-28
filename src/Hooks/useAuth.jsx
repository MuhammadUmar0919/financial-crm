// react import
import { useContext } from 'react';
// context import
import { AuthContext } from 'Context/AuthContext';

export const useAuth = () => useContext(AuthContext)
