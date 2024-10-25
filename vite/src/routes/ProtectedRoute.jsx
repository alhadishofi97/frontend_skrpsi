import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requireAuth }) => {
    const token = localStorage.getItem('token');

    // Jika membutuhkan otentikasi
    if (requireAuth) {
        console.log('auth');
        return token ? element : <Navigate to="/pages/login" />;
    }

    // Jika tidak membutuhkan otentikasi
    return token ? <Navigate to="/dashboard/default" /> : element;
};

export default ProtectedRoute;
