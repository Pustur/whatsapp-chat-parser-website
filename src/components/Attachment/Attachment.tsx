import { useEffect, useState, useCallback } from 'react';
import { useAtomValue } from 'jotai';

import { extractedFileAtom } from '../../stores/global';
import { getMimeType } from '../../utils/utils';

const renderAttachment = (
  fileName: string,
  mimeType: string,
  attachment: string,
) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const mimeType = getMimeType(fileName) || '';

  const loadAttachment = useCallback(() => {
    if (!extractedFile || typeof extractedFile === 'string') return;

    const file = extractedFile.files[fileName];

    if (!file) {
      setError(new Error(`Can't find "${fileName}" in archive`));
      return;
    }
    if (mimeType) {
      setIsLoading(true);
      file.async('base64').then(data => {
        setAttachment(data);
        setIsLoading(false);
      });
      return;
    }

    const sizeLimit = 250 * 1024 * 1024; // 250 MB
    // @ts-expect-error _data is not typed
    // eslint-disable-next-line no-underscore-dangle
    const uncompressedSize = file?._data?.uncompressedSize ?? -1;

    // We actually need to check > 0 because big files have negative numbers (int overflow? kek)
    if (uncompressedSize > 0 && uncompressedSize < sizeLimit) {
      setIsLoading(true);
      file.async('blob').then(blob => {
        setAttachment(URL.createObjectURL(blob));
        setIsLoading(false);
      });
      return;
    }

    setError(new Error(`Can't load "${fileName}" as it exceeds 250MB`));
  }, [extractedFile, fileName, mimeType]);

  useEffect(() => {
    if (
      mimeType.startsWith('image/') ||
      mimeType.startsWith('audio/') ||
      mimeType.startsWith('video/')
    ) {
      loadAttachment();
    }
  }, [loadAttachment, mimeType]);

  if (error) return <div>{error.toString()}</div>;
  if (attachment) return renderAttachment(fileName, mimeType, attachment);
  return (
    <div>
      {isLoading ? (
        <div>Loading {fileName}...</div>
      ) : (
        <button type="button" onClick={loadAttachment}>
          Load {fileName}
        </button>
      )}
    </div>
  );
}

export default Attachment;
