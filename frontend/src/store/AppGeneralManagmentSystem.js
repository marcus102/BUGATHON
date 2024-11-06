import React, { createContext, useReducer } from 'react';

export const ManagmentSystem = createContext({
  overlay: { open: false, keyId: '' },
  overlayHandler: (key) => {},
  currentAuthStatus: '',
  currentAuthStatusHandler: (parameters) => {},
  headerTab: '',
  headerTabHandler: (parameters) => {},
  sideBar: { theme: '', isOpen: true },
  sideBarHandler: ({ theme, isOpen }) => {},
  profileSideBarButton: '',
  profileSideBarButtonHandler: (parameters) => {},
  settingSideBarButton: '',
  settingSideBarButtonHandler: (parameters) => {},
  dropDownDefault: {
    assigned_bug: '',
    notification: '',
    comment: '',
    create_new: '',
    browser: '',
    device: '',
    programming_language: '',
    category: '',
    topic: '',
    severity: '',
    email_visibility: '',
    email_type: '',
  },
  dropDownDefaultHandler: ({
    assigned_bug,
    notification,
    comment,
    create_new,
    browser,
    device,
    severity,
    email_visibility,
    email_type,
  }) => {},
  currentProfileId: '',
  currentProfileIdHandler: (parameters) => {},
  usersList: [],
  usersListHandler: (parameters) => {},
  userBugReportsList: [],
  userBugReportsListHandler: (parameters) => {},
  userBugFixesList: [],
  userBugFixesListHandler: (parameters) => {},
  userReusableCodesList: [],
  userReusableCodesListHandler: (parameters) => {},
  userBlogPostsList: [],
  userBlogPostsListHandler: (parameters) => {},
  myProfileImg: '',
  myProfileImgHandler: (parameters) => {},
  dropDownIsOpen: '',
  dropDownIsOpenHandler: (parameters) => {},
  headerOption: {
    viewMoreClick: '',
    clickedButton: '',
  },
  headerOptionHandler: (parameters) => {},
  systemTheme: 'system_mode',
  systemThemeHandler: (parameters) => {},
});

