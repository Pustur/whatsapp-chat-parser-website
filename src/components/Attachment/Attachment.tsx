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

    file.async('blob').then(blob => {
      if (isMounted()) setAttachment(URL.createObjectURL(blob));
    });
  }, [extractedFile, fileName, isMounted]);

  if (error) return <div>{error.toString()}</div>;
  if (attachment) return renderAttachment(fileName, attachment);
  return <div>Loading {fileName}...</div>;
}

export default Attachment;
