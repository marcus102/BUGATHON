import Colors from '../constants/colors';
import {
  faHeart,
  faComment,
  faThumbTack,
  faArrowUpFromBracket,
  faChartSimple,
  faEllipsisVertical,
  faEllipsis,
  faPen,
  faCaretRight,
  faClipboard,
  faUser,
  faShareNodes,
  faFaceGrinStars,
  faEyeSlash,
  faTrashCan,
  faExclamation,
  faArrowUpRightFromSquare,
  faExclamationCircle,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import images from '../assets/images/globe.jpg';

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

const REACTIONS_DATA = [
  { id: 'likes', icon: faHeart, text: '10K', activeColor: Colors.red_FF2B2B },
  { id: 'comments', icon: faComment, text: '5K', activeColor: null },
  { id: 'pin', icon: faThumbTack, text: null, activeColor: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, text: null, activeColor: null },
  { id: 'impression', icon: faChartSimple, text: '50K', activeColor: null },
];

const DUMMY_CONTRIBUTIONS = [
  {
    id: '1',
    profile: images,
    title: '@leyla contributed on you bug report 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat. Mauris eleifend eros id metus volutpat',
    type: 'user',
  },
  {
    id: '2',
    profile: images,
    title: '@adam contributed on your bug report 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    type: 'user',
  },
  {
    id: '3',
    profile: images,
    title: 'You contibuted to @leyla bug report  1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    type: 'me',
  },
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'johndoe',
    status: 'pending',
    createdAt: '2024-07-20T12:00:00Z',
    totalRatings: 5,
    shareCount: 10,
    likeCount: 25,
    viewCount: 100,
    totalAttempts: 15,
    pinMode: 'public',
    updatedAt: '2024-07-22T12:00:00Z',
    downloadCount: 50,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'bobwilliams',
    status: 'approved',
    createdAt: '2024-07-21T14:30:00Z',
    totalRatings: 8,
    shareCount: 15,
    likeCount: 30,
    viewCount: 120,
    totalAttempts: 20,
    pinMode: 'private',
    updatedAt: '2024-07-23T14:30:00Z',
    downloadCount: 40,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'johndoe',
    status: 'rejected',
    createdAt: '2024-07-22T16:00:00Z',
    totalRatings: 2,
    shareCount: 5,
    likeCount: 10,
    viewCount: 60,
    totalAttempts: 8,
    pinMode: 'public',
    updatedAt: '2024-07-23T16:00:00Z',
    downloadCount: 20,
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
      content: 'Settings should be updated without any errors.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'An error message is displayed and settings are not updated.',
    },
    tags: [DUMMY_TAG_DATA[0], DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'janesmith',
    status: 'pending',
    createdAt: '2024-07-23T18:00:00Z',
    totalRatings: 3,
    shareCount: 8,
    likeCount: 18,
    viewCount: 80,
    totalAttempts: 12,
    pinMode: 'private',
    updatedAt: '2024-07-24T18:00:00Z',
    downloadCount: 25,
  },
  {
    id: '12',
    title: 'App crashes on logout',
    state: 'bug_report',
    description: {
      title: 'Description',
      content:
        'The app crashes when the user tries to log out. This issue has been reported by multiple users.',
    },
    bug_report: {
      title: 'Bug Report',
      content: 'Tapping the logout button causes the app to crash and close.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content: '1. Open the app. 2. Log in. 3. Tap the logout button. 4. Observe the crash.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content:
        'The user should be logged out and returned to the login screen without the app crashing.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'The app crashes when the logout button is pressed.',
    },
    tags: [DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[3]],
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'alicejohnson',
    status: 'approved',
    createdAt: '2024-07-24T10:00:00Z',
    totalRatings: 7,
    shareCount: 12,
    likeCount: 22,
    viewCount: 90,
    totalAttempts: 18,
    pinMode: 'public',
    updatedAt: '2024-07-25T10:00:00Z',
    downloadCount: 30,
  },
  {
    id: '14',
    title: 'App crashes on startup',
    state: 'bug_report',
    description: {
      title: 'Description',
      content: 'The app crashes intermittently on startup, affecting users with older devices.',
    },
    bug_report: {
      title: 'Bug Report',
      content: 'Upon launching the app, it crashes and returns to the home screen.',
    },
    steps_to_reproduce: {
      title: 'Steps to Reproduce',
      content: '1. Install the app on an older device. 2. Launch the app. 3. Observe the crash.',
    },
    expected_behavior: {
      title: 'Expected Behavior',
      content: 'The app should start up without any crashes.',
    },
    actual_behavior: {
      title: 'Actual Behavior',
      content: 'The app crashes intermittently on startup.',
    },
    tags: [DUMMY_TAG_DATA[2], DUMMY_TAG_DATA[1], DUMMY_TAG_DATA[3]],
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'johndoe',
    status: 'rejected',
    createdAt: '2024-07-25T12:00:00Z',
    totalRatings: 4,
    shareCount: 6,
    likeCount: 14,
    viewCount: 70,
    totalAttempts: 10,
    pinMode: 'public',
    updatedAt: '2024-07-26T12:00:00Z',
    downloadCount: 15,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'johndoe',
    status: 'approved',
    createdAt: '2024-07-20T09:00:00Z',
    totalRatings: 9,
    shareCount: 20,
    likeCount: 35,
    viewCount: 150,
    totalAttempts: 25,
    pinMode: 'public',
    updatedAt: '2024-07-21T09:00:00Z',
    downloadCount: 60,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'janesmith',
    status: 'pending',
    createdAt: '2024-07-21T11:00:00Z',
    totalRatings: 6,
    shareCount: 12,
    likeCount: 20,
    viewCount: 90,
    totalAttempts: 14,
    pinMode: 'private',
    updatedAt: '2024-07-22T11:00:00Z',
    downloadCount: 35,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'bobwilliams',
    status: 'approved',
    createdAt: '2024-07-22T15:00:00Z',
    totalRatings: 7,
    shareCount: 18,
    likeCount: 28,
    viewCount: 110,
    totalAttempts: 17,
    pinMode: 'public',
    updatedAt: '2024-07-23T15:00:00Z',
    downloadCount: 45,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'alicejohnson',
    status: 'pending',
    createdAt: '2024-07-20T08:00:00Z',
    totalRatings: 10,
    shareCount: 25,
    likeCount: 40,
    viewCount: 200,
    totalAttempts: 30,
    pinMode: 'public',
    updatedAt: '2024-07-21T08:00:00Z',
    downloadCount: 70,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'johndoe',
    status: 'pending',
    createdAt: '2024-07-21T10:00:00Z',
    totalRatings: 4,
    shareCount: 9,
    likeCount: 15,
    viewCount: 50,
    totalAttempts: 6,
    pinMode: 'private',
    updatedAt: '2024-07-22T10:00:00Z',
    downloadCount: 20,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'johndoe',
    status: 'rejected',
    createdAt: '2024-07-22T12:00:00Z',
    totalRatings: 5,
    shareCount: 10,
    likeCount: 20,
    viewCount: 70,
    totalAttempts: 9,
    pinMode: 'public',
    updatedAt: '2024-07-23T12:00:00Z',
    downloadCount: 25,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'janesmith',
    status: 'approved',
    createdAt: '2024-07-23T14:00:00Z',
    totalRatings: 8,
    shareCount: 18,
    likeCount: 28,
    viewCount: 100,
    totalAttempts: 12,
    pinMode: 'public',
    updatedAt: '2024-07-24T14:00:00Z',
    downloadCount: 40,
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
    reactions: REACTIONS_DATA,
    contributions: DUMMY_CONTRIBUTIONS,
    user: 'bobwilliams',
    status: 'pending',
    createdAt: '2024-07-23T16:00:00Z',
    totalRatings: 6,
    shareCount: 12,
    likeCount: 22,
    viewCount: 85,
    totalAttempts: 14,
    pinMode: 'private',
    updatedAt: '2024-07-24T16:00:00Z',
    downloadCount: 30,
  },
];