export default function ManagmentSystemProvider({ children }) {
  const initialState = {
    overlay: { open: false, keyId: '' },
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
      device: 'all',
      programming_language: 'all',
      category: 'all',
      severity: 'Low',
      email_visibility: '',
      email_type: '',
    },
    currentProfileId: '',
    myProfileImg: '',
    usersList: [],
    userBugReportsList: [],
    userBugFixesList: [],
    userReusableCodesList: [],
    userBlogPostsList: [],
    dropDownIsOpen: '',
    headerOption: {
      viewMoreClick: '',
      clickedButton: '',
    },
    systemTheme: 'dark_mode',
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
            ...(action.payload.email_visibility !== undefined && {
              email_visibility: action.payload.email_visibility,
            }),
            ...(action.payload.email_type !== undefined && {
              email_type: action.payload.email_type,
            }),
            ...(action.payload.category !== undefined && {
              category: action.payload.category,
            }),
            ...(action.payload.programming_language !== undefined && {
              programming_language: action.payload.programming_language,
            }),
          },
        };
      case 'SET_CURRENT_PROFILE_ID':
        return {
          ...state,
          currentProfileId: action.payload,
        };
      case 'SET_PROFILE_IMG':
        return {
          ...state,
          myProfileImg: action.payload,
        };
      case 'SET_USER':
        return {
          ...state,
          usersList: action.payload,
        };
      case 'SET_USER_BUG_REPORTS':
        return {
          ...state,
          userBugReportsList: action.payload,
        };
      case 'SET_USER_BUG_FIXES':
        return {
          ...state,
          userBugReportsList: action.payload,
        };
      case 'SET_USER_REUSABLE_CODES':
        return {
          ...state,
          userReusableCodesList: action.payload,
        };
      case 'SET_USER_BLOG_POSTS':
        return {
          ...state,
          userBlogPostsList: action.payload,
        };
      case 'SET_DROPDOWN_IS_OPEN':
        return {
          ...state,
          dropDownIsOpen: action.payload,
        };
      case 'SET_HEADER_OPTION':
        return {
          ...state,
          headerOption: {
            ...state.headerOption,
            ...(action.payload.viewMoreClick !== undefined && {
              viewMoreClick: action.payload.viewMoreClick,
            }),
            ...(action.payload.clickedButton !== undefined && {
              clickedButton: action.payload.clickedButton,
            }),
          },
        };
      case 'SET_SYSTHEM_THEME':
        return {
          ...state,
          systemTheme: action.payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const overlayHandler = (keyId) => {
    dispatch({ type: 'OVERLAY_TOGGLE', payload: { keyId } });
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
    email_visibility,
    email_type,
    category,
    programming_language,
  }) => {
    dispatch({
      type: 'SET_DROPDOWN_DEFAULT',
      payload: {
        assigned_bug,
        notification,
        comment,
        create_new,
        browser,
        device,
        severity,
        email_visibility,
        email_type,
        category,
        programming_language,
      },
    });
  };

  const currentProfileIdHandler = (parameters) => {
    dispatch({ type: 'SET_CURRENT_PROFILE_ID', payload: parameters });
  };

  const myProfileImgHandler = (parameters) => {
    dispatch({ type: 'SET_PROFILE_IMG', payload: parameters });
  };

  const usersListHandler = (parameters) => {
    dispatch({ type: 'SET_USER', payload: parameters });
  };

  const userBugReportsListHandler = (parameters) => {
    dispatch({ type: 'SET_USER_BUG_REPORTS', payload: parameters });
  };

  const userBugFixesListHandler = (parameters) => {
    dispatch({ type: 'SET_USER_BUG_FIXES', payload: parameters });
  };

  const userReusableCodesListHandler = (parameters) => {
    dispatch({ type: 'SET_USER_REUSABLE_CODES', payload: parameters });
  };

  const userBlogPostsListHandler = (parameters) => {
    dispatch({ type: 'SET_USER_BLOG_POSTS', payload: parameters });
  };

  const dropDownIsOpenHandler = (parameters) => {
    dispatch({ type: 'SET_DROPDOWN_IS_OPEN', payload: parameters });
  };

  const headerOptionHandler = ({ viewMoreClick, clickedButton }) => {
    dispatch({ type: 'SET_HEADER_OPTION', payload: { viewMoreClick, clickedButton } });
  };

  const systemThemeHandler = (parameters) => {
    dispatch({
      type: 'SET_SYSTHEM_THEME',
      payload: parameters,
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
    currentProfileId: state.currentProfileId,
    currentProfileIdHandler: currentProfileIdHandler,
    usersList: state.usersList,
    usersListHandler: usersListHandler,
    userBugReportsList: state.userBugReportsList,
    userBugReportsListHandler: userBugReportsListHandler,
    userBugFixesList: state.userBugReportsList,
    userBugFixesListHandler: userBugFixesListHandler,
    userReusableCodesList: state.userReusableCodesList,
    userReusableCodesListHandler: userReusableCodesListHandler,
    userBlogPostsList: state.userBlogPostsList,
    userBlogPostsListHandler: userBlogPostsListHandler,
    myProfileImg: state.myProfileImg,
    myProfileImgHandler: myProfileImgHandler,
    dropDownIsOpen: state.dropDownIsOpen,
    dropDownIsOpenHandler: dropDownIsOpenHandler,
    headerOption: state.headerOption,
    headerOptionHandler: headerOptionHandler,
    systemTheme: state.systemTheme,
    systemThemeHandler: systemThemeHandler,
  };

  return <ManagmentSystem.Provider value={value}>{children}</ManagmentSystem.Provider>;
}
