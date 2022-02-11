import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';

import './App.css';

import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/Home/Home.page';
import { TestPage } from './pages/testPage/test.page';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect( () => {
    auth.onAuthStateChanged( user => setCurrentUser(user))
  }, [currentUser]);

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
