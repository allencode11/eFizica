import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth, createUserAccountDocument } from './firebase/firebase.utils';

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

// class App extends React.Component {
//   currentUser = null;
//
//   currentUrl = window.location.pathname;
//
//   // es6 function, will be bind with adding .bind(this)
//   update = currentUser => {
//     this.setState(user)// or with es6 this.setState({name})
//   }
//
//   render() {
//     // notice that we removed .bind(this) from the update
//     return (
//       <>
//         {
//           currentUrl === 'eFizica/printedTest' ? null : <Header currentUser={currentUser}/>
//         }
//         {
//           currentUser ? (
//             <Routes>
//               <Route path="/eFizica" element={<HomePage />}/>
//               <Route path="/eFizica/tests" element={<TestPage />} />
//               <Route path="/eFizica/lab" element={<LabPage />} />
//               <Route path="/eFizica/printedTest" element={<PrintedTest />} />
//               <Route path="/eFizica/plan" element={<PlanPage />} />
//               <Route path="/eFizica/calendar" element={<CalendarPage />} />
//               <Route path="/eFizica/tables" element={<TablesPage />} />
//             </Routes>
//           ) :  (
//             <Routes>
//               <Route path="/eFizica" element={<SHomePage />}/>
//               <Route path="/eFizica/tests" element={<SHomePage />} />
//               <Route path="/eFizica/lab" element={<SHomePage />} />
//               <Route path="/eFizica/printedTest" element={<SHomePage />} />
//               <Route path="/eFizica/plan" element={<SHomePage />} />
//               <Route path="/eFizica/calendar" element={<SHomePage />} />
//               <Route path="/eFizica/tables" element={<SHomePage />} />
//             </Routes>
//           )
//         }
//       </>
//     );
//   }
// }

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  const currentUrl = window.location.pathname;

  useEffect( () => {
    auth.onAuthStateChanged( async user => {
      setCurrentUser(user);
    })
  }, [currentUser]);

  return (
    <>
      {
        currentUrl === 'eFizica/printedTest' ? null : <Header currentUser={currentUser}/>
      }
        {
          currentUser ? (
            <Routes>
              <Route path="/eFizica" element={<HomePage />}/>
              <Route path="/eFizica/tests" element={<TestPage />} />
              <Route path="/eFizica/lab" element={<LabPage />} />
              <Route path="/eFizica/printedTest" element={<PrintedTest />} />
              <Route path="/eFizica/plan" element={<PlanPage />} />
              <Route path="/eFizica/calendar" element={<CalendarPage />} />
              <Route path="/eFizica/tables" element={<TablesPage />} />
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