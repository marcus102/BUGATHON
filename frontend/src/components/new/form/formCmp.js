import React, { useState, useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './formCmp.module.css';
import Colors from '../../../constants/colors';
import Link from '../../../utils/LinkSection';
import { IconButton, SolidButton, DynamicLabelDropdownMenu } from '../../../utils/ButtonSection';
import { HorizontalScrollView } from '../../../utils/ScrollViewsSection';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import prismPlugin from '../../../utils/syntaxHighlightPlugin';
import { Form } from 'react-router-dom';
import Text from '../../../utils/TextSection';
import { Input, CheckBox } from '../../../utils/InputSection';
import {
  faUnderline,
  faItalic,
  faB,
  faCode,
  faFaceSmile,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faRotateLeft,
  faRotateRight,
  faHighlighter,
  faPaperclip,
  faListOl,
  faLink,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { File } from '../../../utils/MediaSection';
import DOMPurify from 'dompurify';
import { useSearchParams } from 'react-router-dom';

const plugins = [prismPlugin];

function IconButtons({ editorState, setEditorState, showEmojiPicker, setShowEmojiPicker }) {
  const ICON_BUTTONS = [
    { id: '1', icon: faB, next: null },
    { id: '2', icon: faItalic, next: null },
    { id: '3', icon: faUnderline, next: null },
    { id: '4', icon: faHighlighter, next: null },
    { id: '5', icon: faCode, next: null },
    { id: '6', icon: faFaceSmile, next: null },
    { id: '7', icon: faPaperclip, next: null },
    { id: '8', icon: faLink, next: null },
    { id: '9', icon: faListOl, next: null },
    { id: '10', icon: faAlignLeft, next: faAlignCenter },
    { id: '11', icon: faAlignCenter, next: faAlignRight },
    { id: '12', icon: faAlignRight, next: faAlignJustify },
    { id: '13', icon: faAlignJustify, next: faAlignLeft },
    { id: '14', icon: faRotateLeft, next: null },
    { id: '15', icon: faRotateRight, next: null },
  ];

  const toggleInlineStyle = (style) =>
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleUndo = () => setEditorState(EditorState.undo(editorState));
  const handleRedo = () => setEditorState(EditorState.redo(editorState));
  const toggleHighlight = () => {
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();
    let newContentState;

    if (currentStyle.has('HIGHLIGHT')) {
      newContentState = Modifier.removeInlineStyle(
        editorState.getCurrentContent(),
        selection,
        'HIGHLIGHT'
      );
    } else {
      newContentState = Modifier.applyInlineStyle(
        editorState.getCurrentContent(),
        selection,
        'HIGHLIGHT'
      );
    }

    setEditorState(EditorState.push(editorState, newContentState, 'change-inline-style'));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Handle the file upload logic here
      console.log('Selected file:', file);
    }
  };

  return (
    <HorizontalScrollView
      children={
        <>
          <File id="attachment-upload-input" onChange={(e) => handleFileUpload(e)} />
          {ICON_BUTTONS.map((button, index) => (
            <IconButton
              key={`${button.id}-${index}`}
              inconButtonStyle={classes.icon_button}
              icon={button.icon}
              onClick={() => {
                const actionMap = {
                  1: () => toggleInlineStyle('BOLD'),
                  2: () => toggleInlineStyle('ITALIC'),
                  3: () => toggleInlineStyle('UNDERLINE'),
                  4: () => toggleHighlight(),
                  5: () => toggleBlockType('code-block'),
                  6: () => setShowEmojiPicker(!showEmojiPicker),
                  7: () => document.getElementById('attachment-upload-input').click(),
                  9: () => toggleBlockType('ordered-list-item'),
                  10: () => toggleBlockType('left'),
                  11: () => toggleBlockType('center'),
                  12: () => toggleBlockType('right'),
                  13: () => toggleBlockType('justify'),
                  14: () => handleUndo(),
                  15: () => handleRedo(),
                };

                const actionFunction = actionMap[button.id];
                if (actionFunction) {
                  actionFunction();
                }
              }}
            />
          ))}
        </>
      }
    />
  );
}

// Function to automatically detect and convert links
function EditorContainer({ editorState, setEditorState, onContentChange }) {
  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: Colors.gray_aaaaaa5e,
      borderRadius: '5px',
      padding: '0 5px',
    },
  };

  // Function to safely replace URLs with anchor tags
  const handleEditorChange = (newState) => {
    setEditorState(newState);

    // Convert the content state to HTML
    let htmlContent = stateToHTML(newState.getCurrentContent());

    // Safely replace detected URLs with anchor tags
    const linkPattern = /https?:\/\/[^\s<>"']+/g;
    htmlContent = htmlContent.replace(linkPattern, (url) => {
      // Properly format the URL to prevent HTML injection and maintain structure
      const sanitizedUrl = DOMPurify.sanitize(url);
      return `<a href="${sanitizedUrl}" target="_blank">${sanitizedUrl}</a>`;
    });

    // Ensure the final HTML is sanitized
    const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);

    // Pass the sanitized HTML to your content change handler
    onContentChange(sanitizedHtmlContent);
  };

  // const handleEditorChange = (newState) => {
  //   setEditorState(newState);

  //   // Convert the content state to HTML
  //   const contentState = newState.getCurrentContent();
  //   const htmlContent = stateToHTML(contentState);

  //   // Optionally, process the HTML to detect and modify links if needed
  //   const processedHTML = htmlContent.replace(/https?:\/\/[^\s]+/g, (url) => {
  //     return `<a href="${url}" target="_blank">${url}</a>`;
  //   });

  //   // Pass the processed HTML to your content change handler
  //   onContentChange(processedHTML);
  // };

  return (
    <div className={classes.editorContainer}>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        plugins={plugins}
        editorKey="editor"
        customStyleMap={styleMap}
        blockStyleFn={(contentBlock) => {
          const type = contentBlock.getType();
          return `${classes.editorBlock} ${classes[`text-${type}`]}`;
        }}
        className={classes.editor}
      />
    </div>
  );
}

