import React from 'react';
// import HomePage from './home';
import HomePage from './home';
import { WindowWidthProvider } from './window';
 // Import the context provider
// import HomePage from './pages/HomePage'; 
// Import the HomePage component


export default function App() {
  return (
    <WindowWidthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HomePage />
      </div>
    </WindowWidthProvider>
  );
}
