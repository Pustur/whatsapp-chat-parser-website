import type { SetStateAction } from 'jotai';

import * as S from '../Sidebar/style';

interface IActiveUserSelector {
  participants: string[];
  activeUser: string;
  setActiveUser: (activeUser: SetStateAction<string>) => void;
}

function ActiveUserSelector({
  participants,
  activeUser,
  setActiveUser,
}: IActiveUserSelector) {
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
