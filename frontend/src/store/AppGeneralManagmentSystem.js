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
});

export default function ManagmentSystemProvider({ children }) {
  const initialState = {
    overlay: { open: false, keyId: '', layout: '' },
    currentAuthStatus: 'signIn',
    headerTab: 'all',
    theme: 'dark',
    currentButtonPosition: { top: 0, left: 0 },
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
  };

  return <ManagmentSystem.Provider value={value}>{children}</ManagmentSystem.Provider>;
}

// import React, { createContext, useState, useReducer } from 'react';

// export const ManagmentSystem = createContext({
//   overlay: { open: false, keyId: '', layout: '' },
//   overlayHandler: (key, layout) => {},
//   currentAuthStatus: '',
//   currentAuthStatusHandler: (parameters) => {},
//   headerTab: '',
//   headerTabHandler: (parameters) => {},
//   theme: '',
//   themeHandler: (parameters) => {},
//   currentButtonPosition: { top: 0, left: 0 },
//   handleCurrentButtonPosition: () => {},
// });

// // function RegistrationManagmentReducer(state, action) {}

// // function SystemManagmentReducer(state, action) {}

// export default function ManagmentSystemProvider({ children }) {
//   // const [userRegistration, dispatch_auth] = useReducer(RegistrationManagmentReducer, []);
//   // const [systemManagement, dispatch_system] = useReducer(SystemManagmentReducer, []);
//   const [isOverlayOpen, setIsOverlayOpen] = useState({ open: false, overlay: '' });
//   const [authSatus, setAuthStatus] = useState('signIn');
//   const [currentHeaderTab, setCurrentHeaderTab] = useState('all');
//   const [systemTheme, setSystemTheme] = useState('dark');
//   const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

//   const handleCurrentButtonPosition = (parameters) => {
//     setButtonPosition((prev) => ({
//       ...prev,
//       top: parameters.top + window.scrollY,
//       left: parameters.left + window.scrollX,
//     }));
//   };

//   const themeHandler = (parameters) => {
//     setSystemTheme(parameters);
//   };

//   const headerTabHandler = (parameters) => {
//     setCurrentHeaderTab(parameters);
//   };

//   // function userSignUp(key, value) {
//   //   try {
//   //     AsyncStorage.setItem(key.toString(), value.toString());
//   //     dispatch({
//   //       type: 'USER_SIGNUP',
//   //       payload: { [key]: value },
//   //     });
//   //   } catch (error) {
//   //     throw error.message;
//   //   }
//   // }

//   const currentAuthStatusHandler = (parameters) => {
//     setAuthStatus(parameters);
//   };

//   const overlayHandler = (keyId, layout) => {
//     setIsOverlayOpen((prev) => ({
//       ...prev,
//       open: !prev.open,
//       keyId,
//       layout,
//     }));
//   };

//   const value = {
//     overlay: isOverlayOpen,
//     overlayHandler: overlayHandler,
//     currentAuthStatus: authSatus,
//     currentAuthStatusHandler: currentAuthStatusHandler,
//     headerTab: currentHeaderTab,
//     headerTabHandler: headerTabHandler,
//     theme: systemTheme,
//     themeHandler: themeHandler,
//     currentButtonPosition: buttonPosition,
//     handleCurrentButtonPosition: handleCurrentButtonPosition,
//   };

//   return <ManagmentSystem.Provider value={value}>{children}</ManagmentSystem.Provider>;
// }
