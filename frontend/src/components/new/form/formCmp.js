import React, { useState } from 'react';
import classes from './formCmp.module.css';
import Colors from '../../../constants/colors';
import Link from '../../../utils/LinkSection';
import { IconButton, SolidButton } from '../../../utils/ButtonSection';
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

function TextEditor({ META_DATA }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const postType = searchParams.get('type');

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

              <input type="hidden" id={`${postType}_`} name={`${postType}_`} value={postId} />
              {/* {postId && !id && (
                <input type="hidden" id={'bug_report_'} name={'bug_report_'} value={postId} />
              )}
              {postId && id && (
                <input type="hidden" id={'bug_fix_'} name={'bug_fix_'} value={postId} />
              )}
              {postType === 'reusable_code' && postId && (
                <input type="hidden" id={`${postType}_`} name={`${postType}_`} value={postId} />
              )} */}
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
