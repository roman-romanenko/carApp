import {Link} from 'react-router-dom';
import {APP_ROUTES} from "../../../system/router/constants.ts";
import {useAuth} from "../../../system/context/AuthContext.tsx";
import {backendEnvUrl} from "../../../system/api/backendEnvUrl.ts";
import {useState} from "react";
import Button from "../../atoms/Button";
import ThemeToggle from "../../atoms/ThemeToggle";
import HeaderMenu from "../../molecules/HeaderMenu";

export default function Header() {
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
        <header className="header">
            <div className="header-left">
                <Link to={APP_ROUTES.index} className="logo">
                    CarApp
                </Link>
            </div>

            <div className="header-right">
                <ThemeToggle />
                {/*{user && (*/}
                {/*    <Link to={APP_ROUTES.favorites.index} className="favorites-button">*/}
                {/*        ❤️ Favorites {favorites?.length > 0 && `(${favorites.length})`}*/}
                {/*    </Link>*/}
                {/*)}*/}

                {user && (
                    <Link to={APP_ROUTES.ads.create}>
                        <Button
                            className="header__add-button"
                            text="+ Add Ad"
                        />
                    </Link>
                )}

                {!user ? (
                    <Button
                        className="header__login-button"
                        disabled={loading}
                        onClick={onLogin}
                        text={loading ? "Loading..." : "Login with GitHub"}
                    />
                ) : (
                    <HeaderMenu
                        user={user}
                        onLogout={onLogout}
                    />
                )}
            </div>
        </header>
    );
}
