
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth, createUserAccountDocument } from './firebase/firebase.utils';

import './App.css';

import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/home/Home.page';
import { TestPage } from './pages/testPage/test.page';
import { PrintedTest } from './pages/printedTestPage/printedTest';
import { CalendarPage } from './pages/calendar/Calendar.page';
import { PlanPage } from './pages/plan/Plan.page';
import { LabPage } from './pages/laboratory/Lab.page';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  const currentUrl = window.location.pathname;

  useEffect( () => {
    auth.onAuthStateChanged( async user => {
      // await createUserAccountDocument(user);
      setCurrentUser(user);
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
        <Route path="/lab" element={<LabPage />} />
        <Route path="/printedTest" element={<PrintedTest />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </>
  );
}

export default App;

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })