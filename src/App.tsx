import React, { useEffect } from 'react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import MainPage from './components/pages/MainPage';
import { useAppState } from './app-state';

function App() {

  const appState = useAppState();

  useEffect(()=>{
    document.documentElement.setAttribute('class', appState.themeMode);
  }, [appState.themeMode]);

  return (
    <Theme accentColor="cyan" appearance={appState.themeMode}>
      <MainPage/>
    </Theme>
  );
}

export default App;
