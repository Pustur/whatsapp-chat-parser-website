import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { showError } from './utils/utils';
import {
  activeUserAtom,
  rawFileAtom,
  participantsAtom,
  messagesAtom,
} from './stores/global';
import { limitsAtom } from './stores/filters';
import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import Sidebar from './components/Sidebar/Sidebar';
import * as S from './style';

import exampleChat from './assets/whatsapp-chat-parser-example.zip';

function App() {
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);
  const limits = useAtomValue(limitsAtom);
  const messages = useAtomValue(messagesAtom);
  const setRawFile = useSetAtom(rawFileAtom);
  const participants = useAtomValue(participantsAtom);

  const processFile = (file: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('loadend', e => {
      if (e.target) {
        setRawFile(e.target.result);
      }
    });

    if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(file.type)) {
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      showError(`File type ${file.type} not supported`);
    }
  };

  useEffect(() => {
    setActiveUser(participants[0] || '');
  }, [setActiveUser, participants]);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) =>
      document.documentElement.classList.toggle('ctrl-down', e.ctrlKey);

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('keyup', keyHandler);

    return () => {
      document.removeEventListener('keydown', keyHandler);
      document.removeEventListener('keyup', keyHandler);
    };
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
          participants={participants}
          activeUser={activeUser}
          lowerLimit={limits.low}
          upperLimit={limits.high}
        />
        {messages.length > 0 && <Sidebar />}
      </S.Container>
    </>
  );
}

export default App;
