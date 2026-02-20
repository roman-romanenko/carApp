import {useTheme} from "../../../system/theme/hooks.ts";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
          <span className="theme-toggle__icon">
            {theme === "dark" ? "☀️" : "🌙"}
          </span>
        </button>
    );
};

export default ThemeToggle;