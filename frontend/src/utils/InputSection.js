import React, { useRef, useState, useCallback, useContext } from 'react';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import classes from './InputSection.module.css';
import Text from './TextSection';
import { IconButton, DynamicLabelDropdownMenu, SolidButton } from './ButtonSection';
import Icon from './IconSection';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Colors from '../constants/colors';
import Link from './LinkSection';
import { faPlusCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HorizontalScrollView } from './ScrollViewsSection';
import { Image, Audio, Video } from './MediaSection';
import { Editor, EditorState, RichUtils, Modifier, AtomicBlockUtils } from 'draft-js';
import { useDropzone } from 'react-dropzone';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import prismPlugin from './syntaxHighlightPlugin';

const plugins = [prismPlugin];

export function RowOfSquares({ rowOfSquaresStyle }) {
  const numSquares = 6;
  const inputsRefs = useRef([]);

  const handleInputChange = (index, e) => {
    const inputLength = e.target.value.length;
    const nextInputIndex = index < numSquares - 1 ? index + 1 : index;

    if (inputLength === 1 && nextInputIndex < numSquares) {
      inputsRefs.current[nextInputIndex].focus();
    }
  };

  return (
    <div className={[classes.row_of_squares_container, rowOfSquaresStyle].join(' ')}>
      {Array(numSquares)
        .fill()
        .map((_, index) => (
          <input
            className={classes.white_square_contaier}
            key={index}
            maxLength={1}
            ref={(el) => (inputsRefs.current[index] = el)}
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}
    </div>
  );
}

export function TextArea({
  label,
  placeholder,
  value,
  onChange,
  textAreaStyle,
  onKeyDown,
  defaultValue,
}) {
  return (
    <div className={`${classes.input_main_container} ${textAreaStyle}`}>
      {label && <Text label16={label} />}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        defaultValue={defaultValue ? defaultValue : ''}
      />
    </div>
  );
}

export function CheckBox({ label12, label16, checkboxStyle, value, unwrap }) {
  return (
    <div className={`${classes.checkbox_container} ${checkboxStyle}`}>
      <input type="checkbox" value={value} />
      {label16 ? <Text unwrap={unwrap} label16={label16} /> : undefined}
      {label12 ? <Text unwrap={unwrap} label12={label12} /> : undefined}
    </div>
  );
}

export function Input({
  label,
  instructionLabel,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  inputMainContainerStyle,
  inputSecondContainerStyle,
  inputStyle,
  onKeyDown,
  defaultValue,
  unwrap,
  unwrap_,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={[classes.input_main_container, inputMainContainerStyle].join(' ')}>
      {label && <Text unwrap={unwrap} label14={label} />}
      <div className={[classes.input_second_container, inputSecondContainerStyle].join(' ')}>
        <div className={`${classes.input_container} ${inputStyle}`}>
          <input
            type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            defaultValue={defaultValue ? defaultValue : ''}
          />
          {type === 'password' && (
            <IconButton
              icon={isPasswordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        {instructionLabel && (
          <Text unwrap={unwrap_} textStyle={classes.instructionLabel} label12={instructionLabel} />
        )}
      </div>
    </div>
  );
}

export function Select({ label, options }) {
  return (
    <div>
      <Text label16={label} />
      <select className="form-select" aria-label="Default select example">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Radio({
  children,
  radioContainerStyle,
  checked,
  label,
  icon,
  size,
  color,
  onChange,
  inputValue,
  unwrap,
}) {
  return (
    <div className={`${classes.radio_container} ${radioContainerStyle}`}>
      {icon && (
        <Icon iconContainerStyle={classes.icon_container} icon={icon} size={size} color={color} />
      )}
      <input
        type="radio"
        name="flexRadioDefault"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        checked={checked}
      />
      {label && <Text unwrap={unwrap} textStyle={classes.text_container} label16={label} />}
      {children}
    </div>
  );
}

export function Switch({ label, switchStyle, checked }) {
  return (
    <div className={['form-check form-switch', classes.switch_container, switchStyle].join(' ')}>
      <input className="form-check-input" type="checkbox" role="switch" checked={checked} />
      <Text textStyle={classes.text_container} label16={label} />
    </div>
  );
}

// START OF TEXT EDITOR
export function TextEditor({ META_DATA }) {
  const [activeButton, setActiveButton] = useState('1');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useFileDrop(editorState, setEditorState),
  });

  return (
    <>
      {META_DATA.map((data) => (
        <div key={data.id} className={classes.new_bug_report_container}>
          <Text h5={data.title} />
          <Input label={data.input_label} placeholder={data.input_placeholder} />
          <HorizontalScrollView
            METADATA={data.children}
            onClick={setActiveButton}
            activeButton={activeButton}
          />
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
            getRootProps={getRootProps}
            getInputProps={getInputProps}
          />
          {showEmojiPicker && <EmojiPicker onSelect={addEmoji(editorState, setEditorState)} />}
          {data.options && <Options options={data.options} />}
          <CheckBoxWithLink label={data.check_box} link={data.check_box_link} />
          <SolidButton
            buttonMainContainerStyle={classes.solid_button_container}
            buttonStyle={classes.solid_button}
            label={data.button}
          />
        </div>
      ))}
    </>
  );
}

function useFileDrop(editorState, setEditorState) {
  return useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const contentState = editorState.getCurrentContent();
          const contentStateWithEntity = contentState.createEntity(
            file.type.startsWith('image/')
              ? 'IMAGE'
              : file.type.startsWith('video/')
              ? 'VIDEO'
              : file.type.startsWith('audio/')
              ? 'AUDIO'
              : 'FILE',
            'IMMUTABLE',
            {
              src: reader.result,
              type: file.type,
              name: file.name,
            }
          );
          const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
          const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
          setEditorState(newEditorState);
        };
        reader.readAsDataURL(file);
      });
    },
    [editorState, setEditorState]
  );
}

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

