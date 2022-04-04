import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

  const location = useLocation()
  const currentUrl = window.location.pathname;

  useEffect( () => {
    auth.onAuthStateChanged( async user => {
      setCurrentUser(user);
      setRole(await isAdmin(user.email));
    });
  }, [currentUser]);


  return (
    <>
      {
        location.pathname !== '/eFizica/printedTest' ? <Header currentUser={currentUser}/> : null
      }
        {
          currentUser ? (
            <Routes>
              <Route path="/eFizica" element={<HomePage />}/>
              <Route path="/eFizica/tests" element={<TestPage role={role}/>} />
              <Route path="/eFizica/lab" element={<LabPage role={role}/>} />
              <Route path="/eFizica/printedTest" element={<PrintedTest />} />
              <Route path="/eFizica/plan" element={<PlanPage role={role}/>} />
              <Route path="/eFizica/calendar" element={<CalendarPage role={role}/>} />
              <Route path="/eFizica/tables" element={<TablesPage role={role}/>} />
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
    </>
  );
}

export default App;

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })