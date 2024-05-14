import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/index.scss';
import { ModalContextProvider } from './contexts/ModalContext.js';
import { ScreenModeContextProvider } from './contexts/ScreenModeContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ScreenModeContextProvider>
		<ModalContextProvider>
			<Router>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</Router>
		</ModalContextProvider>
  </ScreenModeContextProvider>
);