function EditorContainer({ editorState, setEditorState, getRootProps, getInputProps }) {
  const blockRendererFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      const entity = editorState.getCurrentContent().getEntity(contentBlock.getEntityAt(0));
      const entityType = entity.getType();
      switch (entityType) {
        case 'IMAGE':
          return { component: UploadedImage, editable: false };
        case 'VIDEO':
          return { component: UploadedVideo, editable: false };
        case 'AUDIO':
          return { component: UploadedAudio, editable: false };
        case 'FILE':
          return { component: UploadedFile, editable: false };
        default:
          return null;
      }
    }
    return null;
  };

  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: Colors.gray_aaaaaa5e,
      borderRadius: '5px',
      padding: '0 5px',
    },
  };

  return (
    <div className={classes.editorContainer}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        editorKey="editor"
        blockRendererFn={blockRendererFn}
        customStyleMap={styleMap}
        blockStyleFn={(contentBlock) => {
          const type = contentBlock.getType();
          return `${classes.editorBlock} ${classes[`text-${type}`]}`;
        }}
        className={classes.editor}
      />
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} id="attachement-upload-input" />
        <Icon icon={faPlusCircle} color={Colors.white_afafaf} />
        <Text
          label14Style={classes.dropzone_text}
          label14="Add Image, Video, Audio, or File (Drag and drop...)"
        />
      </div>
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

function Options({ options }) {
  const { dropDownDefault } = useContext(ManagmentSystem);
  const { browser, device, severity } = dropDownDefault;
  return (
    <div className={classes.options_container}>
      {options.map((option) => (
        <div key={option.id} className={classes.option_container}>
          <Text h6={`${option.title} :`} />
          <DynamicLabelDropdownMenu
            dropDownIconTextStyle={classes.dropdown_button_container}
            dropDownMenuStyle={classes.dropdown_menu_container}
            buttonLabel={option.id === '1' ? browser : option.id === '2' ? device : severity}
            my_key={option.id === '1' ? 'browser' : option.id === '2' ? 'device' : 'severity'}
            buttonIcon={faChevronDown}
            menuItems={option.menu}
          />
        </div>
      ))}
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

function UploadedImage(props) {
  const { src } = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
  return (
    <Image
      src={src}
      alt="Uploaded"
      imgContainerStyle={classes.image_container}
      imgStyle={classes.image}
    />
  );
}

function UploadedVideo(props) {
  const { src } = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
  return <Video src={src} />;
}

function UploadedAudio(props) {
  const { src } = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
  return <Audio src={src} />;
}

function UploadedFile(props) {
  const { src, name } = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
  return <Link underline href={src} download={name} label14={name} />;
}
// END OF TEXT EDITOR