const allData = [...DUMMY_BUG_REPORT_DATA, ...DUMMY_BUG_FIX_DATA, ...DUMMY_REUSABLE_CODE_DATA];

const shuffledData = shuffleArray(allData);

export const DUMMY_POST_DATA = shuffledData;

export const CARD_VIEW_OPTION = [
  { id: '1', icon: faPen, label: 'Edit bug report (owner)', icon_2: null, href: null },
  { id: '2', icon: faPen, label: 'Edit bug Fix (owner)', icon_2: null, href: null },
  { id: '3', icon: faPen, label: 'Edit Reusable Code (owner)', icon_2: null, href: null },
  { id: '4', icon: faClipboard, label: 'Assign bug to', icon_2: faCaretRight, href: null },
  { id: '5', icon: faComment, label: 'Comment', icon_2: null, href: null },
  { id: '6', icon: faUser, label: 'Contributions', icon_2: faCaretRight, href: null },
  { id: '7', icon: faShareNodes, label: 'Share', icon_2: null, href: null },
  { id: '8', icon: faThumbTack, label: 'Pin', icon_2: null, href: null },
  { id: '9', icon: faFaceGrinStars, label: 'Make a Review', icon_2: null, href: null },
  { id: '10', icon: faEyeSlash, label: 'I do not want to see this', icon_2: null, href: null },
  { id: '11', icon: faTrashCan, label: 'Delete bug report (owner)', icon_2: null, href: null },
  { id: '12', icon: faExclamation, label: 'Report', icon_2: faCaretRight, href: null },
];

// DUMMY USERS

export const DUMMY_USERS = [
  {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: ['johndoe@example.com'],
    phone: '123-456-7890',
    followersCount: 150,
    followingCount: 200,
    role: 'user',
    profession: ['Software Developer'],
    links: ['https://github.com/johndoe'],
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
    acountSatus: 'healthy',
    active: true,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    email: ['janesmith@example.com'],
    phone: '987-654-3210',
    followersCount: 300,
    followingCount: 100,
    role: 'moderator',
    profession: ['UX Designer'],
    links: ['https://linkedin.com/in/janesmith'],
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
    acountSatus: 'warning',
    active: true,
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicejohnson',
    email: ['alicejohnson@example.com'],
    phone: '555-555-5555',
    followersCount: 500,
    followingCount: 400,
    role: 'collaborator',
    profession: ['Project Manager'],
    links: ['https://portfolio.com/alicejohnson'],
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
    acountSatus: 'banned',
    active: false,
  },
  {
    firstName: 'Bob',
    lastName: 'Williams',
    username: 'bobwilliams',
    email: ['bobwilliams@example.com'],
    phone: '444-333-2222',
    followersCount: 250,
    followingCount: 150,
    role: 'admin',
    profession: ['Database Administrator'],
    links: ['https://stackoverflow.com/users/bobwilliams'],
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
    acountSatus: 'healthy',
    active: true,
  },
];
