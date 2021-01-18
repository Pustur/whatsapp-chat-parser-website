import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const getMimeType = fileName => {
  if (/\.jpe?g$/.test(fileName)) return 'image/jpeg';
  if (fileName.endsWith('.png')) return 'image/png';
  if (fileName.endsWith('.gif')) return 'image/gif';
  if (fileName.endsWith('.webp')) return 'image/webp';
  if (fileName.endsWith('.svg')) return 'image/svg+xml';

  if (fileName.endsWith('.mp4')) return 'video/mp4';
  if (fileName.endsWith('.webm')) return 'video/webm';

  if (fileName.endsWith('.mp3')) return 'audio/mpeg';
  if (fileName.endsWith('.m4a')) return 'audio/mp4';
  if (fileName.endsWith('.wav')) return 'audio/wav';
  if (fileName.endsWith('.opus')) return 'audio/ogg';

  return null;
};

const Attachment = ({ fileName }) => {
  const [attachment, setAttachment] = useState(null);

  const renderAttachment = () => {
    const mimeType = getMimeType(fileName) || '';

    if (mimeType.startsWith('image/')) {
      return (
        <img
          src={`data:${mimeType};base64,${attachment}`}
          title={fileName}
          alt=""
        />
      );
    }
    if (mimeType.startsWith('video/')) {
      return (
        <video controls title={fileName}>
          <source
            src={`data:${mimeType};base64,${attachment}`}
            type={mimeType}
          />
        </video>
      );
    }
    if (mimeType.startsWith('audio/')) {
      return (
        <audio
          controls
          src={`data:${mimeType};base64,${attachment}`}
          title={fileName}
        />
      );
    }
    return (
      <a href={attachment} download={fileName}>
        {fileName}
      </a>
    );
  };

  useEffect(() => {
    window.zipFile.then(zipData => {
      const file = zipData.files[fileName];

      if (!file) return;
      if (getMimeType(fileName)) {
        file.async('base64').then(setAttachment);
        return;
      }

      file.async('blob').then(blob => setAttachment(URL.createObjectURL(blob)));
    });
  }, [fileName]);

  if (attachment) return renderAttachment();
  return `Loading ${fileName}...`;
};

Attachment.propTypes = {
  fileName: PropTypes.string.isRequired,
};

export default Attachment;
