import { DateBounds } from '../../types';
import { getISODateString } from '../../utils/utils';

import * as S from '../Sidebar/style';

interface IFilterMessageDatesForm {
  messagesDateBounds: DateBounds;
  setMessagesByDate: React.FormEventHandler<HTMLFormElement>;
}

function FilterMessageDatesForm({
  messagesDateBounds,
  setMessagesByDate,
}: IFilterMessageDatesForm) {
  return (
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
            A high delta may freeze the page for a while, change this with
            caution
          </S.InputDescription>
        </S.Field>
      </S.Fieldset>
    </S.Form>
  );
}

export default FilterMessageDatesForm;
