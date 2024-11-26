import React from 'react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import MainPage from './components/pages/MainPage';

function App() {
  return (
    <Theme accentColor="cyan">
      <MainPage/>
    </Theme>
  );
}

export default App;
