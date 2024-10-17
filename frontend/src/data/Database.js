import Colors from '../constants/colors';
import {
  faHeart,
  faComment,
  faThumbTack,
  faArrowUpFromBracket,
  faPen,
  faCaretRight,
  faClipboard,
  faUser,
  faShareNodes,
  faFaceGrinStars,
  faEyeSlash,
  faTrashCan,
  faExclamation,
  faExclamationCircle,
  faCaretDown,
  faChartSimple,
  faCaretUp,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import profile1 from '../assets/images/dev1.svg';
import profile2 from '../assets/images/dev2.svg';
import profile3 from '../assets/images/dev3.svg';
import profile4 from '../assets/images/dev4.svg';
import profile5 from '../assets/images/dev5.svg';
import profile6 from '../assets/images/dev6.svg';
import profile7 from '../assets/images/dev7.svg';

// Dummy data generation function
const generateRandomDate = () =>
  new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)).toISOString();

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const DUMMY_TAG_DATA = [
  {
    id: '1',
    button: 'java',
    about:
      'versatile, object-oriented programming language for building cross-platform applications.',
    color: Colors.yellow_a99000,
  },
  {
    id: '2',
    button: 'python',
    about: 'versatile, readable, powerful language for web development, data science, automation.',
    color: Colors.blue_57a3fb,
  },
  {
    id: '3',
    button: 'C++',
    about: 'versatile, readable, powerful language for web development, data science, automation.',
    color: Colors.gray_aaaaaa5e,
  },
  { id: '4', button: '...', about: 'Click for more...', color: Colors.gray_aaaaaa5e },
];

export const CARD_VIEW_OPTION = [
  { id: '2', icon: faClipboard, label: 'Assign bug to', icon_2: faCaretRight, href: null },
  { id: '3', icon: faComment, label: 'Comment', icon_2: null, href: null },
  { id: '4', icon: faShareNodes, label: 'Share', icon_2: null, href: null },
  { id: '5', icon: faEyeSlash, label: 'I do not want to see this', icon_2: null, href: null },
  { id: '7', icon: faExclamation, label: 'Report', icon_2: faCaretRight, href: null },
];

export const CARD_VIEW_OPTION_2 = [
  { id: '1', icon: faPen, label: 'Edit', icon_2: null, href: null },
  { id: '2', icon: faClipboard, label: 'Assign bug to', icon_2: faCaretRight, href: null },
  { id: '3', icon: faComment, label: 'Comment', icon_2: null, href: null },
  { id: '4', icon: faShareNodes, label: 'Share', icon_2: null, href: null },
  { id: '6', icon: faTrashCan, label: 'Delete', icon_2: null, href: null },
];

export const CONTRIBUTION_REACTIONS_DATA = [
  { id: 'like', icon: faHeart, active_color: Colors.red_FF2B2B },
  { id: 'pin', icon: faThumbTack, active_color: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, active_color: Colors.green_039000 },
];

export const CONTRIBUTION_DROP_DOWN = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Pinned' },
  { id: '3', label: 'Trending' },
  { id: '4', label: 'Relevant' },
  { id: '5', label: 'Recent' },
  { id: '6', label: 'Oldest' },
];

export const CONTRIBUTIONS_OPTION = [
  { id: '1', icon: faThumbTack, label: 'Pin', icon_2: null },
  { id: '2', icon: faHeart, label: 'Like', icon_2: null },
  { id: '3', icon: faArrowUpFromBracket, label: 'Share', icon_2: null },
  { id: '4', icon: faTrashCan, label: 'Remove this post', icon_2: null },
  { id: '5', icon: faExclamationCircle, label: 'Report (users only)', icon_2: faCaretDown },
];

