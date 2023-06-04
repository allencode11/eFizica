import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { auth, isAdmin } from './firebase/firebase.utils';

import './App.css';

import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/home/Home.page';
import { InfoHomePage } from './pages/info/Home.page';
import { MathHomePage } from './pages/math/Home.page';
import { TestPage } from './pages/testPage/test.page';
import { InfoTestPage } from './pages/info/testPage/test.page';
import { MathTestPage } from './pages/math/testPage/test.page';
import { PrintedTest } from './pages/printedTestPage/printedTest';
import { InfoPrintedTest } from './pages/info/printedTestPage/printedTest';
import { MathPrintedTest } from './pages/math/printedTestPage/printedTest';
import { CalendarPage } from './pages/calendar/Calendar.page';
import { PlanPage } from './pages/plan/Plan.page';
import { MathPlanPage } from './pages/math/Plan.page';
import { InfoPlanPage } from './pages/info/Plan.page';
import { LabPage } from './pages/laboratory/Lab.page';
import { TablesPage } from './pages/tables/tables.page';
import { MathTablesPage } from './pages/math/tables.page';
import { InfoTablesPage } from './pages/info/tables.page';
import { SHomePage } from './pages/simplyHome/simplyHome';
import { BaseHomePage } from './pages/BaseHome.page';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [role, setRole] = React.useState('user');

  const location = useLocation()

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
              <Route path="/" element={<BaseHomePage />}/>
              <Route path="/eFizica" element={<HomePage />}/>
              <Route path="/eFizica/tests" element={<TestPage role={role}/>} />
              <Route path="/eFizica/lab" element={<LabPage role={role}/>} />
              <Route path="/eFizica/printedTest" element={<PrintedTest />} />
              <Route path="/eFizica/plan" element={<PlanPage role={role}/>} />
              <Route path="/eFizica/calendar" element={<CalendarPage role={role}/>} />
              <Route path="/eFizica/tables" element={<TablesPage role={role}/>} />
              <Route path="/eMath" element={<MathHomePage />}/>
              <Route path="/eMath/tests" element={<MathTestPage role={role}/>} />
              <Route path="/eMath/printedTest" element={<MathPrintedTest />} />
              <Route path="/eMath/plan" element={<MathPlanPage role={role}/>} />
              <Route path="/eMath/tables" element={<MathTablesPage role={role}/>} />
              <Route path="/eInfo" element={<InfoHomePage />}/>
              <Route path="/eInfo/tests" element={<InfoTestPage role={role}/>} />
              <Route path="/eInfo/printedTest" element={<InfoPrintedTest />} />
              <Route path="/eInfo/plan" element={<InfoPlanPage role={role}/>} />
              <Route path="/eInfo/tables" element={<InfoTablesPage role={role}/>} />
            </Routes>
          ) :  (
            <Routes>
              <Route path="/" element={<SHomePage />}/>
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