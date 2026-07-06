import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const authenticated =
    localStorage.getItem('authenticated');

  return authenticated
    ? children
    : <Navigate to="/login" />;
}