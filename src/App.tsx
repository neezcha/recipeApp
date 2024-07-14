import React from 'react';
import MainPage from './components/mainPage';
import logo from './logo.svg';
import { Theme } from '@radix-ui/themes'

function App() {
  return (
    <Theme>
      <MainPage/>
    </Theme>
  );
}

export default App;
