import React from 'react';
import MainPage from './components/mainPage';
import logo from './logo.svg';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

function App() {
  return (
    <Theme>
      <MainPage/>
    </Theme>
  );
}

export default App;
