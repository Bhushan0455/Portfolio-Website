import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root');
const isReactSnap = typeof navigator !== 'undefined' && /ReactSnap/i.test(navigator.userAgent);

const app = (
  <React.StrictMode>
    <MotionConfig transition={isReactSnap ? { duration: 0 } : undefined}>
      <App />
    </MotionConfig>
  </React.StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
