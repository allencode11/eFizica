import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth, createUserAccountDocument } from './firebase/firebase.utils';
import { useLocation } from 'react-router-dom'

import './App.css';

import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/Home/Home.page';
import { TestPage } from './pages/testPage/test.page';
import { PrintedTest } from './pages/printedTestPage/printedTest';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  const currentUrl = window.location.pathname;

  useEffect( () => {
    auth.onAuthStateChanged( async user => {
        await createUserAccountDocument(user);
    })
  }, [currentUser]);

    return (
        <>
          {
            currentUrl === '/printedTest' ? null : <Header currentUser={currentUser}/>
          }
            <Routes>
                <Route path="/eFizica" exact element={<HomePage />} />
                <Route path="/tests" element={<TestPage />} />
                <Route path="/lab" element={<TestPage />} />
                <Route path="/printedTest" element={<PrintedTest />} />
            </Routes>
        </>
    );
}

export default App;
