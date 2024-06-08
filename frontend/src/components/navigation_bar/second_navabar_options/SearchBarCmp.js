import React from 'react';
import classes from './SearchBarCmp.module.css';
import {
  faDesktop,
  faFile,
  faGear,
  faHome,
  faMoon,
  faQuestionCircle,
  faSun,
  faUser,
  faArrowUpRightArrowDownLeftFromCenter,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';

const SEARCH_DROP_DOWN = [
  {
    id: 'Quick Actions',
    children: [
      { id: '1', title: 'Home', icon: faHome },
      { id: '2', title: 'Settings', icon: faGear },
      { id: '3', title: 'Help', icon: faQuestionCircle },
    ],
  },
  {
    id: 'Theme',
    children: [
      { id: '1', title: 'Light Mode', icon: faSun },
      { id: '2', title: 'Night Mode', icon: faMoon },
      { id: '3', title: 'System Mode', icon: faDesktop },
    ],
  },
  {
    id: 'APIs',
    children: [
      { id: '1', title: 'API 1', icon: faArrowUpRightArrowDownLeftFromCenter },
      { id: '2', title: 'API 2', icon: faArrowUpRightArrowDownLeftFromCenter },
      { id: '3', title: 'API 3', icon: faArrowUpRightArrowDownLeftFromCenter },
    ],
  },
  {
    id: 'Docs',
    children: [
      { id: '1', title: 'Doc 1', icon: faFile },
      { id: '2', title: 'Doc 2', icon: faFile },
      { id: '3', title: 'Doc 3', icon: faFile },
    ],
  },
  {
    id: 'Account',
    children: [{ id: '1', title: '@marcus ', icon: faUser }],
  },
  {
    id: 'Services',
    children: [
      { id: '1', title: 'Service 1', icon: faHandshake },
      { id: '2', title: 'Service 2', icon: faHandshake },
      { id: '3', title: 'Service 3', icon: faHandshake },
    ],
  },
  {
    id: 'Other',
    children: [
      { id: '1', title: 'Other 1', icon: null },
      { id: '2', title: 'Other 2', icon: null },
      { id: '3', title: 'Other 3', icon: null },
    ],
  },
];

function SearchBar() {}

export default SearchBar;