export const DUMMY_BUG_REPORT_DATA = [
  {
    id: '1',
    title: 'App crashes on login',
    state: 'bug_report',
    description: {
      title: 'Description',
      content:
        'The app crashes immediately after the user attempts to log in. This issue has been observed on multiple devices running different versions of the OS.',
    },
    bug_report: {
      title: 'Bug Report',
      content:
        'When the user enters their credentials and taps the login button, the app crashes and returns to the home screen.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content:
        '1. Open the app. 2. Enter valid login credentials. 3. Tap the login button. 4. Observe the crash.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'The user should be successfully logged in and redirected to the dashboard.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'The app crashes and the user is not logged in.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '1',
        user: {
          username: 'johndoe',
          profile: profile5,
        },
        date: '2024-07-20T12:01:00Z',
        notification: 'Investigated the issue and found a null pointer exception.',
        type: 'user',
      },
      {
        id: '2',
        user: {
          username: 'janesmith',
          profile: profile2,
        },
        date: '2024-07-20T12:05:00Z',
        notification: 'Reproduced the bug on Android 10 and iOS 14.',
        type: 'user',
      },
      {
        id: '3',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-07-20T12:10:00Z',
        notification: 'Proposed a fix to handle null values in the login response.',
        type: 'user',
      },
    ],
    assignedTo: [
      { username: 'janesmith', profile: profile2 },
      { username: 'alicejohnson', profile: profile3 },
    ],
    user: {
      username: 'johndoe',
      profile: profile5,
    },
    status: 'pending',
    createdAt: '2024-07-20T12:00:00Z',
    totalRatings: 5,
    shareCount: 10,
    likeCount: 25,
    viewCount: 100,
    totalAttempts: 15,
    pinMode: true,
    updatedAt: '2024-07-22T12:00:00Z',
    downloadCount: 50,
    totalComments: '12',
    severity: 'critical',
  },
  {
    id: '6',
    title: 'Crash on opening settings',
    state: 'bug_report',
    description: {
      title: 'Description',
      content:
        'The app crashes when the user tries to open the settings page. This happens on both Android and iOS devices.',
    },
    bug_report: {
      title: 'Bug Report',
      content: 'Tapping the settings icon causes the app to crash and return to the home screen.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content: '1. Open the app. 2. Tap the settings icon. 3. Observe the crash.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'The settings page should open without any issues.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'The app crashes and returns to the home screen.',
    },
    tags: [DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '4',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-07-21T14:31:00Z',
        notification: 'Traced the crash to a missing configuration file.',
        type: 'user',
      },
      {
        id: '5',
        user: {
          username: 'johndoe',
          profile: profile5,
        },
        date: '2024-07-21T14:37:00Z',
        notification: 'Confirmed the crash on both Android and iOS platforms.',
        type: 'user',
      },
      {
        id: '6',
        user: {
          username: 'janesmith',
          profile: profile2,
        },
        date: '2024-07-21T14:45:00Z',
        notification: 'Implemented a check to ensure the configuration file is present.',
        type: 'user',
      },
    ],
    assignedTo: [
      { username: 'johndoe', profile: profile5 },
      { username: 'janesmith', profile: profile2 },
      { username: 'alicejohnson', profile: profile3 },
    ],
    user: {
      username: 'bobwilliams',
      profile: profile4,
    },
    status: 'approved',
    createdAt: '2024-07-21T14:30:00Z',
    totalRatings: 8,
    shareCount: 15,
    likeCount: 30,
    viewCount: 120,
    totalAttempts: 20,
    pinMode: false,
    updatedAt: '2024-07-23T14:30:00Z',
    downloadCount: 40,
    totalComments: '50',
    severity: 'high',
  },
  {
    id: '8',
    title: 'Login fails on slow network',
    state: 'bug_report',
    description: {
      title: 'Description',
      content:
        'Users experience login failures when on a slow network. The app times out before the login process completes.',
    },
    bug_report: {
      title: 'Bug Report',
      content:
        'Login attempts on slow networks result in a timeout error, preventing users from accessing their accounts.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content: '1. Connect to a slow network. 2. Attempt to log in. 3. Observe the timeout error.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content:
        'The app should handle slow network conditions and allow users to log in without errors.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'Login fails with a timeout error on slow networks.',
    },
    tags: [DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '7',
        user: {
          username: 'johndoe',
          profile: profile5,
        },
        date: '2024-07-22T16:01:00Z',
        notification: 'Analyzed network logs to identify the timeout issue.',
        type: 'user',
      },
      {
        id: '8',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-07-22T16:08:00Z',
        notification: 'Tested login functionality on various network speeds.',
        type: 'user',
      },
      {
        id: '9',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-07-22T16:15:00Z',
        notification: 'Optimized network handling to improve login performance.',
        type: 'user',
      },
    ],
    assignedTo: [
      { username: 'johndoe', profile: profile5 },
      { username: 'bobwilliams', profile: profile4 },
      { username: 'janesmith', profile: profile2 },
    ],
    user: {
      username: 'johndoe',
      profile: profile5,
    },
    status: 'rejected',
    createdAt: '2024-07-22T16:00:00Z',
    totalRatings: 2,
    shareCount: 5,
    likeCount: 10,
    viewCount: 60,
    totalAttempts: 8,
    pinMode: false,
    updatedAt: '2024-07-23T16:00:00Z',
    downloadCount: 20,
    totalComments: '15',
    severity: 'medium',
  },
  {
    id: '11',
    title: 'Error when updating settings',
    state: 'bug_report',
    description: {
      title: 'Description',
      content:
        'Users encounter an error message when trying to update their settings. Changes are not saved.',
    },
    bug_report: {
      title: 'Bug Report',
      content:
        'Attempting to update settings results in an error message and no changes are saved.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content:
        '1. Open the app. 2. Go to settings. 3. Try to update any setting. 4. Observe the error message.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'Settings should be updated without any error messages.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'An error message is displayed and settings are not updated.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '10',
        user: {
          username: 'janesmith',
          profile: profile2,
        },
        date: '2024-07-23T10:30:00Z',
        notification: 'Identified a permissions issue causing the error.',
        type: 'user',
      },
      {
        id: '11',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-07-23T10:35:00Z',
        notification: 'Implemented a fix to correct the permissions issue.',
        type: 'user',
      },
      {
        id: '12',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-07-23T10:40:00Z',
        notification: 'Tested the fix to ensure settings update correctly.',
        type: 'user',
      },
    ],
    assignedTo: [
      { username: 'janesmith', profile: profile2 },
      { username: 'alicejohnson', profile: profile3 },
      { username: 'bobwilliams', profile: profile4 },
    ],
    user: {
      username: 'janesmith',
      profile: profile2,
    },
    status: 'pending',
    createdAt: '2024-07-23T10:30:00Z',
    totalRatings: 5,
    shareCount: 10,
    likeCount: 25,
    viewCount: 100,
    totalAttempts: 15,
    pinMode: true,
    updatedAt: '2024-07-24T10:30:00Z',
    downloadCount: 50,
    totalComments: '12',
    severity: 'critical',
  },
  {
    id: '12',
    title: 'UI misalignment on profile page',
    state: 'bug_report',
    description: {
      title: 'Description',
      content: 'The UI elements on the profile page are misaligned, making it difficult to use.',
    },
    bug_report: {
      title: 'Bug Report',
      content:
        'UI elements such as buttons and text fields are not aligned properly on the profile page.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content:
        '1. Open the app. 2. Navigate to the profile page. 3. Observe the misalignment of UI elements.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'UI elements should be properly aligned for a better user experience.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'UI elements are misaligned, causing usability issues.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '13',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-07-24T09:15:00Z',
        notification: 'Detected the issue with misaligned UI elements.',
        type: 'user',
      },
      {
        id: '14',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-07-24T09:20:00Z',
        notification: 'Fixed the alignment of buttons and text fields.',
        type: 'user',
      },
      {
        id: '15',
        user: {
          username: 'johndoe',
          profile: profile5,
        },
        date: '2024-07-24T09:25:00Z',
        notification: 'Verified the alignment fix and ensured all elements are properly aligned.',
        type: 'user',
      },
    ],
    assignedTo: [
      { username: 'alicejohnson', profile: profile3 },
      { username: 'bobwilliams', profile: profile4 },
    ],
    user: {
      username: 'alicejohnson',
      profile: profile3,
    },
    status: 'resolved',
    createdAt: '2024-07-24T09:10:00Z',
    totalRatings: 7,
    shareCount: 12,
    likeCount: 28,
    viewCount: 85,
    totalAttempts: 10,
    pinMode: true,
    updatedAt: '2024-07-25T09:10:00Z',
    downloadCount: 35,
    totalComments: '10',
    severity: 'medium',
  },
  {
    id: '14',
    title: 'Push notifications not received',
    state: 'bug_report',
    description: {
      title: 'Description',
      content: 'Users are not receiving push notifications for new messages or updates.',
    },
    bug_report: {
      title: 'Bug Report',
      content:
        'Push notifications are not being delivered to users, resulting in missed messages and updates.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content:
        '1. Enable push notifications. 2. Send a message or update. 3. Observe the absence of notifications.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'Users should receive push notifications for new messages and updates.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'No push notifications are received.',
    },
    tags: [DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '16',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-07-25T11:10:00Z',
        notification: 'Checked the push notification service configuration.',
        type: 'user',
      },
      {
        id: '17',
        user: {
          username: 'janesmith',
          profile: profile2,
        },
        date: '2024-07-25T11:15:00Z',
        notification: 'Detected a problem with the push notification server.',
        type: 'user',
      },
      {
        id: '18',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-07-25T11:20:00Z',
        notification: 'Fixed the server issue to restore push notifications.',
        type: 'user',
      },
    ],
    assignedTo: [
      { username: 'bobwilliams', profile: profile4 },
      { username: 'janesmith', profile: profile2 },
      { username: 'alicejohnson', profile: profile3 },
    ],
    user: {
      username: 'bobwilliams',
      profile: profile4,
    },
    status: 'resolved',
    createdAt: '2024-07-25T11:05:00Z',
    totalRatings: 6,
    shareCount: 9,
    likeCount: 22,
    viewCount: 78,
    totalAttempts: 12,
    pinMode: false,
    updatedAt: '2024-07-26T11:05:00Z',
    downloadCount: 40,
    totalComments: '8',
    severity: 'high',
  },
  {
    id: '16',
    title: 'Button click does not trigger action',
    state: 'bug_report',
    description: {
      title: 'Description',
      content: 'Clicking on a specific button in the app does not trigger the expected action.',
    },
    bug_report: {
      title: 'Bug Report',
      content:
        'When users click the "Submit" button, no action occurs. This issue is persistent across multiple devices.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content:
        '1. Open the app. 2. Navigate to the form page. 3. Click the "Submit" button. 4. Observe no response.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'The form should be submitted, and the user should receive a confirmation message.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'The button does nothing, and no submission occurs.',
    },
    tags: [DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '16',
        user: {
          username: 'janedoe',
          profile: profile6,
        },
        date: '2024-08-01T12:00:00Z',
        notification: 'Reported the issue with the button not functioning properly.',
        type: 'user',
      },
      {
        id: '17',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-08-01T12:05:00Z',
        notification: 'Investigated the issue and found a missing event listener on the button.',
        type: 'user',
      },
    ],
    assignedTo: [{ username: 'janedoe', profile: profile6 }],
    user: { username: 'janedoe', profile: profile6 },
    status: 'open',
    createdAt: '2024-08-01T11:30:00Z',
    totalRatings: 3,
    shareCount: 5,
    likeCount: 10,
    viewCount: 50,
    totalAttempts: 3,
    pinMode: true,
    updatedAt: '2024-08-02T10:00:00Z',
    downloadCount: 15,
    totalComments: '6',
    severity: 'medium',
  },
  {
    id: '17',
    title: 'Dark mode text not visible',
    state: 'bug_report',
    description: {
      title: 'Description',
      content: 'Text becomes invisible when the app is switched to dark mode on certain pages.',
    },
    bug_report: {
      title: 'Bug Report',
      content:
        'Switching to dark mode causes the text color to match the background, making it unreadable.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content:
        '1. Open the app. 2. Switch to dark mode. 3. Navigate to the profile page. 4. Observe invisible text.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'Text should be clearly visible even in dark mode.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'Text blends with the background, making it hard to read.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[2]],
    contributions: [
      {
        id: '18',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-08-03T13:20:00Z',
        notification: 'Reported the issue with text visibility in dark mode.',
        type: 'user',
      },
      {
        id: '19',
        user: {
          username: 'janesmith',
          profile: profile2,
        },
        date: '2024-08-03T13:30:00Z',
        notification: 'Suggested changing the text color to ensure readability in dark mode.',
        type: 'user',
      },
    ],
    assignedTo: [
      { username: 'alicejohnson', profile: profile3 },
      { username: 'janesmith', profile: profile2 },
    ],
    user: { username: 'alicejohnson', profile: profile3 },
    status: 'open',
    createdAt: '2024-08-03T13:15:00Z',
    totalRatings: 4,
    shareCount: 8,
    likeCount: 15,
    viewCount: 60,
    totalAttempts: 5,
    pinMode: false,
    updatedAt: '2024-08-04T14:00:00Z',
    downloadCount: 20,
    totalComments: '10',
    severity: 'high',
  },
  {
    id: '18',
    title: 'Notifications not appearing',
    state: 'bug_report',
    description: {
      title: 'Description',
      content:
        'Users are not receiving notifications even though they are enabled in the app settings.',
    },
    bug_report: {
      title: 'Bug Report',
      content:
        'Push notifications fail to appear on both Android and iOS devices despite being enabled.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content:
        '1. Enable notifications in the app. 2. Perform an action that triggers a notification. 3. Observe that no notification is received.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'Notifications should appear when triggered, based on app settings.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'No notification is received even when actions trigger them.',
    },
    tags: [DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '20',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-08-05T15:40:00Z',
        notification: 'Noticed that push notifications were not received on any devices.',
        type: 'user',
      },
      {
        id: '21',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-08-05T15:50:00Z',
        notification: 'Found an issue with the notification service configuration.',
        type: 'user',
      },
    ],
    assignedTo: [{ username: 'bobwilliams', profile: profile4 }],
    user: { username: 'bobwilliams', profile: profile4 },
    status: 'open',
    createdAt: '2024-08-05T15:30:00Z',
    totalRatings: 6,
    shareCount: 12,
    likeCount: 20,
    viewCount: 90,
    totalAttempts: 7,
    pinMode: false,
    updatedAt: '2024-08-06T15:00:00Z',
    downloadCount: 25,
    totalComments: '8',
    severity: 'critical',
  },
];

