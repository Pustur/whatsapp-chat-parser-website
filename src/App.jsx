import React, { useState, useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import JSZip from 'jszip';
import { parseStringSync } from 'whatsapp-chat-parser';

import {
  showError,
  readChatFile,
  replaceEncryptionMessageAuthor,
} from './utils/utils';
import { activeUserAtom } from './stores/global';
import { limitsAtom } from './stores/filters';
import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import Sidebar from './components/Sidebar/Sidebar';
import * as S from './style';

import exampleChat from './assets/whatsapp-chat-parser-example.zip';

function App() {
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);
  const [limits, setLimits] = useAtom(limitsAtom);
  const [rawFileText, setRawFileText] = useState('');
  const [zipFile, setZipFile] = useState(null);

  const messages = useMemo(() => {
    if (!rawFileText) return [];
    return replaceEncryptionMessageAuthor(
      parseStringSync(rawFileText, {
        parseAttachments: zipFile !== null,
      }),
    );
  }, [rawFileText, zipFile]);

  const participants = useMemo(() => {
    const set = new Set();

    messages.forEach(m => {
      if (m.author !== 'System') set.add(m.author);
    });

    return Array.from(set);
  }, [messages]);

  const processFile = file => {
    if (!file) return;

    const reader = new FileReader();
    const loadEndHandler = e => {
      if (e.target.result instanceof ArrayBuffer) {
        const jszip = new JSZip();
        const zip = jszip.loadAsync(e.target.result);

        setZipFile(zip);
        zip.then(readChatFile).then(setRawFileText);
      } else {
        setZipFile(null);
        setRawFileText(e.target.result);
      }
    };

    reader.addEventListener('loadend', loadEndHandler);

    if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(file.type)) {
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      showError(`File type ${file.type} not supported`);
    }
  };

  const setMessageLimits = e => {
    const entries = Object.fromEntries(new FormData(e.currentTarget));

    e.preventDefault();
    setLimits({ low: entries.lowerLimit, high: entries.upperLimit });
  };

  useEffect(() => {
    setActiveUser(participants[0] || '');
  }, [setActiveUser, participants]);

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
          lowerLimit={limits.low}
          upperLimit={limits.high}
          zipFile={zipFile}
        />
        <Sidebar>
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
                  placeholder={limits.low}
                />
              </S.Field>
              <S.Field>
                <S.Label htmlFor="upper-limit">End</S.Label>
                <S.Input
                  id="upper-limit"
                  name="upperLimit"
                  type="number"
                  min="1"
                  placeholder={limits.high}
                />
              </S.Field>
              <S.Field>
                <S.Submit type="submit" value="Apply" />
                <S.InputDescription>
                  A high delta may freeze the page for a while, change this with
                  caution
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
        </Sidebar>
      </S.Container>
    </>
  );
}

export default App;
