import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/Home/Home.page';
import { TestPage } from './pages/testPage/test.page';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/teste" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;
