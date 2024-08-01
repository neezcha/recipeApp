import React from 'react';
import logo from './logo.svg';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import MainPage from './components/MainPage';

function App() {
  return (
    <Theme>
      <MainPage/>
    </Theme>
  );
}

export default App;
