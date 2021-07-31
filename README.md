# WhatsApp Chat Parser Website

> Example application of the npm package [whatsapp-chat-parser](https://github.com/Pustur/whatsapp-chat-parser)

This website allows you to upload a WhatsApp chat log and view its contents.
You can upload a `txt` directly or a `zip` file containing the exported chat.  
In case you export a `zip` file with the option `Attach Media`, you will be able to see images, videos and audio files directly in the website. Try it out by downloading the [example chat](https://github.com/Pustur/whatsapp-chat-parser-website/blob/master/src/assets/whatsapp-chat-parser-example.zip)!

The app runs locally and no logs are sent or stored anywhere.

The website is available at [whatsapp-chat-parser.netlify.app](https://whatsapp-chat-parser.netlify.app/)

## How to export WhatsApp chats

- [Android](https://faq.whatsapp.com/android/chats/how-to-save-your-chat-history)
- [iPhone](https://faq.whatsapp.com/iphone/chats/how-to-back-up-to-icloud/)

## Technologies used

- Libraries:
  - [React](https://reactjs.org/) (with [Create React App](https://github.com/facebook/create-react-app))
  - [JSZip](https://stuk.github.io/jszip/)
  - [whatsapp-chat-parser](https://github.com/Pustur/whatsapp-chat-parser)
- CSS: [Styled Components](https://www.styled-components.com/)
- Code formatting: [Prettier](https://prettier.io/)
- Linting: [ESLint](https://eslint.org/) (with [Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb))

## Changelog

[CHANGELOG](CHANGELOG.md)

## License

[MIT](LICENSE)