export const DUMMY_BUG_FIX_DATA = [
  {
    id: '2',
    title: 'Fix for login crash issue',
    state: 'bug_fix',
    bug_report: {
      title: 'Bug Report',
      content:
        'The app crashes immediately after the user attempts to log in. This issue has been observed on multiple devices running different versions of the OS.',
    },
    solution: {
      title: 'Solution',
      content:
        'The crash was caused by a null pointer exception when accessing user profile data. Added null checks to prevent the crash.',
    },
    result: {
      title: 'Result',
      content:
        'After implementing the fix, the app no longer crashes on login and users can successfully access their dashboard.',
    },
    description: {
      title: 'Description',
      content: 'Fix applied to handle null pointer exception during login process.',
    },
    tags: [DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '1',
        user: {
          username: 'johndoe',
          profile: profile5,
        },
        date: '2024-07-20T09:01:00Z',
        notification: 'Implemented null checks in the login process.',
        type: 'user',
      },
      {
        id: '2',
        user: {
          username: 'janesmith',
          profile: profile2,
        },
        date: '2024-07-20T09:05:00Z',
        notification: 'Tested the login process with various data inputs.',
        type: 'user',
      },
      {
        id: '3',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-07-20T09:10:00Z',
        notification: 'Verified the fix on multiple devices and OS versions.',
        type: 'user',
      },
    ],
    user: {
      username: 'johndoe',
      profile: profile5,
    },
    status: 'approved',
    createdAt: '2024-07-20T09:00:00Z',
    totalRatings: 9,
    shareCount: 20,
    likeCount: 35,
    viewCount: 150,
    totalAttempts: 25,
    pinMode: true,
    updatedAt: '2024-07-21T09:00:00Z',
    downloadCount: 60,
    totalComments: '120',
  },
  {
    id: '4',
    title: 'Fixed issue with profile update',
    state: 'bug_fix',
    bug_report: {
      title: 'Bug Report',
      content:
        'Users were unable to update their profile information. The app would throw an error and changes were not saved.',
    },
    solution: {
      title: 'Solution',
      content:
        'Updated the API endpoint and fixed the data mapping issue that was causing the error.',
    },
    result: {
      title: 'Result',
      content: 'Users can now successfully update their profile information without any errors.',
    },
    description: {
      title: 'Description',
      content: 'API endpoint and data mapping issue fixed to allow profile updates.',
    },
    tags: [DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '4',
        user: {
          username: 'janesmith',
          profile: profile2,
        },
        date: '2024-07-21T11:01:00Z',
        notification: 'Updated the API endpoint for profile updates.',
        type: 'user',
      },
      {
        id: '5',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-07-21T11:06:00Z',
        notification: 'Tested the profile update functionality.',
        type: 'user',
      },
      {
        id: '6',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-07-21T11:12:00Z',
        notification: 'Resolved the data mapping issue.',
        type: 'user',
      },
    ],
    user: {
      username: 'janesmith',
      profile: profile2,
    },
    status: 'pending',
    createdAt: '2024-07-21T11:00:00Z',
    totalRatings: 6,
    shareCount: 12,
    likeCount: 20,
    viewCount: 90,
    totalAttempts: 14,
    pinMode: false,
    updatedAt: '2024-07-22T11:00:00Z',
    downloadCount: 35,
    totalComments: '55',
  },
  {
    id: '10',
    title: 'Resolved crash on profile view',
    state: 'bug_fix',
    bug_report: {
      title: 'Bug Report',
      content:
        'The app crashes when the user tries to view their profile. This issue is affecting all users on the latest app version.',
    },
    solution: {
      title: 'Solution',
      content:
        'Fixed the null reference issue in the profile view component by adding appropriate checks.',
    },
    result: {
      title: 'Result',
      content: 'Users can now view their profiles without the app crashing.',
    },
    description: {
      title: 'Description',
      content: 'Null reference issue in the profile view component resolved.',
    },
    tags: [DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '7',
        user: {
          username: 'bobwilliams',
          profile: profile4,
        },
        date: '2024-07-22T15:03:00Z',
        notification: 'Added null checks in the profile view component.',
        type: 'user',
      },
      {
        id: '8',
        user: {
          username: 'alicejohnson',
          profile: profile3,
        },
        date: '2024-07-22T15:07:00Z',
        notification: 'Tested the profile view functionality post-fix.',
        type: 'user',
      },
      {
        id: '9',
        user: {
          username: 'johndoe',
          profile: profile5,
        },
        date: '2024-07-22T15:15:00Z',
        notification: 'Confirmed the fix on the latest app version.',
        type: 'user',
      },
    ],
    user: {
      username: 'bobwilliams',
      profile: profile4,
    },
    status: 'approved',
    createdAt: '2024-07-22T15:00:00Z',
    totalRatings: 7,
    shareCount: 18,
    likeCount: 28,
    viewCount: 110,
    totalAttempts: 17,
    pinMode: false,
    updatedAt: '2024-07-23T15:00:00Z',
    downloadCount: 45,
    totalComments: '100',
  },
];

