import React, { useState, useRef, useEffect, useMemo } from 'react';
import JSZip from 'jszip';
import { parseString } from 'whatsapp-chat-parser';

import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import Credits from './components/Credits/Credits';
import * as S from './style';

import exampleChat from './assets/whatsapp-chat-parser-example.zip';

const DEFAULT_LOWER_LIMIT = 1;
const DEFAULT_UPPER_LIMIT = 100;

const showError = (message, err) => {
  console.error(err || message); // eslint-disable-line no-console
  alert(message); // eslint-disable-line no-alert
};

const readChatFile = zipData => {
  const chatFile = zipData.file('_chat.txt');

  if (chatFile) return chatFile.async('string');

  const chatFiles = zipData.file(/.*(?:chat|whatsapp).*\.txt$/i);

  if (!chatFiles.length) {
    throw new Error('No txt files found in archive');
  }

  const chatFilesSorted = chatFiles.sort(
    (a, b) => a.name.length - b.name.length,
  );

  return chatFilesSorted[0].async('string');
};

const replaceEncryptionMessageAuthor = messages =>
  messages.map((message, i) => {
    if (i < 10 && message.message.includes('end-to-end')) {
      return { ...message, author: 'System' };
    }
    return message;
  });

const App = () => {
  const [messages, setMessages] = useState([]);
  const [activeUser, setActiveUser] = useState('');
  const [lowerLimit, setLowerLimit] = useState(DEFAULT_LOWER_LIMIT);
  const [upperLimit, setUpperLimit] = useState(DEFAULT_UPPER_LIMIT);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [zipFile, setZipFile] = useState(null);

  const closeButtonRef = useRef(null);
  const openButtonRef = useRef(null);
  const isFirstRender = useRef(true);

  const participants = useMemo(
    () =>
      Array.from(new Set(messages.map(({ author }) => author))).filter(
        author => author !== 'System',
      ),
    [messages],
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const zipLoadEndHandler = e => {
    const arrayBuffer = e.target.result;
    const jszip = new JSZip();
    const zip = jszip.loadAsync(arrayBuffer);

    setZipFile(zip);

    zip
      .then(readChatFile)
      .then(text => parseString(text, { parseAttachments: true }))
      .then(replaceEncryptionMessageAuthor)
      .then(setMessages)
      .catch(showError);
  };

  const txtLoadEndHandler = e => {
    parseString(e.target.result)
      .then(replaceEncryptionMessageAuthor)
      .then(setMessages)
      .catch(err =>
        showError('An error has occurred while parsing the file', err),
      );
  };

  const processFile = file => {
    if (!file) return;

    const reader = new FileReader();

    if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(file.type)) {
      reader.addEventListener('loadend', zipLoadEndHandler);
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain') {
      reader.addEventListener('loadend', txtLoadEndHandler);
      reader.readAsText(file);
    } else {
      showError(`File type ${file.type} not supported`);
    }
  };

  const setMessageLimits = e => {
    const { lowerLimit: ll, upperLimit: ul } = Object.fromEntries(
      new FormData(e.currentTarget),
    );
    const lower =
      ll === '' ? DEFAULT_LOWER_LIMIT : parseInt(ll, 10) || DEFAULT_LOWER_LIMIT;
    const upper =
      ul === '' ? DEFAULT_UPPER_LIMIT : parseInt(ul, 10) || DEFAULT_UPPER_LIMIT;

    e.preventDefault();
    setLowerLimit(Math.min(lower, upper));
    setUpperLimit(Math.max(lower, upper));
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

  useEffect(() => {
    setActiveUser(participants[0] || '');
  }, [messages]);

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
          participants={participants}
          activeUser={activeUser}
          lowerLimit={lowerLimit}
          upperLimit={upperLimit}
          zipFile={zipFile}
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
            <S.Form onSubmit={setMessageLimits}>
              <S.Fieldset>
                <legend>Messages limit</legend>
                <S.Field>
                  <S.Label htmlFor="lower-limit">Start</S.Label>
                  <S.Input
                    id="lower-limit"
                    name="lowerLimit"
                    type="number"
                    min="1"
                    placeholder={lowerLimit}
                  />
                </S.Field>
                <S.Field>
                  <S.Label htmlFor="upper-limit">End</S.Label>
                  <S.Input
                    id="upper-limit"
                    name="upperLimit"
                    type="number"
                    min="1"
                    placeholder={upperLimit}
                  />
                </S.Field>
                <S.Field>
                  <S.Submit type="submit" value="Apply" />
                  <S.InputDescription>
                    A high delta may freeze the page for a while, change this
                    with caution
                  </S.InputDescription>
                </S.Field>
              </S.Fieldset>
              <S.Field>
                <S.Label htmlFor="active-user">Active User</S.Label>
                <S.Select
                  id="active-user"
                  disabled={!participants.length}
                  value={activeUser}
                  onChange={e => {
                    setActiveUser(e.target.value);
                  }}
                >
                  {participants.map(participant => (
                    <option key={participant} value={participant}>
                      {participant}
                    </option>
                  ))}
                </S.Select>
              </S.Field>
            </S.Form>
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
