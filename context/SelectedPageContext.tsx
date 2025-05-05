import React, { createContext, useContext, useState } from 'react';

interface SelectedPageContextProps {
  selectedPageContent: string[];
  setSelectedPageContent: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectedPageContext = createContext<SelectedPageContextProps | undefined>(undefined);

export const SelectedPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPageContent, setSelectedPageContent] = useState<string[]>([]);

  return (
    <SelectedPageContext.Provider value={{ selectedPageContent, setSelectedPageContent }}>
      {children}
    </SelectedPageContext.Provider>
  );
};

export const useSelectedPage = () => {
  const context = useContext(SelectedPageContext);
  if (!context) {
    throw new Error('useSelectedPage must be used within a SelectedPageProvider');
  }
  return context;
};