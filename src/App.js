import React, { useState } from 'react';
import { parseString } from 'whatsapp-chat-parser';

import Dropzone from './components/Dropzone/Dropzone';

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
      {messages.length > 0 && (
        <>
          <h1>{`Showing ${messages.length} messages`}</h1>
          <pre>{JSON.stringify(messages, null, 2)}</pre>
        </>
      )}
    </>
  );
};

export default App;
