import logo from "./logo.svg";
import "./App.css";
import CustomLayout from "./components/layout";
import NavDrawerDefault from "./components/drawer";
import Sample from "./components/sample";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Employee from "./pages/Employee";
import EmployeeForm from "./pages/employeeform";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import UserApprove from "./pages/ApprovePage";
function App() {
  return (
    <Router basename="">
      <Routes>
        <Route path="" element={<Login />} />
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route
          path="dashboard"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <Dashboard />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route
          path="employee"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <Employee />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <CustomLayout>
              <ForgotPassword />
            </CustomLayout>
          }
        />
        <Route
          path="/resetPassword/:token"
          element={
            <CustomLayout>
              <ResetPassword />
            </CustomLayout>
          }
        />
        <Route
          path="/reset"
          element={
            <CustomLayout>
              <ResetPassword />
            </CustomLayout>
          }
        />
        <Route
          path="/approve"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <UserApprove />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route path="form/:token" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
