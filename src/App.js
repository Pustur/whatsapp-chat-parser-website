import React, { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import { parseString } from 'whatsapp-chat-parser';

import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import Credits from './components/Credits/Credits';
import * as S from './style';

import useDebounce from './hooks/useDebounce';

import exampleChat from './assets/whatsapp-chat-parser-example.zip';

const showError = (message, err) => {
  console.error(err || message); // eslint-disable-line no-console
  alert(message); // eslint-disable-line no-alert
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messagesLimit, setMessagesLimit] = useState(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeButtonRef = useRef(null);
  const openButtonRef = useRef(null);
  const isFirstRender = useRef(true);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
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
            const txtFile = Object.keys(files).find(
              fileName =>
                !fileName.includes('__MACOSX') && fileName.endsWith('.txt'),
            );

            if (!txtFile) {
              throw new Error('No txt files found in archive');
            }

            return files[txtFile].async('string');
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

  useEffect(() => {
    if (isFirstRender.current) return;

    if (isMenuOpen) closeButtonRef.current.focus();
    else openButtonRef.current.focus();
  }, [isMenuOpen]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    const keyDownHandler = e => {
      if (e.keyCode === 27) closeMenu();
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, []);

  return (
    <>
      <S.GlobalStyles />
      <S.Container>
        <S.Header>
          <Dropzone onFileUpload={processFile} id="dropzone" />
          <span>OR</span>
          <a href={exampleChat} download>
            Download example chat
          </a>
        </S.Header>
        <MessageViewer
          messages={messages}
          limit={useDebounce(messagesLimit, 500)}
        />
        <S.MenuOpenButton type="button" onClick={openMenu} ref={openButtonRef}>
          Open menu
        </S.MenuOpenButton>
        <S.Overlay
          type="button"
          isActive={isMenuOpen}
          onClick={closeMenu}
          tabIndex="-1"
        />
        <S.Sidebar isOpen={isMenuOpen}>
          <S.MenuCloseButton
            type="button"
            onClick={closeMenu}
            ref={closeButtonRef}
          >
            Close menu
          </S.MenuCloseButton>
          <S.SidebarContainer>
            <S.Field>
              <S.Label htmlFor="limit">Messages limit</S.Label>
              <S.Input
                id="limit"
                type="number"
                min="0"
                max={messages.length}
                value={messagesLimit}
                onChange={e =>
                  setMessagesLimit(parseInt(e.currentTarget.value, 10))
                }
              />
              <S.InputDescription>
                A high number may freeze the page for a while, change this with
                caution
              </S.InputDescription>
            </S.Field>

            <div>
              <Credits />
            </div>
          </S.SidebarContainer>
        </S.Sidebar>
      </S.Container>
    </>
  );
};

export default App;