function EmojiPicker({ onSelect }) {
  return (
    <div className={classes.emoji_picker_container}>
      <Picker data={data} emojiSize={20} onEmojiSelect={onSelect} />
    </div>
  );
}

function CheckBoxWithLink({ label, link }) {
  return (
    <div className={classes.check_box_container}>
      <CheckBox unwrap={true} label12={label} />
      <Link children12={link} />
    </div>
  );
}

function addEmoji(editorState, setEditorState) {
  return (emoji) => {
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      emoji.native
    );
    const newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
    setEditorState(newEditorState);
  };
}

const CATEGORIES_METADATA = [
  { id: 'all', label: 'All' },
  { id: 'aiethics', label: 'AI-ethics' },
  { id: 'fpgadesign', label: 'FPGA-design' },
  { id: 'nfts', label: 'NFTs' },
  { id: 'nosql', label: 'NoSQL' },
  { id: 'orm', label: 'ORM' },
  { id: 'plcprogramming', label: 'PLC-programming' },
  { id: 'restfularchitecture', label: 'RESTful-architecture' },
  { id: 'sql', label: 'SQL' },
  { id: 'solidprinciples', label: 'SOLID-principles' },
  { id: 'agreement', label: 'Agreement' },
  { id: 'algorithm', label: 'Algorithm' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'backend', label: 'Backend' },
  { id: 'bigdata', label: 'Big-data' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'blockchainplatforms', label: 'Blockchain-platforms' },
  { id: 'cloudcomputing', label: 'Cloud-computing' },
  { id: 'cloudarchitecture', label: 'Cloud-architecture' },
  { id: 'cloudsecurity', label: 'Cloud-security' },
  { id: 'computervision', label: 'Computer-vision' },
  { id: 'concurrency', label: 'Concurrency' },
  { id: 'containerorchestration', label: 'Container-orchestration' },
  { id: 'continuousdeployment', label: 'Continuous-deployment' },
  { id: 'continuousintegration', label: 'Continuous-integration' },
  { id: 'cryptocurrency', label: 'Cryptocurrency' },
  { id: 'crossplatform', label: 'Cross-platform' },
  { id: 'crossplatformdevelopment', label: 'Cross-platform-development' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'dataanalytics', label: 'Data-analytics' },
  { id: 'datacleaning', label: 'Data-cleaning' },
  { id: 'dataengineering', label: 'Data-engineering' },
  { id: 'datapreprocessing', label: 'Data-preprocessing' },
  { id: 'datascience', label: 'Data-science' },
  { id: 'datastructures', label: 'Data-structures' },
  { id: 'database', label: 'Database' },
  { id: 'databasedesign', label: 'Database-design' },
  { id: 'declarativeprogramming', label: 'Declarative-programming' },
  { id: 'deeplearning', label: 'Deep-learning' },
  { id: 'designpatterns', label: 'Design-patterns' },
  { id: 'designprinciples', label: 'Design-principles' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'devops', label: 'DevOps' },
  { id: 'distributedsystems', label: 'Distributed-systems' },
  { id: 'encryption', label: 'Encryption' },
  { id: 'embeddedfirmware', label: 'Embedded-firmware' },
  { id: 'embeddedsystems', label: 'Embedded-systems' },
  { id: 'endtoendtesting', label: 'End-to-end-testing' },
  { id: 'errorhandling', label: 'Error-handling' },
  { id: 'eventdrivenarchitecture', label: 'Event-driven-architecture' },
  { id: 'featureengineering', label: 'Feature-engineering' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'fullstack', label: 'Full-stack' },
  { id: 'functionalprogramming', label: 'Functional-programming' },
  { id: 'gamedevelopment', label: 'Game-development' },
  { id: 'gameengine', label: 'Game-engine' },
  { id: 'graphicsprogramming', label: 'Graphics-programming' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'hardwaredesign', label: 'Hardware-design' },
  { id: 'imperativeprogramming', label: 'Imperative-programming' },
  { id: 'integrationtesting', label: 'Integration-testing' },
  { id: 'internetofthings', label: 'Internet-of-things' },
  { id: 'iot', label: 'IoT' },
  { id: 'libraries', label: 'Libraries' },
  { id: 'logging', label: 'Logging' },
  { id: 'machinelearning', label: 'Machine-learning' },
  { id: 'microcontrollerprogramming', label: 'Microcontroller-programming' },
  { id: 'microservices', label: 'Microservices' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'mobiledevelopment', label: 'Mobile-development' },
  { id: 'mobileframeworks', label: 'Mobile-frameworks' },
  { id: 'modeldeployment', label: 'Model-deployment' },
  { id: 'modelevaluation', label: 'Model-evaluation' },
  { id: 'modeltraining', label: 'Model-training' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'nativeapps', label: 'Native-apps' },
  { id: 'naturallanguageprocessing', label: 'Natural-language-processing' },
  { id: 'networking', label: 'Networking' },
  { id: 'operatingsystems', label: 'Operating-systems' },
  { id: 'parallelcomputing', label: 'Parallel-computing' },
  { id: 'performancetesting', label: 'Performance-testing' },
  { id: 'progressivewebapps', label: 'Progressive-web-apps' },
  { id: 'rating', label: 'Rating' },
  { id: 'reactiveprogramming', label: 'Reactive-programming' },
  { id: 'realtime', label: 'Real-time' },
  { id: 'responsivedesign', label: 'Responsive-design' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'scripting', label: 'Scripting' },
  { id: 'searchalgorithms', label: 'Search-algorithms' },
  { id: 'securecoding', label: 'Secure-coding' },
  { id: 'security', label: 'Security' },
  { id: 'serverless', label: 'Serverless' },
  { id: 'software', label: 'Software' },
  { id: 'softwarearchitecture', label: 'Software-architecture' },
  { id: 'sortingalgorithms', label: 'Sorting-algorithms' },
  { id: 'smartcontracts', label: 'Smart-contracts' },
  { id: 'testautomation', label: 'Test-automation' },
  { id: 'testing', label: 'Testing' },
  { id: 'tools', label: 'Tools' },
  { id: 'uiuxdesign', label: 'UI/UX-design' },
  { id: 'unittesting', label: 'Unit-testing' },
  { id: 'userexperience', label: 'User-experience' },
  { id: 'userinterface', label: 'User-interface' },
  { id: 'virtualreality', label: 'Virtual-reality' },
  { id: 'virtualization', label: 'Virtualization' },
  { id: 'web', label: 'Web' },
  { id: 'webdevelopment', label: 'Web-development' },
  { id: 'webframeworks', label: 'Web-frameworks' },
  { id: 'web3', label: 'Web3' },
  { id: 'other', label: 'Other' },
];

