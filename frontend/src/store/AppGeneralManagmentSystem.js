import React, { createContext, useReducer } from 'react';

export const ManagmentSystem = createContext({
  overlay: { open: false, keyId: '', layout: '' },
  overlayHandler: (key, layout) => {},
  currentAuthStatus: '',
  currentAuthStatusHandler: (parameters) => {},
  headerTab: '',
  headerTabHandler: (parameters) => {},
  theme: '',
  themeHandler: (parameters) => {},
  currentButtonPosition: { top: 0, left: 0 },
  handleCurrentButtonPosition: () => {},
  profileSideBarButton: '',
  profileSideBarButtonHandler: (parameters) => {},
});

export default function ManagmentSystemProvider({ children }) {
  const initialState = {
    overlay: { open: false, keyId: '', layout: '' },
    currentAuthStatus: 'signIn',
    headerTab: 'all',
    theme: 'dark',
    currentButtonPosition: { top: 0, left: 0 },
    profileSideBarButton: 'General',
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'OVERLAY_TOGGLE':
        return {
          ...state,
          overlay: {
            ...state.overlay,
            open: !state.overlay.open,
            keyId: action.payload.keyId,
            layout: action.payload.layout,
          },
        };
      case 'SET_AUTH_STATUS':
        return {
          ...state,
          currentAuthStatus: action.payload,
        };
      case 'SET_HEADER_TAB':
        return {
          ...state,
          headerTab: action.payload,
        };
      case 'SET_THEME':
        return {
          ...state,
          theme: action.payload,
        };
      case 'SET_BUTTON_POSITION':
        return {
          ...state,
          currentButtonPosition: {
            top: action.payload.top + window.scrollY,
            left: action.payload.left + window.scrollX,
          },
        };
      case 'SET_PROFILE_SIDEBAR_BUTTON':
        return {
          ...state,
          profileSideBarButton: action.payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const overlayHandler = (keyId, layout) => {
    dispatch({ type: 'OVERLAY_TOGGLE', payload: { keyId, layout } });
  };

  const currentAuthStatusHandler = (parameters) => {
    dispatch({ type: 'SET_AUTH_STATUS', payload: parameters });
  };

  const headerTabHandler = (parameters) => {
    dispatch({ type: 'SET_HEADER_TAB', payload: parameters });
  };

  const themeHandler = (parameters) => {
    dispatch({ type: 'SET_THEME', payload: parameters });
  };

  const handleCurrentButtonPosition = (parameters) => {
    dispatch({ type: 'SET_BUTTON_POSITION', payload: parameters });
  };

  const profileSideBarButtonHandler = (parameters) => {
    dispatch({ type: 'SET_PROFILE_SIDEBAR_BUTTON', payload: parameters });
  };

  const value = {
    overlay: state.overlay,
    overlayHandler: overlayHandler,
    currentAuthStatus: state.currentAuthStatus,
    currentAuthStatusHandler: currentAuthStatusHandler,
    headerTab: state.headerTab,
    headerTabHandler: headerTabHandler,
    theme: state.theme,
    themeHandler: themeHandler,
    currentButtonPosition: state.currentButtonPosition,
    handleCurrentButtonPosition: handleCurrentButtonPosition,
    profileSideBarButton: state.profileSideBarButton,
    profileSideBarButtonHandler: profileSideBarButtonHandler,
  };

  return <ManagmentSystem.Provider value={value}>{children}</ManagmentSystem.Provider>;
}
