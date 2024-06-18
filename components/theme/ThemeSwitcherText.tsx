import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcherText = ({ children }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }
  const themeClass = (theme || resolvedTheme) === 'light' ? 'text-black' : 'text-white';

  return (
    <div className={themeClass}>
      {children}
    </div>
  );
};

export default ThemeSwitcherText;
