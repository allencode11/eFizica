import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth, createUserAccountDocument } from './firebase/firebase.utils';

import './App.css';

import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/Home/Home.page';
import { TestPage } from './pages/testPage/test.page';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect( () => {
    auth.onAuthStateChanged( async user => {
        await createUserAccountDocument(user);
    })
  }, [currentUser]);

    return (
        <>
            <Header currentUser={currentUser}/>
            <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/tests" element={<TestPage />} />
                <Route path="/lab" element={<TestPage />} />
                <Route path="/tables" element={<HomePage />} />
            </Routes>
        </>
    );
}

export default App;
