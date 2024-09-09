import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';

import { extractedFileAtom } from '../../stores/global';
import { getMimeType } from '../../utils/utils';
import { useIsMounted } from '../../hooks/useIsMounted';

const renderAttachment = (fileName: string, attachment: string) => {
  const mimeType = getMimeType(fileName) || '';
  const src = `data:${mimeType};base64,${attachment}`;

  if (mimeType.startsWith('image/')) {
    return <img src={src} title={fileName} alt="" />;
  }
  if (mimeType.startsWith('video/')) {
    return (
      <video controls title={fileName}>
        <source src={src} type={mimeType} />
      </video>
    );
  }
  if (mimeType.startsWith('audio/')) {
    return <audio controls src={src} title={fileName} />;
  }
  return (
    <a href={attachment} download={fileName}>
      {fileName}
    </a>
  );
};

interface IAttachment {
  fileName: string;
}

function Attachment({ fileName }: IAttachment) {
  const extractedFile = useAtomValue(extractedFileAtom);
  const [attachment, setAttachment] = useState<null | string>(null);
  const [error, setError] = useState<null | Error>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!extractedFile || typeof extractedFile === 'string') return;

    const file = extractedFile.files[fileName];

    if (!file) {
      if (isMounted()) {
        setError(new Error(`Can't find "${fileName}" in archive`));
      }
      return;
    }
    if (getMimeType(fileName)) {
      file.async('base64').then(data => {
        if (isMounted()) setAttachment(data);
      });
      return;
    }

    const sizeLimit = 250 * 1024 * 1024; // 250 MB
    // @ts-expect-error _data is not typed
    // eslint-disable-next-line no-underscore-dangle
    const uncompressedSize = file?._data?.uncompressedSize ?? -1;

    // We actually need to check > 0 because big files have negative numbers (int overflow? kek)
    if (uncompressedSize > 0 && uncompressedSize < sizeLimit) {
      // TODO: Maybe we should generate this crap only on user request, otherwise it lingers in memory needlessly
      file.async('blob').then(blob => {
        if (isMounted()) setAttachment(URL.createObjectURL(blob));
      });
      return;
    }

    setError(new Error(`Can't load "${fileName}" as it exceeds 250MB`));
  }, [extractedFile, fileName, isMounted]);

  if (error) return <div>{error.toString()}</div>;
  if (attachment) return renderAttachment(fileName, attachment);
  return <div>Loading {fileName}...</div>;
}

export default Attachment;
