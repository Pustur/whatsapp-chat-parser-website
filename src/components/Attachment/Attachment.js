import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getMimeType } from '../../utils/utils';

const Attachment = ({ fileName, zipFile }) => {
  const [attachment, setAttachment] = useState(null);

  const renderAttachment = () => {
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

  useEffect(() => {
    zipFile.then(zipData => {
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
  zipFile: PropTypes.instanceOf(Promise),
};

Attachment.defaultProps = {
  zipFile: null,
};

export default Attachment;
