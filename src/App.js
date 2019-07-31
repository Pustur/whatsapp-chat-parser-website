import React, { useState } from 'react';
import JSZip from 'jszip';
import { createGlobalStyle } from 'styled-components';
import { parseString } from 'whatsapp-chat-parser';

import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import { StyledH1, StyledHeader } from './style';

import exampleChat from './assets/whatsapp-chat-parser-example.zip';

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

  a {
    text-decoration: none;
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

    const reader = new FileReader();

    if (file.type === 'application/zip') {
      reader.onloadend = e => {
        const arrayBuffer = e.target.result;
        const jszip = new JSZip();

        jszip
          .loadAsync(arrayBuffer)
          .then(({ files }) =>
            Object.entries(files)
              .filter(([fileName]) => fileName.endsWith('.txt'))
              .sort(([a], [b]) => a.length - b.length)[0][1]
              .async('string'),
          )
          .then(parseString)
          .then(setMessages);
      };
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain') {
      reader.onloadend = () => parseString(reader.result).then(setMessages);
      reader.readAsText(file);
    } else {
      const errorMessage = `${file.type} is not a supported file type`;

      console.error(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <>
      <GlobalStyles />
      <StyledH1>WhatsApp Chat Parser</StyledH1>
      <StyledHeader>
        <Dropzone onFileUpload={processFile} id="dropzone" />
        <span>OR</span>
        <a href={exampleChat} download>
          Download example chat
        </a>
      </StyledHeader>
      <MessageViewer messages={messages} limit={100} />
    </>
  );
};

export default App;
