import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { createGlobalStyle } from 'styled-components';
import { parseString } from 'whatsapp-chat-parser';

import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import {
  StyledContainer,
  StyledMenuOpenButton,
  StyledMenuCloseButton,
  StyledOverlay,
  StyledSidebar,
  StyledSidebarContainer,
  StyledLabel,
  StyledInput,
  StyledHeader,
} from './style';

import { whatsappGreenColor, whatsappGreenDarkColor } from './utils/colors';

import exampleChat from './assets/whatsapp-chat-parser-example.zip';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-family: sans-serif;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: #333;
  }

  a {
    text-decoration: none;
    color: ${whatsappGreenColor};

    &:visited {
      color: ${whatsappGreenDarkColor};
    }
  }

  button {
    cursor: pointer;
  }

  html,
  body,
  #root {
    height: 100%;
  }
`;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messagesLimit, setMessagesLimit] = useState(100);
  const closeButtonRef = useRef(null);
  const openButtonRef = useRef(null);

  const closeMenu = () => {
    openButtonRef.current.focus();
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    closeButtonRef.current.focus();
    setIsMenuOpen(true);
  };

  const showError = (message, err) => {
    console.error(err || message); // eslint-disable-line no-console
    alert(message); // eslint-disable-line no-alert
  };

  const processFile = file => {
    if (!file) return;

    const reader = new FileReader();

    if (file.type === 'application/zip') {
      reader.onloadend = e => {
        const arrayBuffer = e.target.result;
        const jszip = new JSZip();

        jszip
          .loadAsync(arrayBuffer)
          .then(({ files }) => {
            const txtFiles = Object.entries(files).filter(([fileName]) =>
              fileName.endsWith('.txt'),
            );

            if (!txtFiles.length) {
              throw new Error('No txt files found in archive');
            }

            return txtFiles
              .sort(([a], [b]) => a.length - b.length)[0][1]
              .async('string');
          })
          .then(parseString)
          .then(setMessages)
          .catch(showError);
      };
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain') {
      reader.onloadend = () =>
        parseString(reader.result)
          .then(setMessages)
          .catch(err =>
            showError('An error has occurred while parsing the file', err),
          );
      reader.readAsText(file);
    } else {
      showError(`File type ${file.type} not supported`);
    }
  };

  return (
    <>
      <GlobalStyles />
      <StyledContainer>
        <StyledHeader>
          <Dropzone onFileUpload={processFile} id="dropzone" />
          <span>OR</span>
          <a href={exampleChat} download>
            Download example chat
          </a>
        </StyledHeader>
        <MessageViewer messages={messages} limit={messagesLimit} />
        <StyledMenuOpenButton
          type="button"
          onClick={openMenu}
          ref={openButtonRef}
        >
          Open menu
        </StyledMenuOpenButton>
        <StyledOverlay
          type="button"
          isActive={isMenuOpen}
          onClick={closeMenu}
          tabIndex="-1"
        />
        <StyledSidebar isOpen={isMenuOpen}>
          <StyledMenuCloseButton
            type="button"
            onClick={closeMenu}
            ref={closeButtonRef}
          >
            Close menu
          </StyledMenuCloseButton>
          <StyledSidebarContainer>
            <div>
              <StyledLabel htmlFor="limit">Messages limit</StyledLabel>
              <StyledInput
                id="limit"
                type="number"
                min="0"
                max={messages.length}
                value={messagesLimit}
                onChange={e =>
                  setMessagesLimit(parseInt(e.currentTarget.value, 10))
                }
              />
            </div>

            <div>
              <small>
                Made by <a href="https://lorisbettazza.com">Loris Bettazza</a>
                <br />
                View{' '}
                <a href="https://github.com/Pustur/whatsapp-chat-parser-website">
                  Source code
                </a>
              </small>
            </div>
          </StyledSidebarContainer>
        </StyledSidebar>
      </StyledContainer>
    </>
  );
};

export default App;