const LANGUAGES_METADATA = [
  { id: 'all', label: 'All' },
  { id: 'angular', label: 'Angular' },
  { id: 'assembly', label: 'Assembly' },
  { id: 'c', label: 'C' },
  { id: 'csharp', label: 'C#' },
  { id: 'cpp', label: 'C++' },
  { id: 'cobol', label: 'Cobol' },
  { id: 'css', label: 'CSS' },
  { id: 'dart', label: 'Dart' },
  { id: 'elixir', label: 'Elixir' },
  { id: 'erlang', label: 'Erlang' },
  { id: 'fortran', label: 'Fortran' },
  { id: 'go', label: 'Go' },
  { id: 'graphql', label: 'GraphQL' },
  { id: 'groovy', label: 'Groovy' },
  { id: 'haskell', label: 'Haskell' },
  { id: 'html', label: 'HTML' },
  { id: 'java', label: 'Java' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'julia', label: 'Julia' },
  { id: 'kotlin', label: 'Kotlin' },
  { id: 'lisp', label: 'Lisp' },
  { id: 'lua', label: 'Lua' },
  { id: 'matlab', label: 'MATLAB' },
  { id: 'node', label: 'Node' },
  { id: 'objectivec', label: 'Objective-C' },
  { id: 'perl', label: 'Perl' },
  { id: 'php', label: 'PHP' },
  { id: 'powershell', label: 'PowerShell' },
  { id: 'python', label: 'Python' },
  { id: 'r', label: 'R' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'rust', label: 'Rust' },
  { id: 'scala', label: 'Scala' },
  { id: 'shell', label: 'Shell' },
  { id: 'solidity', label: 'Solidity' },
  { id: 'sql', label: 'SQL' },
  { id: 'swift', label: 'Swift' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'vhdl', label: 'VHDL' },
  { id: 'visualbasic', label: 'Visual Basic' },
  { id: 'xml', label: 'XML' },
  { id: 'yaml', label: 'YAML' },
  { id: 'other', label: 'Other' },
];

