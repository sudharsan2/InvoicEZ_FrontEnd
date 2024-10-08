import logo from './logo.svg';
import './App.css';
import CustomLayout from './components/layout';
import NavDrawerDefault from './components/drawer';
import Sample from './components/sample';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Employee from './pages/Employee';
import EmployeeForm from './pages/employeeform';
import ApprovePage from './pages/ApproveDetails'

function App() {
  return (

    
    <Router basename=''>
      <Routes>
        <Route path='' element={<Login/>}/>
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route path='dashboard'  element={<CustomLayout><NavDrawerDefault><Dashboard/></NavDrawerDefault></CustomLayout>}/>
        <Route path='employee' element={<CustomLayout><NavDrawerDefault><Employee/></NavDrawerDefault></CustomLayout>}/>
        <Route path='approve' element={<CustomLayout><NavDrawerDefault><ApprovePage/></NavDrawerDefault></CustomLayout>}/>
        <Route path='form/:token' element={<EmployeeForm/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
