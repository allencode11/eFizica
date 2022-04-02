import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { auth, isAdmin } from './firebase/firebase.utils';
import MathJax from 'react-mathjax';

import './App.css';

import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/home/Home.page';
import { TestPage } from './pages/testPage/test.page';
import { PrintedTest } from './pages/printedTestPage/printedTest';
import { CalendarPage } from './pages/calendar/Calendar.page';
import { PlanPage } from './pages/plan/Plan.page';
import { LabPage } from './pages/laboratory/Lab.page';
import { TablesPage } from './pages/tables/tables.page';
import { SHomePage } from './pages/simplyHome/simplyHome';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [role, setRole] = React.useState('user');

  const currentUrl = window.location.pathname;

  useEffect( () => {
    auth.onAuthStateChanged( async user => {
      setCurrentUser(user);
      setRole(await isAdmin(user.email));
    });
  }, [currentUser]);

  console.log('role: ', role);
  console.log('email: ', currentUser);

  return (
    <MathJax.Provider>
    <>
      {
        currentUrl === 'eFizica/printedTest' ? null : <Header currentUser={currentUser}/>
      }
        {
          currentUser ? (
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/tests" element={<TestPage role={role}/>} />
              <Route path="/lab" element={<LabPage role={role}/>} />
              <Route path="/printedTest" element={<PrintedTest />} />
              <Route path="/plan" element={<PlanPage role={role}/>} />
              <Route path="/calendar" element={<CalendarPage role={role}/>} />
              <Route path="/tables" element={<TablesPage role={role}/>} />
            </Routes>
          ) :  (
            <Routes>
              <Route path="/eFizica" element={<SHomePage />}/>
              <Route path="/eFizica/tests" element={<SHomePage />} />
              <Route path="/eFizica/lab" element={<SHomePage />} />
              <Route path="/eFizica/printedTest" element={<SHomePage />} />
              <Route path="/eFizica/plan" element={<SHomePage />} />
              <Route path="/eFizica/calendar" element={<SHomePage />} />
              <Route path="/eFizica/tables" element={<SHomePage />} />
            </Routes>
          )
        }
    </></MathJax.Provider>
  );
}

export default App;

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })