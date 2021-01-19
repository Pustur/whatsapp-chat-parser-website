import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getMimeType } from '../../utils/utils';

const Attachment = ({ fileName, zipFile }) => {
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState(null);

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
    let isStillMounted = true;

    zipFile.then(zipData => {
      const file = zipData.files[fileName];

      if (!file) {
        if (isStillMounted) {
          setError(new Error(`Can't find "${fileName}" in archive`));
        }
        return;
      }
      if (getMimeType(fileName)) {
        file.async('base64').then(data => {
          if (isStillMounted) setAttachment(data);
        });
        return;
      }

      file.async('blob').then(blob => {
        if (isStillMounted) setAttachment(URL.createObjectURL(blob));
      });
    });

    return () => {
      isStillMounted = false;
    };
  }, [fileName]);

  if (error) return error.toString();
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