export const DUMMY_REUSABLE_CODE_DATA = [
  {
    id: '3',
    title: 'Reusable button component',
    state: 'reusable_code',
    code: {
      title: 'Code',
      content:
        'const Button = ({ label, onClick }) => (<button onClick={onClick}>{label}</button>);',
    },
    description: {
      title: 'Description',
      content:
        'Created a reusable button component that can be used throughout the app for consistency and ease of maintenance.',
    },
    achieved_result: {
      title: 'Achieved Result',
      content:
        'The button component is now used in multiple parts of the app, reducing code duplication and improving maintainability.',
    },
    usage_guideline: {
      title: 'Usage Guideline',
      content:
        'Import the Button component and pass the label and onClick props to customize it for different uses.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '1',
        user: { username: 'alicejohnson', profile: profile3 },
        date: '2024-07-20T08:01:00Z',
        notification: 'Implemented the initial button component.',
        type: 'user',
      },
      {
        id: '2',
        user: { username: 'bobwilliams', profile: profile4 },
        date: '2024-07-20T08:05:00Z',
        notification: 'Styled the button component for consistency.',
        type: 'user',
      },
      {
        id: '3',
        user: { username: 'janesmith', profile: profile2 },
        date: '2024-07-20T08:10:00Z',
        notification: 'Tested the button component across different screens.',
        type: 'user',
      },
    ],
    user: { username: 'alicejohnson', profile: profile3 },
    status: 'pending',
    createdAt: '2024-07-20T08:00:00Z',
    totalRatings: 10,
    shareCount: 25,
    likeCount: 40,
    viewCount: 200,
    totalAttempts: 30,
    pinMode: true,
    updatedAt: '2024-07-21T08:00:00Z',
    downloadCount: 70,
    totalComments: '150',
  },
  {
    id: '5',
    title: 'Reusable form validation logic',
    state: 'reusable_code',
    code: {
      title: 'Code',
      content: 'const validateForm = (formData) => {/* validation logic */};',
    },
    description: {
      title: 'Description',
      content:
        'Implemented reusable form validation logic to ensure consistency and reduce code duplication.',
    },
    achieved_result: {
      title: 'Achieved Result',
      content:
        'Form validation is now consistent across all forms in the app, improving user experience and reducing bugs.',
    },
    usage_guideline: {
      title: 'Usage Guideline',
      content: 'Use the validateForm function in any form to apply the same validation rules.',
    },
    tags: [DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '4',
        user: { username: 'bobwilliams', profile: profile4 },
        date: '2024-07-21T10:01:00Z',
        notification: 'Implemented the initial form validation logic.',
        type: 'user',
      },
      {
        id: '5',
        user: { username: 'janesmith', profile: profile2 },
        date: '2024-07-21T10:06:00Z',
        notification: 'Tested the form validation logic on various forms.',
        type: 'user',
      },
      {
        id: '6',
        user: { username: 'alicejohnson', profile: profile3 },
        date: '2024-07-21T10:12:00Z',
        notification: 'Refined the validation rules for edge cases.',
        type: 'user',
      },
    ],
    user: { username: 'johndoe', profile: profile1 },
    status: 'pending',
    createdAt: '2024-07-21T10:00:00Z',
    totalRatings: 4,
    shareCount: 9,
    likeCount: 15,
    viewCount: 50,
    totalAttempts: 6,
    pinMode: false,
    updatedAt: '2024-07-22T10:00:00Z',
    downloadCount: 20,
    totalComments: '25',
  },
  {
    id: '7',
    title: 'Reusable table component',
    state: 'reusable_code',
    code: {
      title: 'Code',
      content: 'const Table = ({ columns, data }) => {/* table rendering logic */};',
    },
    description: {
      title: 'Description',
      content:
        'Developed a reusable table component to display data in a tabular format throughout the app.',
    },
    achieved_result: {
      title: 'Achieved Result',
      content:
        'The table component is now used in various parts of the app, enhancing code reuse and consistency.',
    },
    usage_guideline: {
      title: 'Usage Guideline',
      content:
        'Import the Table component and pass the columns and data props to display different datasets.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '7',
        user: { username: 'johndoe', profile: profile1 },
        date: '2024-07-22T12:03:00Z',
        notification: 'Created the initial table component structure.',
        type: 'user',
      },
      {
        id: '8',
        user: { username: 'alicejohnson', profile: profile3 },
        date: '2024-07-22T12:07:00Z',
        notification: 'Styled the table component for better readability.',
        type: 'user',
      },
      {
        id: '9',
        user: { username: 'bobwilliams', profile: profile4 },
        date: '2024-07-22T12:15:00Z',
        notification: 'Tested the table component with various datasets.',
        type: 'user',
      },
    ],
    user: { username: 'johndoe', profile: profile1 },
    status: 'rejected',
    createdAt: '2024-07-22T12:00:00Z',
    totalRatings: 5,
    shareCount: 10,
    likeCount: 20,
    viewCount: 70,
    totalAttempts: 9,
    pinMode: false,
    updatedAt: '2024-07-23T12:00:00Z',
    downloadCount: 25,
    totalComments: '30',
  },
  {
    id: '9',
    title: 'Reusable modal component',
    state: 'reusable_code',
    code: {
      title: 'Code',
      content: 'const Modal = ({ isOpen, onClose, children }) => {/* modal logic */};',
    },
    description: {
      title: 'Description',
      content: 'Created a reusable modal component to display overlay dialogs throughout the app.',
    },
    achieved_result: {
      title: 'Achieved Result',
      content:
        'The modal component is now used in multiple places, providing a consistent look and feel for dialogs.',
    },
    usage_guideline: {
      title: 'Usage Guideline',
      content:
        'Use the Modal component to display overlay dialogs by passing the isOpen, onClose, and children props.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '10',
        user: { username: 'janesmith', profile: profile2 },
        date: '2024-07-23T14:04:00Z',
        notification: 'Implemented the initial modal component.',
        type: 'user',
      },
      {
        id: '11',
        user: { username: 'alicejohnson', profile: profile3 },
        date: '2024-07-23T14:08:00Z',
        notification: 'Styled the modal component for better usability.',
        type: 'user',
      },
      {
        id: '12',
        user: { username: 'bobwilliams', profile: profile4 },
        date: '2024-07-23T14:16:00Z',
        notification: 'Tested the modal component for different use cases.',
        type: 'user',
      },
    ],
    user: { username: 'janesmith', profile: profile2 },
    status: 'approved',
    createdAt: '2024-07-23T14:00:00Z',
    totalRatings: 8,
    shareCount: 18,
    likeCount: 28,
    viewCount: 100,
    totalAttempts: 12,
    pinMode: true,
    updatedAt: '2024-07-24T14:00:00Z',
    downloadCount: 40,
    totalComments: '70',
  },
  {
    id: '13',
    title: 'Reusable card component',
    state: 'reusable_code',
    code: {
      title: 'Code',
      content:
        'const Card = ({ title, content }) => (<div className="card"><h2>{title}</h2><p>{content}</p></div>);',
    },
    description: {
      title: 'Description',
      content:
        'Developed a reusable card component to display content in a card layout throughout the app.',
    },
    achieved_result: {
      title: 'Achieved Result',
      content:
        'The card component is now used in various parts of the app, providing a consistent UI.',
    },
    usage_guideline: {
      title: 'Usage Guideline',
      content:
        'Import the Card component and pass the title and content props to display different content.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    contributions: [
      {
        id: '13',
        user: { username: 'bobwilliams', profile: profile4 },
        date: '2024-07-23T16:05:00Z',
        notification: 'Developed the initial card component.',
        type: 'user',
      },
      {
        id: '14',
        user: { username: 'janesmith', profile: profile2 },
        date: '2024-07-23T16:09:00Z',
        notification: 'Styled the card component for consistency.',
        type: 'user',
      },
      {
        id: '15',
        user: { username: 'alicejohnson', profile: profile3 },
        date: '2024-07-23T16:17:00Z',
        notification: 'Tested the card component across different screens.',
        type: 'user',
      },
    ],
    user: { username: 'bobwilliams', profile: profile4 },
    status: 'pending',
    createdAt: '2024-07-23T16:00:00Z',
    totalRatings: 6,
    shareCount: 12,
    likeCount: 22,
    viewCount: 85,
    totalAttempts: 14,
    pinMode: false,
    updatedAt: '2024-07-24T16:00:00Z',
    downloadCount: 30,
    totalComments: '15',
  },
];