const OS_METADATA = [
  { id: 'all', label: 'All' },
  { id: 'android', label: 'Android' },
  { id: 'crossplatform', label: 'Cross-platform' },
  { id: 'ios', label: 'IOS' },
  { id: 'linux', label: 'Linux' },
  { id: 'macos', label: 'MacOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'other', label: 'Other' },
];

function TextEditor({ META_DATA }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [categories, setCategories] = useState('');
  const [os, setOs] = useState('');
  const [programingLanguage, setProgramingLanguage] = useState('');
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const postType = searchParams.get('source');

  const { dropDownDefault } = useContext(ManagmentSystem);

  return (
    <>
      {META_DATA.length > 0 ? (
        META_DATA.map((data, index) => (
          <Form
            method="post"
            key={`${data.id}-${index}`}
            className={classes.new_bug_report_container}
          >
            <Text h5={data.title} />
            <Input
              id={data.input_id}
              name={data.input_name}
              label={data.input_label}
              placeholder={data.input_placeholder}
            />

            <div className={classes.editor_container}>
              <Text h6={data.input_label_2} />
              <IconButtons
                editorState={editorState}
                setEditorState={setEditorState}
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
              />

              <EditorContainer
                editorState={editorState}
                setEditorState={setEditorState}
                onContentChange={setEditorContent}
              />

              <input
                type="hidden"
                id={data.input_id_2}
                name={data.input_name_2}
                value={editorContent}
              />

              <input
                type="hidden"
                id={`${postType}_`}
                name={`${postType}_`}
                value={postId ? postId : ''}
              />
            </div>

            <div className={classes.dropdonw_main_container}>
              <div className={classes.dropdonw_container}>
                <Text label12={'Category:'} />
                <DynamicLabelDropdownMenu
                  dropDownIconTextStyle={classes.drop_dow_label}
                  dropDownMenuStyle={classes.drop_down_menu}
                  buttonLabel={dropDownDefault.category}
                  buttonIcon={faChevronDown}
                  menuItems={CATEGORIES_METADATA}
                  my_key={'category'}
                  onChange={(value) => setCategories(value)}
                />
              </div>
              <input type="hidden" id="category" name="category" defaultValue={categories} />

              <div className={classes.dropdonw_container}>
                <Text label12={'Programming Language:'} />
                <DynamicLabelDropdownMenu
                  dropDownIconTextStyle={classes.drop_dow_label}
                  dropDownMenuStyle={classes.drop_down_menu}
                  buttonLabel={dropDownDefault.programming_language}
                  buttonIcon={faChevronDown}
                  menuItems={LANGUAGES_METADATA}
                  my_key={'programming_language'}
                  onChange={(value) => setProgramingLanguage(value)}
                />
              </div>
              <input
                type="hidden"
                id="programing_language"
                name="programing_language"
                defaultValue={programingLanguage}
              />
              <div className={classes.dropdonw_container}>
                <Text label12={'Operating System:'} />
                <DynamicLabelDropdownMenu
                  dropDownIconTextStyle={classes.drop_dow_label}
                  dropDownMenuStyle={classes.drop_down_menu}
                  buttonLabel={dropDownDefault.device}
                  buttonIcon={faChevronDown}
                  menuItems={OS_METADATA}
                  my_key={'device'}
                  onChange={(value) => setOs(value)}
                />
              </div>
              <input type="hidden" id="device" name="device" defaultValue={os} />
            </div>

            {showEmojiPicker && <EmojiPicker onSelect={addEmoji(editorState, setEditorState)} />}
            <CheckBoxWithLink
              label={'By taking this action, you agree to our'}
              link={'terms & conditions.'}
            />
            <SolidButton
              buttonMainContainerStyle={classes.solid_button_container}
              buttonStyle={classes.solid_button}
              label={'Submit'}
            />
          </Form>
        ))
      ) : (
        <Text h6={'Not available'} />
      )}
    </>
  );
}

export default TextEditor;
