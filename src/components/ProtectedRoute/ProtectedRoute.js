import { Navigate } from "react-router-dom";

function ProtectedRoute ({children, isAuth, loading}) {

    if (!loading && !isAuth) return <Navigate to="/" replace/>

    if (loading) return null;

    return children;
}

export default ProtectedRoute;