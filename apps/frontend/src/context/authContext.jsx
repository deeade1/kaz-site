import React, { createContext, useReducer, useMemo } from 'react';
import { jwtDecode } from "jwt-decode";

// Get token once
const token = localStorage.getItem("token");
let user = null;

// Token validation
if (token) {
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
            user = decodedToken;
        } else {
            localStorage.removeItem("token");
        }
    } catch (error) {
        localStorage.removeItem("token");
    }
}

// Initial state
const initialState = { user };

// Context
const AuthContext = createContext();

// Reducer
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
}

// Provider
function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        dispatch({ type: 'LOGIN', payload: userData });
    };

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: 'LOGOUT' });
    };

    // Memoize value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        user: state.user,
        login,
        logout,
    }), [state.user]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