const allData = [...DUMMY_BUG_REPORT_DATA, ...DUMMY_BUG_FIX_DATA, ...DUMMY_REUSABLE_CODE_DATA];
const shuffledData = shuffleArray(allData);
export const DUMMY_POST_DATA = shuffledData;

// DUMMY USERS

export const DUMMY_USERS = [
  {
    id: '1',
    profile: profile1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: [
      { id: '1.1', address: 'johndoe@example.com', visibility: 'public', type: 'default' },
      { id: '1.2', address: 'johndoe_private@example.com', visibility: 'private', type: 'backup' },
      { id: '1.3', address: 'johndoe_work@example.com', visibility: 'private', type: 'backup' },
      { id: '1.4', address: 'johndoe_alt@example.com', visibility: 'public', type: 'backup' },
    ],
    phone: '123-456-7890',
    followersCount: 150,
    followingCount: 200,
    role: 'user',
    profession: 'Software Developer',
    links: [
      'https://github.com/johndoe',
      'https://stackoverflow.com/users/123456/johndoe',
      'https://linkedin.com/in/johndoe',
      'https://twitter.com/johndoe',
      'https://youtube.com/user/johndoe',
    ],
    bio: 'Passionate software developer with a love for coding.',
    location: 'New York, USA',
    starCount: 30,
    bugReportCount: 10,
    bugFixesCount: 5,
    reusableCodeCount: 3,
    blogPostCount: 2,
    reportCount: 1,
    accountAppealsCount: 0,
    password: 'password123',
    passwordConfirm: 'password123',
    createdAt: generateRandomDate(),
    lastLogin: generateRandomDate(),
    passwordChangedAt: generateRandomDate(),
    passwordResetToken: 'wktrtjy60698-43923utiurhjroitjijyp3krqwokfopr2',
    passwordResetExpires: '2024-09-20T12:00:00Z',
    accountStatus: 'healthy',
    active: true,
  },
  {
    id: '2',
    profile: profile2,
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    email: [
      { id: '2.1', address: 'janesmith@example.com', visibility: 'public', type: 'default' },
      {
        id: '2.2',
        address: 'janesmith_private@example.com',
        visibility: 'private',
        type: 'backup',
      },
      { id: '2.3', address: 'janesmith_work@example.com', visibility: 'private', type: 'backup' },
      { id: '2.4', address: 'janesmith_alt@example.com', visibility: 'public', type: 'backup' },
    ],
    phone: '987-654-3210',
    followersCount: 300,
    followingCount: 100,
    role: 'moderator',
    profession: 'UX Designer',
    links: [
      'https://github.com/janesmith',
      'https://stackoverflow.com/users/654321/janesmith',
      'https://linkedin.com/in/janesmith',
      'https://twitter.com/janesmith',
      'https://youtube.com/user/janesmith',
    ],
    bio: 'UX designer with a keen eye for detail and user experience.',
    location: 'San Francisco, USA',
    starCount: 45,
    bugReportCount: 15,
    bugFixesCount: 8,
    reusableCodeCount: 5,
    blogPostCount: 4,
    reportCount: 2,
    accountAppealsCount: 1,
    password: 'mypassword',
    passwordConfirm: 'mypassword',
    createdAt: generateRandomDate(),
    lastLogin: generateRandomDate(),
    passwordChangedAt: generateRandomDate(),
    passwordResetToken: 'dfjgnrhoi101340fhk69gijnr6XXSJDFURTsjsfrjgt',
    passwordResetExpires: '2024-09-20T12:00:00Z',
    accountStatus: 'warning',
    active: true,
  },
  {
    id: '3',
    profile: profile3,
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicejohnson',
    email: [
      { id: '3.1', address: 'alicejohnson@example.com', visibility: 'public', type: 'default' },
      {
        id: '3.2',
        address: 'alicejohnson_private@example.com',
        visibility: 'private',
        type: 'backup',
      },
      {
        id: '3.3',
        address: 'alicejohnson_work@example.com',
        visibility: 'private',
        type: 'backup',
      },
      { id: '3.4', address: 'alicejohnson_alt@example.com', visibility: 'public', type: 'backup' },
    ],
    phone: '555-555-5555',
    followersCount: 500,
    followingCount: 400,
    role: 'collaborator',
    profession: 'Project Manager',
    links: [
      'https://github.com/alicejohnson',
      'https://stackoverflow.com/users/345678/alicejohnson',
      'https://linkedin.com/in/alicejohnson',
      'https://twitter.com/alicejohnson',
      'https://youtube.com/user/alicejohnson',
    ],
    bio: 'Project manager with extensive experience in leading teams and delivering results.',
    location: 'London, UK',
    starCount: 20,
    bugReportCount: 5,
    bugFixesCount: 2,
    reusableCodeCount: 1,
    blogPostCount: 1,
    reportCount: 0,
    accountAppealsCount: 0,
    password: 'securepass',
    passwordConfirm: 'securepass',
    createdAt: generateRandomDate(),
    lastLogin: generateRandomDate(),
    passwordChangedAt: generateRandomDate(),
    passwordResetToken: '5653rrytyt343tt35y6yr34t3875589345utrytt4t5t',
    passwordResetExpires: '2024-10-20T12:00:00Z',
    accountStatus: 'banned',
    active: false,
  },
  {
    id: '4',
    profile: profile4,
    firstName: 'Bob',
    lastName: 'Williams',
    username: 'bobwilliams',
    email: [
      { id: '4.1', address: 'bobwilliams@example.com', visibility: 'public', type: 'default' },
      {
        id: '4.2',
        address: 'bobwilliams_private@example.com',
        visibility: 'private',
        type: 'backup',
      },
      { id: '4.3', address: 'bobwilliams_work@example.com', visibility: 'private', type: 'backup' },
      { id: '4.4', address: 'bobwilliams_alt@example.com', visibility: 'public', type: 'backup' },
    ],
    phone: '444-333-2222',
    followersCount: 250,
    followingCount: 150,
    role: 'admin',
    profession: 'Database Administrator',
    links: [
      'https://github.com/bobwilliams',
      'https://stackoverflow.com/users/789012/bobwilliams',
      'https://linkedin.com/in/bobwilliams',
      'https://twitter.com/bobwilliams',
      'https://youtube.com/user/bobwilliams',
    ],
    bio: 'Database administrator with a passion for optimizing and securing data.',
    location: 'Sydney, Australia',
    starCount: 75,
    bugReportCount: 20,
    bugFixesCount: 12,
    reusableCodeCount: 7,
    blogPostCount: 6,
    reportCount: 3,
    accountAppealsCount: 2,
    password: 'adminpassword',
    passwordConfirm: 'adminpassword',
    createdAt: generateRandomDate(),
    lastLogin: generateRandomDate(),
    passwordChangedAt: generateRandomDate(),
    passwordResetToken: 'fetjter438467586rjtiegur4y538yu538tgrihy',
    passwordResetExpires: '2024-07-20T12:00:00Z',
    accountStatus: 'healthy',
    active: true,
  },
  {
    id: '5',
    profile: profile5,
    firstName: 'Charlie',
    lastName: 'Brown',
    username: 'charliebrown',
    email: [
      { id: '5.1', address: 'charliebrown@example.com', visibility: 'public', type: 'default' },
      {
        id: '5.2',
        address: 'charliebrown_private@example.com',
        visibility: 'private',
        type: 'backup',
      },
      {
        id: '5.3',
        address: 'charliebrown_work@example.com',
        visibility: 'private',
        type: 'backup',
      },
      { id: '5.4', address: 'charliebrown_alt@example.com', visibility: 'public', type: 'backup' },
    ],
    phone: '777-888-9999',
    followersCount: 180,
    followingCount: 220,
    role: 'user',
    profession: 'Graphic Designer',
    links: [
      'https://github.com/charliebrown',
      'https://stackoverflow.com/users/234567/charliebrown',
      'https://linkedin.com/in/charliebrown',
      'https://twitter.com/charliebrown',
      'https://youtube.com/user/charliebrown',
    ],
    bio: 'Creative graphic designer with a passion for visual storytelling.',
    location: 'Toronto, Canada',
    starCount: 35,
    bugReportCount: 8,
    bugFixesCount: 3,
    reusableCodeCount: 2,
    blogPostCount: 1,
    reportCount: 1,
    accountAppealsCount: 0,
    password: 'designpass',
    passwordConfirm: 'designpass',
    createdAt: generateRandomDate(),
    lastLogin: generateRandomDate(),
    passwordChangedAt: generateRandomDate(),
    passwordResetToken: 'fjkdi4789675ureyt5u56u6ty4trytryrt465urtuj',
    passwordResetExpires: '2024-11-20T12:00:00Z',
    accountStatus: 'healthy',
    active: true,
  },
  {
    id: '6',
    profile: profile6,
    firstName: 'Diana',
    lastName: 'Prince',
    username: 'dianaprince',
    email: [
      { id: '6.1', address: 'dianaprince@example.com', visibility: 'public', type: 'default' },
      {
        id: '6.2',
        address: 'dianaprince_private@example.com',
        visibility: 'private',
        type: 'backup',
      },
      { id: '6.3', address: 'dianaprince_work@example.com', visibility: 'private', type: 'backup' },
      { id: '6.4', address: 'dianaprince_alt@example.com', visibility: 'public', type: 'backup' },
    ],
    phone: '222-111-0000',
    followersCount: 320,
    followingCount: 280,
    role: 'collaborator',
    profession: 'Content Writer',
    links: [
      'https://github.com/dianaprince',
      'https://stackoverflow.com/users/345678/dianaprince',
      'https://linkedin.com/in/dianaprince',
      'https://twitter.com/dianaprince',
      'https://youtube.com/user/dianaprince',
    ],
    bio: 'Content writer with a love for creating engaging and informative articles.',
    location: 'Paris, France',
    starCount: 40,
    bugReportCount: 12,
    bugFixesCount: 7,
    reusableCodeCount: 4,
    blogPostCount: 5,
    reportCount: 1,
    accountAppealsCount: 0,
    password: 'writingpass',
    passwordConfirm: 'writingpass',
    createdAt: generateRandomDate(),
    lastLogin: generateRandomDate(),
    passwordChangedAt: generateRandomDate(),
    passwordResetToken: 'uryet349865t987t6j8ty756uyturehru8yty5jhty',
    passwordResetExpires: '2024-12-20T12:00:00Z',
    accountStatus: 'healthy',
    active: true,
  },
  {
    id: '7',
    profile: profile7,
    firstName: 'Evan',
    lastName: 'Miller',
    username: 'evanmiller',
    email: [
      { id: '7.1', address: 'evanmiller@example.com', visibility: 'public', type: 'default' },
      {
        id: '7.2',
        address: 'evanmiller_private@example.com',
        visibility: 'private',
        type: 'backup',
      },
      { id: '7.3', address: 'evanmiller_work@example.com', visibility: 'private', type: 'backup' },
      { id: '7.4', address: 'evanmiller_alt@example.com', visibility: 'public', type: 'backup' },
    ],
    phone: '333-444-5555',
    followersCount: 410,
    followingCount: 360,
    role: 'user',
    profession: 'Data Scientist',
    links: [
      'https://github.com/evanmiller',
      'https://stackoverflow.com/users/456789/evanmiller',
      'https://linkedin.com/in/evanmiller',
      'https://twitter.com/evanmiller',
      'https://youtube.com/user/evanmiller',
    ],
    bio: 'Data scientist with a deep understanding of machine learning and data analysis.',
    location: 'Berlin, Germany',
    starCount: 90,
    bugReportCount: 25,
    bugFixesCount: 15,
    reusableCodeCount: 10,
    blogPostCount: 7,
    reportCount: 3,
    accountAppealsCount: 1,
    password: 'datasciencemaster',
    passwordConfirm: 'datasciencemaster',
    createdAt: generateRandomDate(),
    lastLogin: generateRandomDate(),
    passwordChangedAt: generateRandomDate(),
    passwordResetToken: '67gr47y45ty657yr57ty54y5t7y7yr47yt756y45uyr',
    passwordResetExpires: '2024-08-20T12:00:00Z',
    accountStatus: 'healthy',
    active: true,
  },
];
