import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { StyledLabel, StyledP, StyledInput } from './style';

const preventDefaults = e => {
  e.preventDefault();
  e.stopPropagation();
};

const Dropzone = ({ id, onFileUpload }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const onDragEnterOverHandler = e => {
    preventDefaults(e);
    setIsHighlighted(true);
  };

  const onDragLeaveHandler = e => {
    preventDefaults(e);
    setIsHighlighted(false);
  };

  const onDropHandler = e => {
    preventDefaults(e);
    setIsHighlighted(false);
    onFileUpload(e.dataTransfer.files[0]);
  };

  const onChangeHandler = e => onFileUpload(e.target.files[0]);

  return (
    <form
      onDragEnter={onDragEnterOverHandler}
      onDragOver={onDragEnterOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <StyledInput
        id={id}
        type="file"
        accept="text/plain"
        onChange={onChangeHandler}
      />
      <StyledLabel htmlFor={id} isHighlighted={isHighlighted}>
        <StyledP>
          Click here to upload a file or drag and drop it onto the dashed region
        </StyledP>
      </StyledLabel>
    </form>
  );
};

Dropzone.propTypes = {
  id: PropTypes.string.isRequired,
  onFileUpload: PropTypes.func.isRequired,
};

export default Dropzone;
