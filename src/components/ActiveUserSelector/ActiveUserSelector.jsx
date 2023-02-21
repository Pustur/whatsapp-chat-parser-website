import React from 'react';

import * as S from '../Sidebar/style';

function ActiveUserSelector({ participants, activeUser, setActiveUser }) {
  return (
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
  );
}

export default ActiveUserSelector;
