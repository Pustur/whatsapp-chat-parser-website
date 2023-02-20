import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { showError } from './utils/utils';
import {
  activeUserAtom,
  rawFileAtom,
  participantsAtom,
  messagesDateBoundsAtom,
} from './stores/global';
import { datesAtom, globalFilterModeAtom, limitsAtom } from './stores/filters';
import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import Sidebar from './components/Sidebar/Sidebar';
import * as S from './style';

import exampleChat from './assets/whatsapp-chat-parser-example.zip';

function App() {
  const [filterMode, setFilterMode] = useState('index');
  const setGlobalFilterMode = useSetAtom(globalFilterModeAtom);
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);
  const [limits, setLimits] = useAtom(limitsAtom);
  const [dates, setDates] = useAtom(datesAtom);
  const messagesDateBounds = useAtomValue(messagesDateBoundsAtom);
  const setRawFile = useSetAtom(rawFileAtom);
  const participants = useAtomValue(participantsAtom);

  const processFile = file => {
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('loadend', e => setRawFile(e.target.result));

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
    setGlobalFilterMode('index');
  };

  const setMessagesByDate = e => {
    const entries = Object.fromEntries(new FormData(e.currentTarget));

    e.preventDefault();
    setDates({ start: entries.startDate, end: entries.endDate });
    setGlobalFilterMode('date');
  };

  useEffect(() => {
    setActiveUser(participants[0] || '');
  }, [setActiveUser, participants]);

  useEffect(() => {
    const keyHandler = e =>
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
          startDateInputString={dates.start}
          endDateInputString={dates.end}
        />
        <Sidebar>
          <S.Fieldset>
            <legend>Filter by</legend>
            {['index', 'date'].map(name => (
              <S.RadioField key={name}>
                <S.RadioInput
                  id={name}
                  name={name}
                  type="radio"
                  value={name}
                  checked={filterMode === name}
                  onChange={e => setFilterMode(e.target.value)}
                />
                <S.Label htmlFor={name}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </S.Label>
              </S.RadioField>
            ))}
          </S.Fieldset>
          {filterMode === 'index' && (
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
                    A high delta may freeze the page for a while, change this
                    with caution
                  </S.InputDescription>
                </S.Field>
              </S.Fieldset>
            </S.Form>
          )}
          {filterMode === 'date' && (
            <S.Form onSubmit={setMessagesByDate}>
              <S.Fieldset>
                <legend>Messages date window</legend>
                <S.Field>
                  <S.Label htmlFor="start-date">Start</S.Label>
                  <S.Input
                    id="start-date"
                    name="startDate"
                    type="date"
                    min={messagesDateBounds.start}
                    max={messagesDateBounds.end}
                    defaultValue={messagesDateBounds.start}
                  />
                </S.Field>
                <S.Field>
                  <S.Label htmlFor="end-date">End</S.Label>
                  <S.Input
                    id="end-date"
                    name="endDate"
                    type="date"
                    min={messagesDateBounds.start}
                    max={messagesDateBounds.end}
                    defaultValue={messagesDateBounds.end}
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
            </S.Form>
          )}
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
        </Sidebar>
      </S.Container>
    </>
  );
}

export default App;
