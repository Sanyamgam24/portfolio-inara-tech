/**
 * --------------------------------------------------
 * Component: App
 *
 * Purpose:
 *   Root application component. Wraps the entire app
 *   in BrowserRouter and delegates all routing to
 *   AppRoutes.
 *
 * Responsibilities:
 *   - Set up React Router's BrowserRouter context
 *   - Render the AppRoutes switcher
 *
 * State: None
 *
 * Dependencies:
 *   - react-router-dom (BrowserRouter)
 *   - routes/AppRoutes
 *
 * Reusable: No (root component)
 *
 * IMPORTANT: Do not add any other logic here.
 *   Future providers (AuthProvider, ThemeProvider)
 *   should wrap <BrowserRouter> from the outside.
 * --------------------------------------------------
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
