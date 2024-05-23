import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/index.scss';
import { ModalContextProvider } from './contexts/ModalContext.js';
import { ScreenModeContextProvider } from './contexts/ScreenModeContext.js';
import { LogginContextProvider } from './contexts/LogginContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LogginContextProvider>
		<ScreenModeContextProvider>
			<ModalContextProvider>
				<Router>
					<React.StrictMode>
						<App />
					</React.StrictMode>
				</Router>
			</ModalContextProvider>
		</ScreenModeContextProvider>
  </LogginContextProvider>
);