import React from 'react';

import { capitalize } from '../../utils/utils';
import * as S from './style';

function FilterModeSelector({ filterMode, setFilterMode }) {
  return (
    <S.Fieldset>
      <legend>Filter by</legend>
      {['index', 'date'].map(name => (
        <S.RadioField key={name}>
          <input
            id={name}
            type="radio"
            value={name}
            checked={filterMode === name}
            onChange={e => setFilterMode(e.target.value)}
          />
          <S.Label htmlFor={name}>{capitalize(name)}</S.Label>
        </S.RadioField>
      ))}
    </S.Fieldset>
  );
}

export default FilterModeSelector;
