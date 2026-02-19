import {Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import NotFound from "../../pages/NotFound";

export default function ProtectedRoute() {
    const { user } = useAuth();

    if (user === undefined) {
        return <div>Loading...</div>
    }

    return (user ? <Outlet/> : <NotFound/>)
}