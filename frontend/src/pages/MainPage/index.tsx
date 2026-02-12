import {backendEnvUrl} from "../../system/api/backendEnvUrl.ts";
import {useAuth} from "../../system/context/AuthContext.tsx";
import {useState} from "react";

export default function MainPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const onLogin = () => {
        setLoading(true);
        window.open(backendEnvUrl + "/oauth2/authorization/github", "_self");
    }

    const onLogout = () => {
        window.open(backendEnvUrl + "/logout", "_self");
    }

    return (
        <main className="main">
            <div className="main__card">
                <h1 className="main__app-name">CarAPPName</h1>

                <h1 className="main__title">
                    Title
                </h1>

                <p className="main__subtitle">
                    subtitle
                </p>

                {user ? (
                    <>
                        <div className={"main__user-card"}>
                            <p>Hallo, {user?.username}</p>
                            <img src={user.avatarUrl} className={"user-logo"}/>
                        </div>
                        <button className="main__button" onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <button
                        className="main__button"
                        disabled={loading}
                        onClick={onLogin}
                    >
                        {loading ? "Loading..." : "Login mit GitHub"}
                    </button>
                )}
            </div>
        </main>
    );
}
