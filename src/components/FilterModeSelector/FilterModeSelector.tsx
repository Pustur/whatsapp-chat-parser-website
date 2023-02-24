import { FilterMode } from '../../types';
import { capitalize } from '../../utils/utils';
import * as S from '../Sidebar/style';

interface IFilterModeSelector {
  filterMode: FilterMode;
  setFilterMode: React.Dispatch<React.SetStateAction<FilterMode>>;
}

function FilterModeSelector({
  filterMode,
  setFilterMode,
}: IFilterModeSelector) {
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
            onChange={e => setFilterMode(e.target.value as FilterMode)}
          />
          <S.Label htmlFor={name}>{capitalize(name)}</S.Label>
        </S.RadioField>
      ))}
    </S.Fieldset>
  );
}

export default FilterModeSelector;
