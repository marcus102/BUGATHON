import React, { createContext, useState } from 'react';

export const ManagmentSystem = createContext({
  overlay: { open: false, keyId: '', layout: '' },
  overlayHandler: (key, layout) => {},
  currentAuthStatus: '',
  currentAuthStatusHandler: (parameters) => {},
  headerTab: '',
  headerTabHandler: (parameters) => {},
  theme: '',
  themeHandler: (parameters) => {},
});

// function SystemManagmentReducer(state, action) {}

export default function ManagmentSystemProvider({ children }) {
  // const [userRegistration, dispatch] = useReducer(SystemManagmentReducer, []);
  const [isOverlayOpen, setIsOverlayOpen] = useState({ open: false, overlay: '' });
  const [authSatus, setAuthStatus] = useState('signIn');
  const [currentHeaderTab, setCurrentHeaderTab] = useState('all');
  const [systemTheme, setSystemTheme] = useState('dark');

  const themeHandler = (parameters) => {
    setSystemTheme(parameters);
  };

  const headerTabHandler = (parameters) => {
    setCurrentHeaderTab(parameters);
  };

  const currentAuthStatusHandler = (parameters) => {
    setAuthStatus(parameters);
  };

  const overlayHandler = (keyId, layout) => {
    setIsOverlayOpen((prev) => ({
      ...prev,
      open: !prev.open,
      keyId,
      layout,
    }));
  };

  const value = {
    overlay: isOverlayOpen,
    overlayHandler: overlayHandler,
    currentAuthStatus: authSatus,
    currentAuthStatusHandler: currentAuthStatusHandler,
    headerTab: currentHeaderTab,
    headerTabHandler: headerTabHandler,
    theme: systemTheme,
    themeHandler: themeHandler,
  };

  return <ManagmentSystem.Provider value={value}>{children}</ManagmentSystem.Provider>;
}
