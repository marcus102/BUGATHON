import React, { useState } from 'react';
import classes from './formCmp.module.css';
import Colors from '../../../constants/colors';
import Link from '../../../utils/LinkSection';
import { IconButton, SolidButton } from '../../../utils/ButtonSection';
import { HorizontalScrollView } from '../../../utils/ScrollViewsSection';
import { Editor, EditorState, RichUtils, Modifier, ContentState } from 'draft-js';
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

// function EditorContainer({ editorState, setEditorState, onContentChange }) {
//   const styleMap = {
//     HIGHLIGHT: {
//       backgroundColor: Colors.gray_aaaaaa5e,
//       borderRadius: '5px',
//       padding: '0 5px',
//     },
//   };

//   const handleEditorChange = (newState) => {
//     setEditorState(newState);
//     const contentState = newState.getCurrentContent();
//     const htmlContent = stateToHTML(contentState);
//     onContentChange(htmlContent);
//   };

//   return (
//     <div className={classes.editorContainer}>
//       <Editor
//         editorState={editorState}
//         onChange={handleEditorChange}
//         plugins={plugins}
//         editorKey="editor"
//         customStyleMap={styleMap}
//         blockStyleFn={(contentBlock) => {
//           const type = contentBlock.getType();
//           return `${classes.editorBlock} ${classes[`text-${type}`]}`;
//         }}
//         className={classes.editor}
//       />
//     </div>
//   );
// }

// Function to automatically detect and convert links
function EditorContainer({ editorState, setEditorState, onContentChange }) {
  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: Colors.gray_aaaaaa5e,
      borderRadius: '5px',
      padding: '0 5px',
    },
  };

  const handleEditorChange = (newState) => {
    let contentState = newState.getCurrentContent();
    const selectionState = newState.getSelection();
    const text = contentState.getPlainText();

    // Detect links using a simple regex
    const linkPattern = /https?:\/\/[^\s]+/g;
    let matchArr;
    while ((matchArr = linkPattern.exec(text)) !== null) {
      const start = matchArr.index;
      const end = start + matchArr[0].length;

      // Apply the link entity
      contentState = contentState.createEntity('LINK', 'MUTABLE', { url: matchArr[0] });
      const entityKey = contentState.getLastCreatedEntityKey();

      const updatedSelection = selectionState.merge({
        anchorOffset: start,
        focusOffset: end,
      });

      newState = RichUtils.toggleLink(
        EditorState.forceSelection(newState, updatedSelection),
        updatedSelection,
        entityKey
      );
    }

    setEditorState(newState);

    // Convert the content state to HTML
    const htmlContent = stateToHTML(newState.getCurrentContent());
    onContentChange(htmlContent);
  };

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
