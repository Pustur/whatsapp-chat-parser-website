import ReactDOM from 'react-dom/client';

import App from './App';

const rootDOM = document.getElementById('root');

if (rootDOM !== null) {
  const root = ReactDOM.createRoot(rootDOM);
  root.render(<App />);
}
