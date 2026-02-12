import {Navigate, Outlet} from "react-router-dom";
import {APP_ROUTES} from "./constants.ts";
import {useAuth} from "../context/AuthContext.tsx";

export default function ProtectedRoute() {
    const { user } = useAuth();

    if (user === undefined) {
        return <div>Loading...</div>
    }

    return (user ? <Outlet/> : <Navigate to={APP_ROUTES.index}/>)
}