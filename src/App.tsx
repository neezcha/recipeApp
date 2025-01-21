import React, { useEffect, useState } from 'react';
import { useAppState } from './app-state';
import { Routes, Route } from 'react-router-dom';

import { Theme, Separator } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import NavMenu from './components/Navigation/Menu';
import AllRecipiesPage from './components/pages/AllRecipiesPage';
import EditRecipePage from './components/pages/AddRecipePage';
import MealPrepPage from './components/pages/MealPrepPage';

function App() {
  const appState = useAppState();

  useEffect(()=>{
    document.documentElement.setAttribute('class', appState.themeMode);
  }, [appState.themeMode]);


  return (
    <Theme accentColor="cyan" appearance={appState.themeMode}>
      <NavMenu />
      <Separator size="4" />
      <Routes>
          <Route path="all-recipies" element={<AllRecipiesPage/>} />
          <Route path="add-recipe" element={<EditRecipePage/>} />
          <Route path="edit-recipe" element={<EditRecipePage/>} />
          <Route path="edit-recipe/:recipeId" element={<EditRecipePage/>} />
          <Route path="meal-prep" element={<MealPrepPage/>} />

      </Routes>
     { /*<MainPage/>*/ }
    </Theme>
  );
}

export default App;
