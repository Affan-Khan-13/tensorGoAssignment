import React, { createContext, useContext, useEffect, useReducer } from 'react';
import getUserById from '../utils/getUserById';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const initialState = {
    user: null,
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            // console.log('Setting user:', action.payload);
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const getuser = async () => {
            const storedUserData = localStorage.getItem('userId');
            if (storedUserData) {
                try {
                    const { user } = await getUserById(storedUserData);
                    // console.log(user, "in context");
                    dispatch({ type: 'SET_USER', payload: user });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        getuser();
    }, []);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
