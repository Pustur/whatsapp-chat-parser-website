import { PollStructure } from '../../types';
import * as S from './style';

interface IPoll {
  pollData: PollStructure;
}

function Poll({ pollData }: IPoll) {
  return (
    <S.Poll>
      <S.Title>{pollData.title}</S.Title>
      {pollData.options.map(option => {
        return (
          <S.Option key={option.text}>
            <div>{option.text}</div>
            <S.Flex>
              <S.Progress max={pollData.maxVotes} value={option.votes} />
              <div>{option.votes}</div>
            </S.Flex>
          </S.Option>
        );
      })}
    </S.Poll>
  );
}

export default Poll;
