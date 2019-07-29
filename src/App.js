import React, { useState } from 'react';
import { parseString } from 'whatsapp-chat-parser';

import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';

const App = () => {
  const [messages, setMessages] = useState([]);

  const processFile = file => {
    if (!file) return;
    if (file.type === 'text/plain') {
      const reader = new FileReader();

      reader.onloadend = () => parseString(reader.result).then(setMessages);
      reader.readAsText(file);
    } else {
      console.error(`${file.type} is not a supported file type`);
    }
  };

  return (
    <>
      <Dropzone onFileUpload={processFile} id="dropzone" />
      <MessageViewer messages={messages}></MessageViewer>
    </>
  );
};

export default App;
