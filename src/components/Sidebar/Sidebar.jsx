import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';

import Credits from '../Credits/Credits';
import * as S from './style';
import { isMenuOpenAtom } from '../../stores/global';

function Sidebar({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);

  const closeButtonRef = useRef(null);
  const openButtonRef = useRef(null);

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
          <S.SidebarChildren>{children}</S.SidebarChildren>
          <Credits />
        </S.SidebarContainer>
      </S.Sidebar>
    </>
  );
}

export default Sidebar;
