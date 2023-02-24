import * as S from '../Sidebar/style';

import { ILimits } from '../../types';

interface IFilterMessageLimitsForm {
  limits: ILimits;
  setMessageLimits: React.FormEventHandler<HTMLFormElement>;
}

function FilterMessageLimitsForm({
  limits,
  setMessageLimits,
}: IFilterMessageLimitsForm) {
  return (
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
            placeholder={limits.low.toString()}
          />
        </S.Field>
        <S.Field>
          <S.Label htmlFor="upper-limit">End</S.Label>
          <S.Input
            id="upper-limit"
            name="upperLimit"
            type="number"
            min="1"
            placeholder={limits.high.toString()}
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
    </S.Form>
  );
}

export default FilterMessageLimitsForm;
