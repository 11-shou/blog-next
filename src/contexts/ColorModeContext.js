import { createContext, useContext, useState } from 'react';

const ColorModeContext = createContext({
  isDark: false,
  setIsDark: () => {},
});

export function ColorModeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <ColorModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
} 