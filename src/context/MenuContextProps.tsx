import React, { createContext, useContext, useState } from 'react';

interface MenuContextProps {
  isMenuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuVisible, setMenuVisible }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
