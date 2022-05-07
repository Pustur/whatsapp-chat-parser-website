import React, { useState, useRef, useEffect } from 'react';

import Credits from '../Credits/Credits';
import * as S from './style';

function Sidebar({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeButtonRef = useRef(null);
  const openButtonRef = useRef(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    openButtonRef.current.focus();
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    closeButtonRef.current.focus();
  };

  useEffect(() => {
    const keyDownHandler = e => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, []);

  return (
    <>
      <S.MenuOpenButton
        className="menu-open-button"
        type="button"
        onClick={openMenu}
        ref={openButtonRef}
      >
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
          {children}
          <div>
            <Credits />
          </div>
        </S.SidebarContainer>
      </S.Sidebar>
    </>
  );
}

export default Sidebar;
