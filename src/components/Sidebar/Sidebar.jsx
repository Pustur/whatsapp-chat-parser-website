import React, { useRef, useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import Credits from '../Credits/Credits';
import * as S from './style';
import {
  activeUserAtom,
  isMenuOpenAtom,
  messagesDateBoundsAtom,
  participantsAtom,
} from '../../stores/global';
import { getISODateString } from '../../utils/utils';
import {
  datesAtom,
  globalFilterModeAtom,
  limitsAtom,
} from '../../stores/filters';
import FilterModeSelector from './FilterModeSelector';
import FilterMessageLimitsForm from './FilterMessageLimitsForm';

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);
  const [filterMode, setFilterMode] = useState('index');
  const setGlobalFilterMode = useSetAtom(globalFilterModeAtom);
  const [limits, setLimits] = useAtom(limitsAtom);
  const setDates = useSetAtom(datesAtom);
  const messagesDateBounds = useAtomValue(messagesDateBoundsAtom);
  const participants = useAtomValue(participantsAtom);
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);

  const closeButtonRef = useRef(null);
  const openButtonRef = useRef(null);

  const setMessageLimits = e => {
    const entries = Object.fromEntries(new FormData(e.currentTarget));

    e.preventDefault();
    setLimits({ low: entries.lowerLimit, high: entries.upperLimit });
    setGlobalFilterMode('index');
  };

  const setMessagesByDate = e => {
    e.preventDefault();
    setDates({
      start: e.currentTarget.startDate.valueAsDate,
      end: e.currentTarget.endDate.valueAsDate,
    });
    setGlobalFilterMode('date');
  };

  useEffect(() => {
    const keyDownHandler = e => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [setIsMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) closeButtonRef.current.focus();
    else openButtonRef.current.focus();
  }, [isMenuOpen]);

  return (
    <>
      <S.MenuOpenButton
        className="menu-open-button"
        type="button"
        onClick={() => setIsMenuOpen(true)}
        ref={openButtonRef}
      >
        Open menu
      </S.MenuOpenButton>
      <S.Overlay
        type="button"
        isActive={isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        tabIndex="-1"
      />
      <S.Sidebar isOpen={isMenuOpen}>
        <S.MenuCloseButton
          type="button"
          onClick={() => setIsMenuOpen(false)}
          ref={closeButtonRef}
        >
          Close menu
        </S.MenuCloseButton>
        <S.SidebarContainer>
          <S.SidebarChildren>
            <FilterModeSelector
              filterMode={filterMode}
              setFilterMode={setFilterMode}
            />
            {filterMode === 'index' && (
              <FilterMessageLimitsForm
                limits={limits}
                setMessageLimits={setMessageLimits}
              />
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
                      min={getISODateString(messagesDateBounds.start)}
                      max={getISODateString(messagesDateBounds.end)}
                      defaultValue={getISODateString(messagesDateBounds.start)}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label htmlFor="end-date">End</S.Label>
                    <S.Input
                      id="end-date"
                      name="endDate"
                      type="date"
                      min={getISODateString(messagesDateBounds.start)}
                      max={getISODateString(messagesDateBounds.end)}
                      defaultValue={getISODateString(messagesDateBounds.end)}
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
          </S.SidebarChildren>
          <Credits />
        </S.SidebarContainer>
      </S.Sidebar>
    </>
  );
}

export default Sidebar;
