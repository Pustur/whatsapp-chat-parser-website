import { PollOption, PollStructure } from '../types';

function parsePollMessage(message: string): PollStructure | null {
  const lines = message
    .trim()
    .split('\n')
    .map(line => line.trim());

  if (!lines[0].includes('POLL:') || !lines[2]?.includes('OPTION:'))
    return null;

  const optionRegex = /OPTION: (?<text>.+) \((?<votes>\d+).*\)/;

  const options = lines.slice(2).reduce<PollOption[]>((acc, line) => {
    const match = optionRegex.exec(line);

    if (!match?.groups) return acc;

    const { text, votes } = match.groups;

    return acc.concat({ text, votes: Number(votes) });
  }, []);

  return {
    title: lines[1],
    options,
    maxVotes: Math.max(...options.map(o => o.votes)),
  };
}

export { parsePollMessage };
