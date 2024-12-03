import { THEMES } from "../constants/THEMES";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex flex-col">
      {THEMES.map((t) => (
        <button key={t} onClick={() => setTheme(t)}>
          <span>{t}</span>
        </button>
      ))}

      <div>{theme}</div>
    </div>
  );
};

export default SettingsPage;
