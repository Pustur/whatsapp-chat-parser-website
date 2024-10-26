# Changelog

All notable changes to this project will be documented in this file.

## [1.11.1] - 2024-10-26

### Changed

- Updated dependencies
- Updated example chat to show new features

### Fixed

- Styled new button to load attachments

## [1.11.0] - 2024-10-25

### Added

- Graphical support for polls [#43](https://github.com/Pustur/whatsapp-chat-parser-website/issues/43)
- Button to load downloadable attachments (this should reduce unnecessary memory consumption / browser crashes [#42](https://github.com/Pustur/whatsapp-chat-parser-website/issues/42))

### Changed

- Attachments >250MB can't be loaded / downloaded [#42](https://github.com/Pustur/whatsapp-chat-parser-website/issues/42)
- Minor code cleanup and refactors

## [1.10.0] - 2024-08-02

### Added

- Anonymous users toggle [#36](https://github.com/Pustur/whatsapp-chat-parser-website/issues/36)

### Changed

- Updated dependencies
- Minor code cleanup and refactors

## [1.9.0] - 2023-02-24

### Added

- Filter by start / end date ([#15](https://github.com/Pustur/whatsapp-chat-parser-website/issues/15) Thanks [@DaveKeehl](https://github.com/DaveKeehl))

### Changed

- Converted project to TypeScript (Thanks [@DaveKeehl](https://github.com/DaveKeehl))
- Some code cleanup and refactors

## [1.8.0] - 2023-02-18

### Added

- Message's index number when hovering over a message or when holding the ctrl key
- Upload input focused state on page load
- Section in readme about how to run the project locally
- Jotai as the state management library

### Changed

- Improved print styles
- Updated parser and dependencies
- Replaced create-react-app with vite
- Lots of code cleanup and refactors

## [1.7.1] - 2022-04-08

### Changed

- Updated dependencies

## [1.7.0] - 2021-07-31

### Added

- Ability to change the current active user (whose messages are highlighted) from the sidebar [#7](https://github.com/Pustur/whatsapp-chat-parser-website/issues/7)

### Changed

- Updated parser and dependencies
- Improved changelog with more links to issues

## [1.6.2] - 2021-06-01

### Changed

- Updated parser and dependencies

## [1.6.1] - 2021-05-29

### Changed

- Updated parser and dependencies

## [1.6.0] - 2021-03-09

### Added

- Option to render a range of messages [#2](https://github.com/Pustur/whatsapp-chat-parser-website/issues/2)

### Fixed

- Some emoji rendering [#4](https://github.com/Pustur/whatsapp-chat-parser-website/issues/4)
- Encryption message not being treated as a system message [#3](https://github.com/Pustur/whatsapp-chat-parser-website/issues/3)

## [1.5.1] - 2021-01-29

### Fixed

- Zip file mime type detection in Windows
- Space in readme

## [1.5.0] - 2021-01-19

### Added

- Clickable links
- Media files (when exporting with the "Attach Media" option) will show up now
- Funding links

### Changed

- Updated example chat to showcase the new features
- Updated parser and dependencies

## [1.4.0] - 2020-12-13

### Added

- Added dark mode based on the user's OS settings

### Changed

- Updated dependencies

## [1.3.6] - 2020-08-13

### Changed

- Updated parser and dependencies
- Updated [README](README.md)

## [1.3.5] - 2020-06-11

### Changed

- Website TLD from `.com` to `.app` in [README](README.md)
- Refactored code to detect the `.txt` file inside an archive
- Updated dependencies

## [1.3.4] - 2020-01-27

### Changed

- Updated parser and dependencies

## [1.3.3] - 2019-09-16

### Added

- Changelog

### Changed

- Updated parser

## [1.3.2] - 2019-08-31

### Changed

- Enhanced styles for the file upload input

## [1.3.1] - 2019-08-22

### Changed

- Improved focus handling

## [1.3.0] - 2019-08-14

### Added

- Ability to close sidebar with ESC key

### Changed

- Performance improvements when opening / closing sidebar

## [1.2.0] - 2019-08-12

### Added

- New favicon
- Sidebar with option to change the amount of messages displayed

### Changed

- Highlight color from blue to green
- Better error handling

### Fixed

- Long urls / words overflowing the page

## [1.1.0] - 2019-07-31

### Added

- Downloadable example chat in the header
- Error when unsupported file is uploaded

### Fixed

- Rendering of newlines

## [1.0.0] - 2019-07-31

- Initial release

[1.11.1]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.11.0...1.11.1
[1.11.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.10.0...1.11.0
[1.10.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.9.0...1.10.0
[1.9.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.8.0...1.9.0
[1.8.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.7.1...1.8.0
[1.7.1]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.7.0...1.7.1
[1.7.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.6.2...1.7.0
[1.6.2]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.6.1...1.6.2
[1.6.1]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.6.0...1.6.1
[1.6.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.5.1...1.6.0
[1.5.1]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.5.0...1.5.1
[1.5.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.4.0...1.5.0
[1.4.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.3.6...1.4.0
[1.3.6]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.3.5...1.3.6
[1.3.5]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.3.4...1.3.5
[1.3.4]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.3.3...1.3.4
[1.3.3]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.3.2...1.3.3
[1.3.2]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.3.1...1.3.2
[1.3.1]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.3.0...1.3.1
[1.3.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.2.0...1.3.0
[1.2.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/Pustur/whatsapp-chat-parser-website/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/Pustur/whatsapp-chat-parser-website/releases/tag/1.0.0
