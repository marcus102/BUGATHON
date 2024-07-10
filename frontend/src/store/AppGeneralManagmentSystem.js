import React, { createContext, useReducer } from 'react';

export const ManagmentSystem = createContext({
  overlay: { open: false, keyId: '', layout: '' },
  overlayHandler: (key, layout) => {},
  currentAuthStatus: '',
  currentAuthStatusHandler: (parameters) => {},
  headerTab: '',
  headerTabHandler: (parameters) => {},
  sideBar: { theme: 'dark', isOpen: true },
  sideBarHandler: ({ theme, isOpen }) => {},
  profileSideBarButton: '',
  profileSideBarButtonHandler: (parameters) => {},
  settingSideBarButton: '',
  settingSideBarButtonHandler: (parameters) => {},
  dropDownDefault: {
    assigned_bug: 'All',
    notification: 'All',
    comment: 'All',
    create_new: 'Bug Report',
  },
  dropDownDefaultHandler: ({
    assigned_bug,
    notification,
    comment,
    create_new,
    browser,
    device,
    severity,
  }) => {},
});

export default function ManagmentSystemProvider({ children }) {
  const initialState = {
    overlay: { open: false, keyId: '', layout: '' },
    currentAuthStatus: 'signIn',
    headerTab: 'all',
    sideBar: { theme: 'dark', isOpen: true },
    profileSideBarButton: 'General',
    settingSideBarButton: 'General Profile',
    dropDownDefault: {
      assigned_bug: 'All',
      notification: 'All',
      comment: 'All',
      create_new: 'Bug Report',
      browser: 'Chrome',
      device: 'Desktop',
      severity: 'Low',
    },
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
      case 'SET_SIDE_BAR':
        return {
          ...state,
          sideBar: {
            theme:
              action.payload.theme !== null && action.payload.theme !== undefined
                ? action.payload.theme
                : state.sideBar.theme,
            isOpen:
              action.payload.isOpen !== null && action.payload.isOpen !== undefined
                ? action.payload.isOpen
                : state.sideBar.isOpen,
          },
        };
      case 'SET_PROFILE_SIDEBAR_BUTTON':
        return {
          ...state,
          profileSideBarButton: action.payload,
        };
      case 'SET_SETTING_SIDEBAR_BUTTON':
        return {
          ...state,
          settingSideBarButton: action.payload,
        };
      case 'SET_DROPDOWN_DEFAULT':
        return {
          ...state,
          dropDownDefault: {
            ...state.dropDownDefault,
            ...(action.payload.assigned_bug !== undefined && {
              assigned_bug: action.payload.assigned_bug,
            }),
            ...(action.payload.notification !== undefined && {
              notification: action.payload.notification,
            }),
            ...(action.payload.comment !== undefined && { comment: action.payload.comment }),
            ...(action.payload.create_new !== undefined && {
              create_new: action.payload.create_new,
            }),
            ...(action.payload.browser !== undefined && {
              browser: action.payload.browser,
            }),
            ...(action.payload.device !== undefined && {
              device: action.payload.device,
            }),
            ...(action.payload.severity !== undefined && {
              severity: action.payload.severity,
            }),
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

  const sideBarHandler = ({ theme, isOpen }) => {
    dispatch({ type: 'SET_SIDE_BAR', payload: { theme, isOpen } });
  };

  const profileSideBarButtonHandler = (parameters) => {
    dispatch({ type: 'SET_PROFILE_SIDEBAR_BUTTON', payload: parameters });
  };

  const settingSideBarButtonHandler = (parameters) => {
    dispatch({ type: 'SET_SETTING_SIDEBAR_BUTTON', payload: parameters });
  };

  const dropDownDefaultHandler = ({
    assigned_bug,
    notification,
    comment,
    create_new,
    browser,
    device,
    severity,
  }) => {
    dispatch({
      type: 'SET_DROPDOWN_DEFAULT',
      payload: { assigned_bug, notification, comment, create_new, browser, device, severity },
    });
  };

  const value = {
    overlay: state.overlay,
    overlayHandler: overlayHandler,
    currentAuthStatus: state.currentAuthStatus,
    currentAuthStatusHandler: currentAuthStatusHandler,
    headerTab: state.headerTab,
    headerTabHandler: headerTabHandler,
    sideBar: state.sideBar,
    sideBarHandler: sideBarHandler,
    profileSideBarButton: state.profileSideBarButton,
    profileSideBarButtonHandler: profileSideBarButtonHandler,
    settingSideBarButton: state.settingSideBarButton,
    settingSideBarButtonHandler: settingSideBarButtonHandler,
    dropDownDefault: state.dropDownDefault,
    dropDownDefaultHandler: dropDownDefaultHandler,
  };

  return <ManagmentSystem.Provider value={value}>{children}</ManagmentSystem.Provider>;
}
