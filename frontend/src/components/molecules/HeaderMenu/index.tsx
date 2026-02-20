import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../../system/router/constants.ts";
import type {HeaderMenuProps} from "./types.ts";

const HeaderMenu = ({
    user,
    onLogout
}: HeaderMenuProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const closeMenu = () => setDropdownOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleHeaderMenuOpenClick = () => {
        setDropdownOpen(prev => !prev)
    }

    return (
        <div className="user-header-menu" ref={dropdownRef}>
            <button className="user-box" onClick={handleHeaderMenuOpenClick}>
                <img src={user.avatarUrl} alt="avatar" className="user-avatar"/>
                <span className="user-name">{user.username}</span>
            </button>

            {dropdownOpen && (
                <div className="header-menu-dropdown">
                    <NavLink
                        to={APP_ROUTES.profile.index}
                        className="header-menu-item"
                        onClick={closeMenu}
                    >
                        My Cabinet
                    </NavLink>

                    <button
                        onClick={() => {
                            closeMenu();
                            onLogout();
                        }}
                        className="header-menu-item logout"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeaderMenu;
