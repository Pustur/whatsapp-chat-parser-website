import type { Message } from 'whatsapp-chat-parser';
import JSZip from 'jszip';

type FilterMode = 'index' | 'date';

type ExtractedFile = string | JSZip | null;

interface IndexedMessage extends Message {
  index: number;
}

interface ILimits {
  low: number;
  high: number;
}

interface DateBounds {
  start: Date;
  end: Date;
}

interface PollOption {
  text: string;
  votes: number;
}

interface PollStructure {
  title: string;
  options: PollOption[];
  maxVotes: number;
}

export type {
  FilterMode,
  ExtractedFile,
  IndexedMessage,
  ILimits,
  DateBounds,
  PollOption,
  PollStructure,
};
