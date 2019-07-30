import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { parseString } from 'whatsapp-chat-parser';

import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    font-family: sans-serif;
  }

  body {
    height: 100%;
    margin: 0;
    color: #333;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
`;

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
      <GlobalStyles />
      <Dropzone onFileUpload={processFile} id="dropzone" />
      <MessageViewer messages={messages} limit={100}></MessageViewer>
    </>
  );
};

export default App;
