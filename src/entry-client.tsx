
import { hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// This hydrates the app after server-side rendering
hydrateRoot(
  document.getElementById('root')!,
  <App />
);
