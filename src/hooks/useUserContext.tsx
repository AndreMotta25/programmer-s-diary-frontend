import {useContext} from 'react'
import {UserContext} from '../context/User'


export const useUserContext = () => useContext(UserContext);