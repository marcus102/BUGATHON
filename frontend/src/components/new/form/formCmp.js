import React, { useState } from 'react';
import classes from './formCmp.module.css';
import Colors from '../../../constants/colors';
import Link from '../../../utils/LinkSection';
import { IconButton, SolidButton } from '../../../utils/ButtonSection';
import { HorizontalScrollView } from '../../../utils/ScrollViewsSection';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import prismPlugin from '../../../utils/syntaxHighlightPlugin';
import { Form } from 'react-router-dom';
import Text from '../../../utils/TextSection';
import { Input, CheckBox } from '../../../utils/InputSection';

const plugins = [prismPlugin];

function IconButtons({
  iconButtons,
  editorState,
  setEditorState,
  showEmojiPicker,
  setShowEmojiPicker,
}) {
  const toggleInlineStyle = (style) =>
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  const toggleBlockType = (blockType) =>
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
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

  return (
    <HorizontalScrollView
      children={
        <>
          {iconButtons.map((button) => (
            <IconButton
              key={button.id}
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
                  7: () => document.getElementById('attachement-upload-input').click(),
                  8: () => toggleBlockType('ordered-list-item'),
                  9: () => toggleBlockType('left'),
                  10: () => toggleBlockType('center'),
                  11: () => toggleBlockType('right'),
                  12: () => toggleBlockType('justify'),
                  13: () => handleUndo(),
                  14: () => handleRedo(),
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

// function EditorContainer({ editorState, setEditorState, inputId, inputName }) {
//   const styleMap = {
//     HIGHLIGHT: {
//       backgroundColor: Colors.gray_aaaaaa5e,
//       borderRadius: '5px',
//       padding: '0 5px',
//     },
//   };

//   return (
//     // <div className={classes.editorContainer}>
//     //   <Editor
//     //     name={inputName}
//     //     id={inputId}
//     //     editorState={editorState}
//     //     onChange={setEditorState}
//     //     plugins={plugins}
//     //     editorKey="editor"
//     //     customStyleMap={styleMap}
//     //     blockStyleFn={(contentBlock) => {
//     //       const type = contentBlock.getType();
//     //       return `${classes.editorBlock} ${classes[`text-${type}`]}`;
//     //     }}
//     //     className={classes.editor}
//     //   />
//     // </div>
//     <div className={classes.editorContainer} id={inputId} name={inputName}>
//       <Editor
//         editorState={editorState}
//         onChange={setEditorState}
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

function EditorContainer({ editorState, setEditorState, onContentChange }) {
  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: Colors.gray_aaaaaa5e,
      borderRadius: '5px',
      padding: '0 5px',
    },
  };

  const handleEditorChange = (newState) => {
    setEditorState(newState);
    const plainText = newState.getCurrentContent().getPlainText();
    onContentChange(plainText);
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
                iconButtons={data.icon_buttons}
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
            <CheckBoxWithLink label={data.check_box} link={data.check_box_link} />
            <SolidButton
              buttonMainContainerStyle={classes.solid_button_container}
              buttonStyle={classes.solid_button}
              label={data.button}
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
